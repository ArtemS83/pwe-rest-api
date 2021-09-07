const Joi = require('joi');
const mongoose = require('mongoose');

const { HttpCode } = require('../../helpers/constants');

const schemaAddTodo = Joi.object({
  description: Joi.string().optional(),

  isDone: Joi.optional(),
}).min(1);

const schemaUpdateTodoStatus = Joi.object({
  isDone: Joi.required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (error) {
    next({
      status: HttpCode.BAD_REQUEST,
      message: `Field: ${error.message.replace(/"/g, '')}`,
    });
  }
};

const validateId = async (id, next) => {
  if (await mongoose.isValidObjectId(id)) {
    next();
    return;
  }
  next({
    status: HttpCode.BAD_REQUEST,
    message: `Id is not valid`,
  });
};

module.exports.validateAddTodo = (req, _res, next) => {
  return validate(schemaAddTodo, req.body, next);
};

module.exports.validateUpdateStatusTodo = (req, _res, next) => {
  return validate(schemaUpdateTodoStatus, req.body, next);
};

module.exports.validateObjectId = (req, _res, next) => {
  return validateId(req.params.todoId, next);
};
