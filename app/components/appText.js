/**
 * Created by LMA3606 on 21/03/2017.
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class AppText extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Text style={[style.textStyle, this.props.style]} className={this.props.className}>
                {this.props.children}
            </Text>
        );
    }
}

export default AppText;

const style = StyleSheet.create({
    textStyle: {
        fontFamily: 'sans-serif-light',
    }
});