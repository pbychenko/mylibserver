import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Author from "App/Models/Author";

export default class AuthorsController {
	public async index() {
		const authors = (await Author.all());
		// console.log('data',data)
		// const authors = data.map((el) => {
		// 	// console.log(el);
		// 	return el.lastName;
		// })
		return authors;
    // return await authors.map(el => {...el });
  }

  public async update({ request, params }: HttpContextContract) {
    const author = await Author.find(params.id);
		// console.log(request.body());

		if (author) {
			try {
				await author.merge({ ...request.body() }).save();
				return author;
			} catch (e) {
				// console.log(e);
				return e.message;
			}			
		}
		return 'not found';
  }

  public async store({ request }: HttpContextContract) {
		const author = await Author.create({
			name: request.input("name"),
			lastName: request.input("lastName"),
		})
		if (author) {
    	return author;
		}
		return 'не удалось создать автора'
  }

  public async destroy({ params }: HttpContextContract) {
		const author = await Author.find(params.id);

		if (author) {
			try {
				await author.delete();
				return 'author has been deleted';
			} catch(e) {
				console.log(e);
				return e.message;
			}
		}

		return 'author not found';
  }
}
