import React, {Component} from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import colors from '../colors';

class AppText extends Component {
    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }

    render() {
        return (
            <Text
                style={[
                    style.textStyle,
                    this.props.style,
                ]}
                ref={component => this._root = component}
                numberOfLines={this.props.numberOfLines}
            >
                {this.props.children}
            </Text>
        );
    }
}

export default AppText;

const style = StyleSheet.create({
    textStyle: {
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
        fontSize: 15,
        backgroundColor: 'transparent',
        padding: 0,
        color: colors.mediumGray,
        textAlignVertical: 'center',
    },
});