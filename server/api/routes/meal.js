import express from 'express';

import { getMeals } from '../controllers/meal.js';
import { verifyUser } from '../middleware/authorization.js';

const router = express.Router();


router.get('/search', verifyUser, getMeals);

export default router;