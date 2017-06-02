import React from "react";
import {Button, Image, Modal, ScrollView, StyleSheet, TouchableHighlight, View} from "react-native";
import {hasEmptyElement, isEmailValid, isPasswordValid} from "../util/util";
import {addUser, getUserByEmail} from "../util/db";
import strings from "../modules/global/localizedStrings";
import AppText from "../modules/global/AppText";
import EmailInput from "../components/emailInput";
import PasswordInput from "../components/passwordInput";
import {rememberUserWhenSignUp} from "../actionCreators/user";
import {connect} from "react-redux";

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            isEmailValid: true,
            password: '',
            isPasswordValid: true,
            passwordCheck: '',
            isPasswordCheckValid: true,
            isFormCompletelyFilled: true,
            errorMessage: '',
            modalVisible: false
        };

        this.onAccountCreatedNotificationPressed = this.onAccountCreatedNotificationPressed.bind(this);
        this.onChangeEmailText = this.onChangeEmailText.bind(this);
        this.onChangePasswordText = this.onChangePasswordText.bind(this);
        this.onChangePasswordCheckText = this.onChangePasswordCheckText.bind(this);
        this.onPressSignIn = this.onPressSignIn.bind(this);
        this.onPressSignUp = this.onPressSignUp.bind(this);
    }

    onAccountCreatedNotificationPressed() {
        this.setState({
            modalVisible: false
        });
        this.props.navigator.resetTo({
            title: 'Home'
        });
    }

    onChangeEmailText(text) {
        this.setState({
            email: text,
            isEmailValid: isEmailValid(text) || !text.length,
            isFormCompletelyFilled: true
        });
    }

    onChangePasswordText(text) {
        this.setState({
            password: text,
            isPasswordValid: isPasswordValid(text) || !text.length,
            isFormCompletelyFilled: true
        });
    }

    onChangePasswordCheckText(text) {
        let isPasswordCheckValid = this.state.password === text || !text.length;

        this.setState({
            passwordCheck: text,
            isPasswordCheckValid: isPasswordCheckValid,
            isFormCompletelyFilled: true
        });
    }

    onPressSignIn() {
        this.props.navigator.pop();
    }

    async onPressSignUp() {
        this.setState({errorMessage: ''});

        if (hasEmptyElement(this.state.email, this.state.password, this.state.passwordCheck)) {
            this.setState({isFormCompletelyFilled: false});
        } else if (!isEmailValid(this.state.email)) {
            this.setState({isEmailValid: false});
        } else if (!isPasswordValid(this.state.password)) {
            this.setState({isPasswordValid: false});
        } else if (this.state.password !== this.state.passwordCheck) {
            this.setState({isPasswordCheckValid: false});
        } else {
            try {
                let userAlreadyExists = await getUserByEmail(this.state.email);
                if (userAlreadyExists) {
                    this.setState({errorMessage: strings.emailAlreadyUsed});
                } else {
                    let email = this.state.email.toLowerCase();
                    let userAddedSuccessfully = await addUser(email, this.state.password);
                    if (userAddedSuccessfully) {
                        this.props.rememberUserWhenSignUp(this.state.email, this.state.password);
                        this.setState({modalVisible: true});
                    } else {
                        this.setState({errorMessage: strings.unableToReachServer});
                    }
                }
            } catch (error) {
                console.warn('signUp::onPressSignUp ' + error);
                this.setState({errorMessage: strings.unableToReachServer});
            }
        }
    }

    autoSubmitFormWhenLastInputIsFilled() {
        if (this.state.email.length && this.state.password.length && this.state.passwordCheck.length) {
            this.onPressSignUp();
            return true;
        }

        return false;
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
                <ScrollView>
                    <View style={{flexDirection: 'column', justifyContent: 'center', padding: 30}}>

                        {/* VISEO or SIGN UP logo */}
                        <View style={{alignItems: 'center', paddingBottom: 50}}>
                            <Image
                                source={require('../images/signUpLogo.png')}
                                style={{width: 110, height: 110}}
                            />
                        </View>

                        {/* User email input */}
                        <EmailInput ref="email"
                                    style={[styles.textInput, !this.state.isEmailValid && styles.invalidFormat]}
                                    onChangeText={this.onChangeEmailText}
                                    onSubmitEditing={() => {
                                        this.refs.password.focus();
                                    }}/>

                        {/* User password input */}
                        <PasswordInput ref="password"
                                       style={[styles.textInput, !this.state.isPasswordValid && styles.invalidFormat]}
                                       returnKeyType="next"
                                       onChangeText={this.onChangePasswordText}
                                       onSubmitEditing={() => {
                                           this.refs.passwordBis.focus();
                                       }}/>

                        {/* User password verification input */}
                        <PasswordInput ref="passwordBis"
                                       placeholder={strings.verifyPassword}
                                       style={[styles.textInput, !this.state.isPasswordValid && styles.invalidFormat]}
                                       returnKeyType="done"
                                       onChangeText={this.onChangePasswordCheckText}
                                       onSubmitEditing={() => {
                                           if (!hasEmptyElement(this.state.email, this.state.password, this.state.passwordCheck)
                                               && isEmailValid(this.state.email)
                                               && isPasswordValid(this.state.password)
                                               && this.state.password == this.state.passwordCheck) {
                                               this.autoSubmitFormWhenLastInputIsFilled();
                                           }
                                       }}/>

                        {/* Display error messages to help the user fill out the form */}
                        {this.renderFormFillingInformation()}

                        {/* Notify the user when their account was created before redirecting to home page */}
                        {this.renderAccountCreationPopout()}

                        {/* SIGN UP button */}
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 30}}>
                            <View style={{flex: 1, padding: 5}}>
                                <Button
                                    onPress={this.onPressSignUp}
                                    title={strings.signUp}
                                    color="#841584"
                                />
                            </View>
                        </View>

                        {/* Log in instead of creating a new account */}
                        <TouchableHighlight onPress={this.onPressSignIn} underlayColor='transparent'>
                            <AppText
                                style={{
                                    textAlign: 'center',
                                    fontSize: 12,
                                    color: 'blue',
                                    fontStyle: 'italic',
                                    paddingTop: 15
                                }}>
                                {strings.signInLink}
                            </AppText>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        );
    }

    renderAccountCreationPopout() {
        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.onAccountCreatedNotificationPressed;
                    }}
                >
                    <View style={{flex: 2, backgroundColor: 'rgba(227, 254, 255, 0.5)'}}></View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(186, 242, 255, 1)'
                        }}
                    >
                        <View>
                            <AppText style={{textAlign: 'center'}}>
                                {strings.accountCreated}
                            </AppText>
                            <Button
                                onPress={this.onAccountCreatedNotificationPressed}
                                title="OK"
                                color="#6ABEFF"
                            />
                        </View>
                    </View>
                    <View style={{flex: 2, backgroundColor: 'rgba(227, 254, 255, 0.5)'}}></View>
                </Modal>
            </View>
        );
    }

    renderFormFillingInformation() {
        // Messages to help the user fill the form
        // Only relevant ones are showed
        // Several messages can be showed at the same time (in the following order)
        let emailMessage = !this.state.isEmailValid ?
            <AppText style={styles.errorInfo}>{strings.invalidEmailFormat}</AppText> : null;
        let passwordMessage = !this.state.isPasswordValid ?
            <AppText style={styles.errorInfo}>{strings.invalidPasswordFormat}</AppText> : null;
        let passwordCheckMessage = !this.state.isPasswordCheckValid ?
            <AppText style={styles.errorInfo}>{strings.passwordsDontMatch}</AppText> : null;
        let missingFieldsMessage = !this.state.isFormCompletelyFilled ?
            <AppText style={styles.errorInfo}>{strings.missingFormFields}</AppText> : null;
        let errorMessage = this.state.errorMessage.length > 0 ?
            <AppText style={styles.errorInfo}>{this.state.errorMessage}</AppText> : null;

        return (
            <View>
                {emailMessage}
                {passwordMessage}
                {passwordCheckMessage}
                {missingFieldsMessage}
                {errorMessage}
            </View>
        );
    }
}

SignUp.navigatorStyle = {
    navBarHidden: true,
};

export default connect(
    null,
    {rememberUserWhenSignUp}
)(SignUp)

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
