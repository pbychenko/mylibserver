import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Genre from "App/Models/Genre";

export default class GenresController {
	public async index() {
		const genres = Genre.all();
    return genres;
  }

  public async update({ request, params }: HttpContextContract) {
    const genre = await Genre.find(params.id);

    if (genre) {
      genre.title = request.input("title");
      if (await genre.save()) {
        return genre;
      }
      return 404;
    }

    return 401;
  }

  public async store({ request }: HttpContextContract) {
    const genre = new Genre();
    genre.title = request.input("title")
		await genre.save()
    return genre;
  }

  public async destroy({ params }: HttpContextContract) {
    const genre = await Genre.find(params.id);
    if (genre) {
      genre.delete()
      return 'deleted';
    }

    return 'not found';
  }
}
