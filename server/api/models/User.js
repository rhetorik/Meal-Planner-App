import mongoose from 'mongoose';

// {
//     _id: 1,
//     username: 'prof_auman',
//     password: '6cf62ac8a7e479f80a36d16e5c7a237f:bffdef4fecd6f5273b54593175ab3de0be4a3c450c520bdce2b9fb6025bdfd0c',
//     preferences: ['ketogenic']
// }

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            set: (username) => username.toLowerCase()
        },
        password: {
            type: String,
            required: true,
        },
        preferences: {
            type: [String],
            required: true,
            default: []
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

UserSchema.virtual('user_mealplans', {
    ref: 'MealPlan',
    localField: '_id',
    foreignField: 'user_id'
});

const User = mongoose.model('User', UserSchema);

export default User;