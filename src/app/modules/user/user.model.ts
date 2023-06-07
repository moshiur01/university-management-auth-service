import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

//object r poriborte Record
const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

// Create a Model.
export const User = model<IUser, UserModel>('User', userSchema)
