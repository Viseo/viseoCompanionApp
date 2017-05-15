import React, {Component} from 'react';
import {Provider} from "react-redux";
import configureStore from './../store/configureStore';
import App from "./App";

const store = configureStore();

export default class Root extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}