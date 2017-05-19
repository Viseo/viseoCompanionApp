import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, Button} from "react-native";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import strings from "../global/localizedStrings";
import AppText from "../global/AppText";

export default class SignIn extends Component {

    state = {
        email: '',
        password: '',
        rememberUser: true,
        errorMessage: '',
        hasSubmittedForm: false,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const shouldDisplayErrorMessage = this.state.hasSubmittedForm && !this._isFormValid();
        const errorMessage = shouldDisplayErrorMessage ? this.renderErrorMessage() : null;
        const signInButton = this.renderSignInButton();
        return (
            <ScrollView>
                <EmailInput onEmailChange={email => this._setEmail(email)}/>
                <PasswordInput onPasswordChange={password => this._setPassword(password)}/>
                {errorMessage}
                {signInButton}
            </ScrollView>
        );
    }

    renderErrorMessage() {
        const errorMessage = strings.wrongCredentials;
        return <AppText style={styles.errorInfo}>{errorMessage}</AppText>;
    }

    renderSignInButton() {
        return (
            <Button
                title={strings.signIn}
                onPress={() => this._signIn()}
                color="#841584"
            />
        )
    }

    _isFormValid() {
        return this.state.email
            && this.state.password;
    }

    _setEmail(email) {
        this.setState({
            email
        })
    }

    _setPassword(password) {
        this.setState({
            password
        })
    }

    _signIn() {
        this.setState({hasSubmittedForm: true});
    }
}

const styles = StyleSheet.create({
    errorInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic'
    },
});