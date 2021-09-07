const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema(
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
      // transform: function (_doc, ret) {
      //   delete ret._id;
      //   return ret;
      // },
    },
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  },
);

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;
