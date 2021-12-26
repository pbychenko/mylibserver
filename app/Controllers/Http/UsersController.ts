import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User"

export default class UsersController {
	public async index() {
		const users = User.all();
    return users;
  }

	public async books({ params }: HttpContextContract) {
		const user = await User.find(params.id);
		if (user) {
			const ownerBooks = await user?.related('ownerBooks').query()
			const holderBooks = await user?.related('holderBooks').query()
			return { ownerBooks, holderBooks }
		}
		return 'user not found'		
  }
}
