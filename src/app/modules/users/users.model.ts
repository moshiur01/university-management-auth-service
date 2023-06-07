import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'

// Create a new Model type that knows about IUserMethods...
//object r poriborte Record
type UserModel = Model<IUser, Record<string, unknown>>
const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

// 3. Create a Model.
export const User = model<IUser, UserModel>('User', userSchema)
