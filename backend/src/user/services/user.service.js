import mongoose from 'mongoose';
import UserSchema from '../schemas/user.schema.js';
import userSchema from '../schemas/user.schema.js';

class UserService {
  static async createUser(data) {
    return await UserSchema.create(data);
  }

  static async getUserByEmail(email) {
    return await UserSchema.findOne({ email });
  }

  static async updateUser(id, data) {
    const user = await UserSchema.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return await userSchema.findByIdAndUpdate(id, data, { new: true })
  }
}

export default UserService;