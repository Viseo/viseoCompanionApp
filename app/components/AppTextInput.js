/**
 * Created by AAB3605 on 10/04/2017.
 */
import React, {Component} from "react";
import {TextInput, StyleSheet, Platform} from "react-native";
import colors from "./colors";

export default class AppTextInput extends Component {

    setNativeProps (nativeProps) {
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
                    !this.props.editable && {borderWidth:0},
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
        flex: 1,
        fontSize: 15,
        backgroundColor: 'transparent',
        textAlign: 'left',
        padding: 0,
        color:colors.mediumGray,
        textAlignVertical:'center'
    },
})