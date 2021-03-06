import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async profile({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    return user
  }

  public async register({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const fullName = request.input('name')
    const newUser = new User()
    newUser.email = email
    newUser.password = password
    newUser.fullName = fullName

    if (await newUser.save()) {
      const token = await auth.use('api').login(newUser, {
        expiresIn: '10 days',
      })
      return token.toJSON()
    }

    return 'cant'
  }
}
