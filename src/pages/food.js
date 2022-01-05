import express from 'express';
import { getFoods } from '../controllers/food.js';
const router = express.Router();

router.get('/', getFoods);

export default router;
