import Ionicons from 'react-native-vector-icons/Ionicons';
import Evilicons from 'react-native-vector-icons/EvilIcons';

const icons = {
    "ios-add": [Ionicons, 30, '#FFFFFF'],
    "ios-close": [Ionicons, 30, '#FFFFFF'],
    "user":  [Evilicons, 30, '#FFFFFF'],
    "gear":  [Evilicons, 30, '#FFFFFF'],
    "ios-navigate-outline":  [Ionicons, 30, '#FFFFFF'],
    "heart":  [Evilicons, 30, '#FFFFFF'],

};

let iconsMap = {};
let iconsLoaded = new Promise((resolve, reject) => {
    new Promise.all(
        Object.keys(icons).map(iconName =>
            icons[iconName][0].getImageSource(
                iconName,
                icons[iconName][1],
                icons[iconName][2]
            ))
    ).then(sources => {
        Object.keys(icons)
            .forEach((iconName, idx) => iconsMap[iconName] = sources[idx]);
        resolve(true);
    })
});

export {
    iconsMap,
    iconsLoaded
};
