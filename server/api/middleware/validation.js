import MealPlan from '../models/Mealplan.js';

const verifyUserMealPlan = async (req, res, next) => {
    try {
        const { user_id } = req.verified;

        const mealplan_id = req.params.id;
        const mealplan = await MealPlan.findById(mealplan_id);

        if (!mealplan.user_id.equals(user_id)) {
            return res.status(401).json({ error: 'Mealplan is not associated with user' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export { verifyUserMealPlan };