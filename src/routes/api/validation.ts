const Joi = require('joi');
const mongoose = require('mongoose');
import { HttpCode } from '../../helpers/constants';
import { Request, Response } from 'express';

const schemaAddTodo = Joi.object({
  description: Joi.string().optional(),
  isDone: Joi.optional(),
}).min(1);

const schemaUpdateTodoStatus = Joi.object({
  isDone: Joi.required(),
});

const validate = async (schema: any, body: any, next: any) => {
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

const validateId = async (id: string, next: any) => {
  if (await mongoose.isValidObjectId(id)) {
    next();
    return;
  }
  next({
    status: HttpCode.BAD_REQUEST,
    message: `Id is not valid`,
  });
};

module.exports.validateAddTodo = (req: Request, _res: Response, next: any) => {
  return validate(schemaAddTodo, req.body, next);
};

module.exports.validateUpdateStatusTodo = (
  req: Request,
  _res: Response,
  next: any,
) => {
  return validate(schemaUpdateTodoStatus, req.body, next);
};

module.exports.validateObjectId = (req: Request, _res: Response, next: any) => {
  return validateId(req.params.todoId, next);
};
