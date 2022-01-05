import express from "express";
import { getResturants } from '../controllers/resturant.js';
const router = express.Router();

router.get("/",getResturants);

export default router;