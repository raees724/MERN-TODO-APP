import express from 'express';
import * as controller from '../controllers/todoController.js'
import { verifyJWT } from '../middleware/verifyJwt.js';


const router = express.Router();
router.use(verifyJWT)

router.route('/create-todos').post(controller.createTodo);
router.route('/todos').get(controller.getTodos);
router.route('/edit').put(controller.updateTodos);
router.route('/delete/:id').delete(controller.deleteTodo);
router.route('/completed').get(controller.getCompletedTodos)
router.route('/incompleted').get(controller.incompletedTodos)


export default router;