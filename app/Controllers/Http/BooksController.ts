import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Book from "App/Models/Book"

export default class BooksController {
  public async index() {    
    // const books = await Book.query().where('ownerId', ownerId).andWhere('holderId', holderId)   

		const books = await Book.all()
    return books;
  }

  public async show({ params }: HttpContextContract) {
    try {
      const book = await Book.find(params.id);
      if (book) {
        return book;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async update({ auth, request, params }: HttpContextContract) {
    const user = await auth.authenticate();
    const book = await Book.find(params.id);
    if (book) {
      const owner = (await book?.related('owner').query())[0]
      if (user.id === owner.id) {
        try {
          await book.merge({ ...request.body() }).save();
          return book;
        } catch (e) {
          // console.log(e);
          return e.message;
        }
      } else {
        return 'only owner can edit book'
      }
    }
    return 'not found'
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()
    const book = await Book.create({
			title: request.input("title"),
			about: request.input("about"),
      picture: '',//реальная линка на картину
      ownerId: user.id,
      genreId: request.input("genreId"),
		});
    const authorId = request.input("authorId")
    await book.related('authors').attach([authorId])

  //  await book.related('authors').create({
  //   name: 'n',
  //   lastName: 'l',
  // })
    return book;
  }

  public async destroy({ auth, params }: HttpContextContract) {
    const user = await auth.authenticate();
    console.log()

    const book = await Book.find(params.id);
    if (book) {
      const owner = (await book?.related('owner').query())[0]
      if (user.id === owner.id) {
        await book.delete()
        return 'book has been deleted';
      } 
      return 'only owner can delete book';      
    }

    return 'not found';
  }
}
