/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index() {
    const users = User.query()
    return users
  }

  public async show({ params }: HttpContextContract) {
    try {
      const user = await User.find(params.id)
      if (user) {
        return user
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async store({ request }: HttpContextContract) {
    const user = await User.create({
      email: request.input('name'),
      fullName: request.input('fullName'),
      password: request.input('password'),
    })
    if (user) {
      return user
    }
    return 'не удалось создать пользователя'
  }

  public async update({ auth, request, params }: HttpContextContract) {
    const user = await auth.authenticate()
    const userForEdit = await User.find(params.id)
    if (userForEdit) {
      if (user.id === userForEdit.id) {
        try {
          await userForEdit.merge({ ...request.body() }).save()
          return userForEdit
        } catch (e) {
          return e.message
        }
      } else {
        return 'user can edit only his own profile'
      }
    }
    return 'not found'
  }

  public async destroy({ auth, params }: HttpContextContract) {
    const user = await auth.authenticate()

    const userForDelete = await User.find(params.id)
    if (userForDelete) {
      if (user.id === userForDelete.id) {
        await userForDelete.delete()
        return 'user has been deleted'
      }
      return 'user can delete only his own profile'
    }

    return 'not found'
  }
}
