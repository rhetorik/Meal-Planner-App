import express from 'express';

import { registerUser, loginUser, getUserById, updatePreferences } from '../controllers/user.js';
//import mealplanController from '../controllers/mealplan.js';

import { verifyUser } from '../middleware/authorization.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/:id', verifyUser, getUserById);

router.put('/:id', verifyUser, updatePreferences);

export default router;