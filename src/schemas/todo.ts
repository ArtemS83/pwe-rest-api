import * as mongoose from 'mongoose';
import { ITodo } from '../interfaces/Todo.interface';

const todoSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      minlength: 1,
      maxlength: 70,
    },

    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
      transform: function (_doc: any, ret: { _id: string }) {
        delete ret._id;
        return ret;
      },
    },
  },
);

export const Todo = mongoose.model<ITodo & Document>('todo', todoSchema);
