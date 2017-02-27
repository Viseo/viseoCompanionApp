/**
 * Created by LMA3606 on 27/02/2017.
 */

import React from "react";
import {
    ActivityIndicator,
    Animated,
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    Navigator,
    NavMenu,
    ScrollView,
    View,
    TouchableOpacity,
    ListView,
    Dimensions,
    RefreshControl,
    Platform
} from "react-native";



import { shallow } from "enzyme";

import Home from "../scenes/home";

describe("<Home />", () => {

    it('Should render 1 text', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find(Text)).to.have.length(1);
    });

    it('Should render 1 image', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find(Image)).to.have.length(1);
    });
});