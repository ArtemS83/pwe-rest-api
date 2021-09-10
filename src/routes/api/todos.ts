import express from 'express';
import {
  validateAddTodo,
  validateUpdateStatusTodo,
  validateObjectId,
} from './validation';
import ctrlTodo from '../../controllers/todos';

const router = express.Router();

router.get('/', ctrlTodo.getAll);

router.post('/', validateAddTodo, ctrlTodo.create);

router.delete('/:todoId', validateObjectId, ctrlTodo.remove);

router.patch(
  '/:todoId/status',
  validateUpdateStatusTodo,
  validateObjectId,
  ctrlTodo.updateStatus,
);

export default router;
