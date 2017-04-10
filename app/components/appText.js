/**
 * Created by LMA3606 on 21/03/2017.
 */
import React, {Component} from "react";
import {View, Text, StyleSheet, Platform} from "react-native";
import colors from "./events/colors";

class AppText extends Component {
    setNativeProps (nativeProps) {
        this._root.setNativeProps(nativeProps);
    }

    render() {
        return(
            <Text
                style={[
                    style.textStyle,
                    this.props.style
                ]}
                className={this.props.className}
                ref={component => this._root = component}
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
        color: colors.mediumGray,
        backgroundColor: 'transparent',
    }
});