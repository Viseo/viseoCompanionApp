import colors from '../modules/global/colors';

export function isEmailValid(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}
export function isPasswordValid(password) {
    return password.length >= 6;
}
export function getCategoryColor(categoryId) {
    let eventCategoriesColors = [colors.red, colors.orange, colors.green];
    return eventCategoriesColors[categoryId];
}