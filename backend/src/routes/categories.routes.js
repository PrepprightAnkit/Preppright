import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.controller.js';

const router = express.Router();

router.post('/cat', createCategory);
router.get('/cat', getAllCategories);
router.get('/cat:id', getCategoryById);
router.put('/cat:id', updateCategory);
router.delete('/cat:id', deleteCategory);

export default router;
