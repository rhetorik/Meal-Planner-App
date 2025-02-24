import User from '../models/User.js';

import { hash, compare, signToken } from '../util/auth.js';
import { validatePreferences } from '../util/diet.js';

const registerUser = async (req, res) => {
    try {
        const { username, password, preferences = [] } = req.body;
        if (!username || !password) {
            return res.status(422).json({ error: 'Must provide both username and password'});
        }

        const hashedPassword = await hash(password);

        const userEntry = await User.create({
            username,
            password: hashedPassword,
            preferences
        })

        res.json({
            _id: userEntry._id,
            username: userEntry.username,
            preferences: userEntry.preferences
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(422).json({ error: 'Must provide both username and password'});
        }

        const userEntry = await User.findOne({ username: username.toLowerCase() });
        if (!userEntry) {
            return res.status(401).json( {error: 'Invalid username' });
        }

        const isPasswordEqual = await compare(password, userEntry.password);
        if (!isPasswordEqual) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = signToken(userEntry.username, userEntry._id)

        res.json({_id: userEntry._id,
            username: userEntry.username,
            preferences: userEntry.preferences,
            token_type: 'Bearer',
            access_token: token
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const getUserById = async (req, res) => {
    try {
        const { user_id } = req.verified;
        const { id } = req.params;
        if (user_id !== id) {
            return res.status(403).json({ error: 'Forbidden user.' });
        }
        const userEntry = await User.findById(id)
        .select('-password')
        .populate('user_mealplans');
        
        res.status(200).json(userEntry);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const updatePreferences = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.verified;
        const { preferences } = req.body;
        if (id !== user_id) {
            return res.status(403).json({ error: 'Forbidden user.' });
        }
        const userEntry = await User.findById(id)
        .select('-password')
        .populate('user_mealplans');


        const invalidPreferences = validatePreferences(preferences);
        if (invalidPreferences.length) {
            return res
                .status(400)
                .json({ error: `Invalid dietary preferences: ${invalidPreferences}` });
        }

        userEntry.preferences = preferences;
        await userEntry.save();
        res.status(200).json(userEntry);
    } catch (error) {
        res.status(500).json({ error: error.toString() })
    }
};

export { registerUser, loginUser, getUserById, updatePreferences };