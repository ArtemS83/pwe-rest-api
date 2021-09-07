const express = require('express');
const router = express.Router();
const {
  validateAddTodo,
  validateUpdateStatusTodo,
  validateObjectId,
} = require('./validation');
const ctrlTodo = require('../../controllers/todos');

router.get('/', ctrlTodo.getAll);

router.get('/:todoId', validateObjectId, ctrlTodo.getById);

router.post('/', validateAddTodo, ctrlTodo.create);

router.delete('/:todoId', validateObjectId, ctrlTodo.remove);

router.patch(
  '/:todoId/status',
  validateUpdateStatusTodo,
  validateObjectId,
  ctrlTodo.updateStatus,
);

module.exports = router;
