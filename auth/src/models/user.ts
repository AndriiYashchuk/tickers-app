/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import { User as UserType } from '@tickers-app/common/types/User';
import { Password } from '../services/password';

// An interface that describes the properties
// that are requried to create a new User
export interface UserAttrs extends Pick<UserType, 'email' | 'name' | 'surname' | 'isAdmin'> {
  password: string;
  inActive?: boolean;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build: (attrs: UserAttrs) => UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  isAdmin?: boolean;
  surname?: string;
  name?: string;
  inActive?: boolean;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: false,
    },
    name: {
      type: String,
      required: false
    },
    surname: {
      type: String,
      required: false
    },
    inActive: {
      type: Boolean,
      required: false
    },
  },
  {
    toJSON: {
      transform(doc: mongoose.Document, ret: Record<string, any>): void {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

userSchema.pre('save', async function preSave(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

const User: UserModel = mongoose.model<UserDoc, UserModel>('User', userSchema);
userSchema.statics.build = (attrs: UserAttrs): UserDoc => new User(attrs);

export { User };
