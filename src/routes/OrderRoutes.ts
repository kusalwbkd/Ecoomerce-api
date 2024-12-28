import { Router } from 'express';
import { createOrder, getOrder, listOrders } from '../controllers/OrderController.js';
import { verifyAdmin, verifyToken } from '../middlewares/authMiddleware.js';
import { validateData } from '../middlewares/validationMiddleware.js';
import { insertOrderWithItemsSchema } from '../db/OrderSchema.js';

const router = Router();

router.route('/').post(verifyToken,validateData(insertOrderWithItemsSchema), createOrder).get(listOrders)
router.route('/:id').get(getOrder)
export default router;