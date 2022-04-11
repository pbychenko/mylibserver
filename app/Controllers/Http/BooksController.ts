import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {
  public async index({ request }) {
    const { authorId, genreId } = request.qs()

    let results = await Book.query()
    if (genreId !== '') {
      results = await Book.query().where('genre_id', +genreId)
    }

    results = await Promise.all(
      results.map(async (book) => {
        const authors = await book.related('authors').query()
        const authorIds = authors.map((author) => author.id)
        if ((authorId !== '' && authorIds.includes(+authorId)) || authorId === '') {
          return {
            id: book.id,
            title: book.title,
            about: book.about,
            holderId: book.holderId,
            authorIds,
          }
        }
        return null
      })
    )

    return results.filter((e) => e !== null)
  }

  public async show({ params }: HttpContextContract) {
    try {
      const book = await Book.find(params.id)
      if (book) {
        return book
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const book = await Book.find(params.id)
    if (book) {
      try {
        await book.merge({ ...request.body() }).save()
        return book
      } catch (e) {
        return e.message
      }
    }
    return 'not found'
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()
    const book = await Book.create({
      title: request.input('title'),
      about: request.input('about'),
      picture: '', //реальная линка на картину
      ownerId: user.id,
      genreId: request.input('genreId'),
    })

    const authorsIds = request.input('authorIds')
    if (Array.isArray(authorsIds)) {
      const f = async (list) => {
        for (const item of list) {
          await book.related('authors').attach([item])
        }
      }
      f(authorsIds)
    } else {
      await book.related('authors').attach([authorsIds])
    }

    return book
  }

  public async destroy({ auth, params }: HttpContextContract) {
    const user = await auth.authenticate()
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
