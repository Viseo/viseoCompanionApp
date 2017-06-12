import configureStore from "./store/configureStore";
import { Provider } from 'react-redux';
import { registerScreens } from './modules/global/registerScreens';
import {startAppLoader} from './modules/global/navigationLoader';

const store = configureStore();
registerScreens(store, Provider);

startAppLoader();