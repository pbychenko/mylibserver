import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Book from "App/Models/Book"
import User from "App/Models/User"

export default class BooksController {
  public async index() {
    // const books = await Book.query().preload("user")//.preload("forum");
		const books = await Book.all()
    return books;
  }

  public async show({ request, params }: HttpContextContract) {
    try {
      const book = await Book.find(params.id);
      if (book) {
        // await book.preload("user");
        // await book.preload("forum");
        return book;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async update({ auth, request, params }: HttpContextContract) {
    const book = await Book.find(params.id);

    if (book) {
      book.title = request.input("title");
      book.about = request.input("about");
      if (await book.save()) {
        // await book.preload("user");
        // await book.preload("forum");
        return book;
      }
      return; // 422
    }

    return; // 401
  }

  public async store({ auth, request }: HttpContextContract) {
    // const user = await auth.authenticate()
    // const book = await Book.create({
		// 	title: request.input("title"),
		// 	about: request.input("about"),
    //   picture: '',//реальная линка на картину
    //   ownerId: user.id,
    //   holderId: undefined,
		// })
    // await user.related("books").save(book);
		// await book.save()
    // console.log(user.email)
  //   const books = await Book
  // .query()
  // .preload('owner')
  // books.forEach((book) => {
  //   console.log(book.owner.email)
  // })
  const book = await Book.find(1);
  const user = await book.related('owner').query()
  const genre = await book.related('genres').create({
    title: 'This is a great post'
  })

  console.log(user)

    return book;
  }

  public async destroy({
    response,
    // auth,
    params,
  }: HttpContextContract) {
    // const user = await auth.authenticate();
    // const post = await Post.query()
    //   .where("user_id", user.id)
    //   .where("id", params.id)
    //   .delete();
    // return response.redirect("/dashboard");
    const book = await Book.find(params.id);
    if (book) {
      book.delete()
      return 'deleted';
      // return; // 422
    }

    return 'not found';
  }
}
