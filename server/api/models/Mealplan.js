import mongoose from 'mongoose';

// {
//     _id: 1,
//     user_id: 1,
//     week: 1,
//     meals: [
//         {
//             mealId: 1591791,
//             name: 'Keto Snickerdoodle Coffee',
//             diets: ['gluten free', 'lacto ovo vegetarian', 'primal', 'ketogenic'],
//             image: 'https://img.spoonacular.com/recipes/1591791-312x231.jpg'
//         },
//         {
//             mealId: 1652621,
//             name: 'Keto Pancakes',
//             diets: ['gluten free', 'dairy free', 'lacto ovo vegetarian', 'ketogenic'],
//             image: 'https://img.spoonacular.com/recipes/1652621-312x231.jpg'
//         }
//     ]
// }

const MealPlanSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    week: {
        type: Number,
        required: true,
    },
    meals: [{
        mealId: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        diets: {
            type: [String],
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }]
});

const MealPlan = mongoose.model('MealPlan', MealPlanSchema);

export default MealPlan;