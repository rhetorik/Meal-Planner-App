import axios from 'axios';
import User from '../models/User.js';

// eslint-disable-next-line no-undef
const SPOON_API_KEY = process.env.SPOON_API_KEY;
// eslint-disable-next-line no-undef
const SPOON_API_URL = process.env.SPOON_API_URL;

const getMeals = async (req, res) => {
    try {
        const { user_id } = req.verified;
        const { name, preferences } = req.query;

        // verify there is a requesting user (user_id)
        if (!user_id) {
            return res.status(403).json({ error: 'Forbidden user' });
        }

        const userEntry = await User.findById(user_id);

        // optional - below
        // split the preferences into an array or set to an empty array
        const queryPreferences = preferences ? preferences.split(',') : [];
        // concat user preferences with preferences passed into query params
        const diet = [...userEntry.preferences, ...queryPreferences].join(',');

        const response = await axios.get(`${SPOON_API_URL}/recipes/complexSearch`, {
            params: {
                apiKey: SPOON_API_KEY,
                query: name,
                diet,
                addRecipeInformation: true // boolean flag to return diets array
            }
        });
        console.log(`${SPOON_API_URL}/recipes/complexSearch`);
        console.log({
            apiKey: SPOON_API_KEY,
            query: name,
            diet,
            addRecipeInformation: true // boolean flag to return diets array
        });

        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export { getMeals };