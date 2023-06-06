//create book into database

import config from '../../../config/index'
import { generateUserId } from './user.utlis'
import { IUser } from './users.interface'
import { User } from './users.model'

//create user into database
const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated incremental id
  const id = await generateUserId()

  user.id = id
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  const CreatedUser = await User.create(user)

  if (!CreatedUser) {
    throw new Error('Failed to Create User')
  }

  return CreatedUser
}

export default {
  createUser,
}