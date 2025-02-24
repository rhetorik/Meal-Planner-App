import express from 'express';

import { addMealPlan, deleteMealPlan } from '../controllers/mealplan.js';
import { verifyUser } from '../middleware/authorization.js';
import { verifyUserMealPlan } from '../middleware/validation.js';

const router = express.Router();

router.post('/', verifyUser, addMealPlan);

router.delete('/:id', verifyUser, verifyUserMealPlan, deleteMealPlan);


export default router;