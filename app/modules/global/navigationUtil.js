export function hideTabBar(navigator) {
    navigator.toggleTabs({
        to: 'hidden',
    });
}

export function showTabBar(navigator) {
    navigator.toggleTabs({
        to: 'shown',
    });
}