import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Book from "App/Models/Book"

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

  // public async update({ auth, request, params }: HttpContextContract) {
  //   const book = await Book.find(params.id);

  //   if (book) {
  //     book.title = request.input("title");
  //     book.about = request.input("content");
  //     if (await book.save()) {
  //       // await book.preload("user");
  //       // await book.preload("forum");
  //       return book;
  //     }
  //     return; // 422
  //   }

  //   return; // 401
  // }

  public async store({ auth, request }: HttpContextContract) {
    // const user = await auth.authenticate()
    const book = new Book()
    book.title = request.input("title")
    book.about = request.input("about")
    // book.forumId = request.input("forum");
    // await user.related("books").save(book);
		await book.save()
    return book;
  }

  // public async destroy({
  //   response,
  //   auth,

  //   params,
  // }: HttpContextContract) {
  //   const user = await auth.authenticate();
  //   const post = await Post.query()
  //     .where("user_id", user.id)
  //     .where("id", params.id)
  //     .delete();
  //   return response.redirect("/dashboard");
  // }
}