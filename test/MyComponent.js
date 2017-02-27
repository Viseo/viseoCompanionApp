/**
 * Created by AAB3605 on 23/02/2017.
 */

import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import MyComponent from '../app/components/myComponent';
import { expect } from 'chai';

describe('<MyComponent />', () => {
    it('should render stuff', () => {
        const wrapper = shallow(<MyComponent />);
        expect(wrapper.length).to.equal(1);
        expect(wrapper.contains(<Text>I wonder if there will be any problems...</Text>)).to.equal(true);
    });
    it('should render more stuff', () => {
        const wrapper = shallow(<MyComponent />);
        expect(wrapper.find(<Text></Text>).at(0).props().test).to.equal("ok");
    });
});