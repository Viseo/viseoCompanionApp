import configureStore from "./store/configureStore";
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './modules/global/registerScreens';
import {startLoader} from './modules/global/navigationLoader';

const store = configureStore();
registerScreens(store, Provider);

startLoader();