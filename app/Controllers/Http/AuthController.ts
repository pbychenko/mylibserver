import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password)
      console.log(token.toJSON())
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  // public async register({ request, auth }: HttpContextContract) {
  //   const email = request.input("email");
  //   const password = request.input("password");
  //   const fullName = request.input("name");
  //   const newUser = new User()
  //   newUser.email = email
  //   newUser.password = password
  //   newUser.fullName = fullName

  //   if (await newUser.save()) {
  //     const token = await auth.use("api").login(newUser, {
  //       expiresIn: "10 days",
  //     });
  //     return token.toJSON()
  //   }

  //   return 'cant'
  // }
}
