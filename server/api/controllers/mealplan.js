import MealPlan from '../models/Mealplan.js';

const addMealPlan = async (req, res) => {
    try {
        const { user_id } = req.verified;
        const { week, meal} = req.body;

        const mealplanEntry = await MealPlan.findOne({ user_id, week });
        if (mealplanEntry) {
            if (mealplanEntry.meals.length >= 3) {
                return res
                    .status(400)
                    .json({ message: 'Mealplan contains the maximum of 3 meals' });
            }
            mealplanEntry.meals.push(meal);
            await mealplanEntry.save();
            return res.json(mealplanEntry);
        }
        const addedMealPlan = await MealPlan.create({ user_id, week, meals:[meal]});
        res.json(addedMealPlan);

    } catch (error) {
        res.status(500).json({ error: error.toString()});
    }
};

const deleteMealPlan = async (req, res) => {
    try {
        const { id } = req.params;
        
        await MealPlan.deleteOne({ _id: id });
        res.json({ id, message: 'Delete success' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export {addMealPlan, deleteMealPlan};