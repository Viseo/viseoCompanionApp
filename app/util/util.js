import colors from '../modules/global/colors';

// todo refactor: remove this from project
export function getCategoryColor(categoryId) {
    let eventCategoriesColors = [colors.red, colors.orange, colors.green];
    return eventCategoriesColors[categoryId];
}