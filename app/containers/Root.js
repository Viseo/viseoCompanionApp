import React, {Component} from "react";
import {Provider} from "react-redux";
import configureStore from "./../store/configureStore";
import App from "./App";
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './../screens/';

const store = configureStore();
registerScreens();

Navigation.startTabBasedApp({
    tabs: [
        {
            label: 'One',
            screen: 'example.FirstTabScreen', // this is a registered name for a screen
            icon: require('../images/eye.png'),
            selectedIcon: require('../images/filter.png'), // iOS only
            title: 'Screen One'
        },
        {
            label: 'Two',
            screen: 'example.SecondTabScreen',
            icon: require('../images/lock.png'),
            selectedIcon: require('../images/filter.png'), // iOS only
            title: 'Screen Two'
        }
    ]
});

// export default class Root extends Component {
//
//     constructor(props) {
//         super(props)
//     }
//
//     render() {
//         return (
//             <Provider store={store}>
//                 <App/>
//             </Provider>
//         );
//     }
// }