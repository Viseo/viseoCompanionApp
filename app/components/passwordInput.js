/**
 * Created by VBO3596 on 17/03/2017.
 */
import React, {Component} from "react";
import {StyleSheet, TextInput, View} from "react-native";
import strings from "../util/localizedStrings";

export default class PasswordInput extends Component {

    static defaultProps = {
        placeholder: strings.password,
        underlineColorAndroid: "white",
        minLength: 6,
        returnKeyType: "done",
        onSubmitEditing: () => {
        },
        onChangeText: (password) => {
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            password: null
        };
    }

    editPassword = (password) => {
        this.setState({
            password: password
        })
        this.props.onChangeText(password);
    }

    focus() {
        this.refs.password.focus();
    }

    render() {
        return (
            <View style={{flexDirection: 'row', flex: 1}}>
                <TextInput
                    style={[this.props.style, styles.textInput, {flex: 1, textAlign: 'center'}]}
                    onChangeText={this.editPassword}
                    placeholder={this.props.placeholder}
                    ref="password"
                    password={true}
                    autoCorrect={false}
                    selectTextOnFocus={true}
                    secureTextEntry={true}
                    underlineColorAndroid={this.props.underlineColorAndroid}
                    minLength={this.props.minLength}
                    returnKeyType={this.props.returnKeyType}
                    keyboardType={this.props.keyboardType}
                    onSubmitEditing={this.props.onSubmitEditing}
                    value={this.props.value}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic'
    },
    invalidFormat: {
        borderColor: 'crimson',
        borderWidth: 1
    },
    textInput: {
        borderWidth: 0,
        borderRadius: 10,
        fontSize: 18,
        textAlign: 'center',
        padding: 4,
        height: 40,
        marginBottom: 10,
    }
});