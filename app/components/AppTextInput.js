/**
 * Created by AAB3605 on 10/04/2017.
 */
import React, {Component} from "react";
import {Platform, StyleSheet, TextInput} from "react-native";
import colors from "../modules/global/colors";

export default class AppTextInput extends Component {

    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TextInput
                {...this.props}
                style={[
                    styles.input,
                    this.props.style]}
                autoCorrect={false}
                value={this.props.value}
            />
        )
    }
}

const styles = StyleSheet.create({
    input: {
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
        fontSize: 15,
        backgroundColor: 'transparent',
        textAlign: 'left',
        padding: 0,
        paddingHorizontal: 10,
        color: colors.blue,
        textAlignVertical: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.blue,
    },
})