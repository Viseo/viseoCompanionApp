export function hideTabBar(navigator) {
    navigator.toggleTabs({
        to: 'hidden',
        animated: true,
    });
}

export function showTabBar(navigator) {
    navigator.toggleTabs({
        to: 'shown',
        animated: true,
    });
}