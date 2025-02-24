const DIETS = [
    'gluten free',
    'dairy free',
    'vegan',
    'vegetarian',
    'ketogenic',
    'pescetarian',
    'primal',
    'paleo',
    'whole30',
    'low fodmap',
    'lacto-vegetarian',
    'ovo-vegetarian'

];

const validatePreferences = (preferences) => {
    return preferences.filter((preference) => !DIETS.includes(preference.toLowerCase()));
};

export { validatePreferences };
