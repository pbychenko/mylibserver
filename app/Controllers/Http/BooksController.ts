import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Book from "App/Models/Book"
// import Database from '@ioc:Adonis/Lucid/Database'

export default class BooksController {
  public async index({ request }) {
    // const books = await Book.query().where('ownerId', ownerId).andWhere('holderId', holderId)   
    // const books = await Database.rawQuery('select title, about, author.last_name from books, authors where id = ?', [1])

    const { authorId, genreId } = request.qs()
    console.log('authorId', authorId)
    console.log('genreId', genreId)

    let results = await Book.all()
    if (genreId !== '') {
      results = await Book.query().where('genre_id', +genreId)
    }
    
    // console.log('filteredByGenre', results.map(e=>e.title))

    results = await Promise.all(results.map(async (book) => {
        const authors = await book.related('authors').query()
        const authorIds = authors.map(author => author.id)
        if ((authorId !=='' && authorIds.includes(+authorId)) || authorId === '') {
          return {
            id: book.id,
            title: book.title,
            about: book.about,
            authorIds,
          }
        }
        return null
      }
    ))

    // console.log(data)
    // return books;
    return results.filter(e => e !== null)
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
    // const user = await auth.authenticate()
    const book = await Book.create({
			title: request.input("title"),
			about: request.input("about"),
      picture: '', //реальная линка на картину
      ownerId: 2,
      genreId: request.input("genreId"),
		});

    const authorsIds = request.input("authorIds")
    if (Array.isArray(authorsIds)) {
      const f = async (list) => {
        for (const item of list) {
          // console.log('item', item)
          await book.related('authors').attach([item])
        }
      }
      f(authorsIds);
    } else {
      await book.related('authors').attach([authorsIds])
    }
    // const authorId = request.input("authorId")
    // authorsIds.forEach((authorId) => {
    //   await book.related('authors').attach(authorId)

      
    // });
    // const f = async (list) => {
    //   for (const item of list) {
    //     console.log('item', item)
    //     await book.related('authors').attach([item])
    //   }
    // }
    // f(authorsIds);
    // for (const authorId of authorsIds) {
    //   await book.related('authors').attach(authorId)
    // }
    // await book.related('authors').attach([authorId])

  //  await book.related('authors').create({
  //   name: 'n',
  //   lastName: 'l',
  // })
    return book;
  }

  public async destroy({ auth, params }: HttpContextContract) {
    const user = await auth.authenticate()
    console.log()

    const book = await Book.find(params.id)
    if (book) {
      const owner = (await book?.related('owner').query())[0]
      if (user.id === owner.id) {
        await book.delete()
        return 'book has been deleted'
      }
      return 'only owner can delete book'
    }

    return 'not found'
  }
}
