/**
 * Created by VBO3596 on 17/03/2017.
 */
import React, {Component} from "react";
import {View, TextInput, StyleSheet} from "react-native";
import strings from "../util/localizedStrings";

export default class EmailInput extends Component {

    static defaultProps = {
        placeholder: strings.email,
        keyboardType: "email-address",
        underlineColorAndroid: "white",
        onSubmitEditing: () => {},
        onChangeText:(email) => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            email: null
        };
    }

    editEmail = (email) => {
        this.setState({
            email: email
        })
        this.props.onChangeText(email);
    }

    focus(){
        this.refs.email.focus();
    }

    render() {
        return (
            <View>
                <TextInput
                    style={[styles.textInput, this.props.style]}
                    onChangeText={this.editEmail}
                    placeholder= {this.props.placeholder}
                    ref="email"
                    keyboardType={this.props.keyboardType}
                    autoCorrect={false}
                    selectTextOnFocus={true}
                    underlineColorAndroid={this.props.underlineColorAndroid}
                    returnKeyType="next"
                    autoCapitalize="none"
                    onSubmitEditing= {this.props.onSubmitEditing}
                    value= {this.props.value}
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