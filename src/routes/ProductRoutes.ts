import { validateData } from '../middlewares/validationMiddleware.js';
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from  '../controllers/ProductController.js';
import { Router } from 'express';
import { createProductSchema, updateProductSchema } from '../db/productsSchema.js';
import { verifyAdmin, verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.route('/').get(listProducts).post(verifyToken,verifyAdmin, validateData(createProductSchema),createProduct)
router.route('/:id').get(getProductById).patch(verifyToken,verifyAdmin,validateData(updateProductSchema),updateProduct).delete(verifyToken,verifyAdmin,deleteProduct)

export default router;