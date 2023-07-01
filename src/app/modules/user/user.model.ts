import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

//object r poriborte Record
const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    //do the faculty and admin later
    // faculty: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Faculty',
    // },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Admin',
    // },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Create a Model.
export const User = model<IUser, UserModel>('User', userSchema);
