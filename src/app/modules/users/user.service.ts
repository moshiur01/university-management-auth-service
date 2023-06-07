import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { generateUserId } from './user.utlis'
import { IUser } from './user.interface'
import { User } from './user.model'

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
    throw new ApiError(400, 'Failed to Create User')
  }

  return CreatedUser
}

export const UserService = {
  createUser,
}
