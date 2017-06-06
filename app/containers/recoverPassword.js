/**
 * Created by AAB3605 on 17/02/2017.
 */
import React, {Component} from "react";
import {Alert, Button, Image, ScrollView, StyleSheet, TouchableHighlight, View} from "react-native";
import AppText from "../modules/global/AppText";
import {isEmailValid} from "../util/util";
import settings from "../modules/global/settings";
import strings from "../modules/global/localizedStrings";
import EmailInput from "../components/emailInput";
import {connect} from "react-redux";

class RecoverPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: this.props.email,
            isEmailValid: true,
            isFormCompletelyFilled: true
        };
        this.onChangeEmailText = this.onChangeEmailText.bind(this);
        this.onChangeEmailText = this.onChangeEmailText.bind(this);
        this.onPressResetPassword = this.onPressResetPassword.bind(this);
    }

    onChangeEmailText(text) {
        this.setState({
            email: text,
            isEmailValid: isEmailValid(text) || !text.length,
            isFormCompletelyFilled: true
        });
    }

    resetPassword = async () => {
        try {
            let email_verification_response = await fetch(settings.api.resetPassword + '?email=' + this.state.email,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            let didEmailSend = await email_verification_response.json();
            return didEmailSend;
        } catch (error) {
            console.warn('ResetPassword::SendEmailError')
        }
        return 404;
    };

    onPressResetPassword = async () => {
        if (isEmailValid(this.state.email)) {
            let status = await this.resetPassword();
            let emailNotFoundCode = false;
            switch (status) {
                case 404:
                    console.warn("Serveur introuvable");
                    break;
                case true:
                    this.showSuccessModal();
                    break;
                case emailNotFoundCode:
                    this.setState({errorMessage: "Cette adresse mail n\'existe pas"});
                    break;
                default:
                    console.warn("erreur inconnu");
            }
        } else {
            this.setState({errorMessage: "Veuillez entrer votre adresse mail :"})
        }
    };

    showSuccessModal() {
        Alert.alert(
            'Mot de passe réinitialisé avec succès',
            'Vérifiez votre email',
            [
                {
                    text: 'OK', onPress: () =>
                    this.props.navigator.resetTo({
                        title: 'SignIn'
                    })
                },
            ],
            {
                cancelable: false
            }
        )
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>

                <ScrollView>
                    <View style={{flexDirection: 'column', justifyContent: 'center', padding: 30}}>

                        {/* VISEO or SIGN UP logo */}
                        <View style={{alignItems: 'center', paddingBottom: 50}}>
                            <Image
                                source={require('../images/user/signUpLogo.png')}
                                style={{width: 110, height: 110}}
                            />
                        </View>

                        {/* instruction */}
                        <AppText style={{width: 300, height: 110}}>
                            Veuillez entrer une adresse e-mail valide :
                        </AppText>

                        {/* User email input */}
                        <EmailInput ref="email"
                                    style={[styles.textInput, !this.state.isEmailValid && styles.invalidFormat]}
                                    value={this.state.email}
                                    onChangeText={this.onChangeEmailText}
                        />
                        <AppText style={styles.errorInfo}>{this.state.errorMessage}</AppText>

                        {/* RESET PASSWORD button */}
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 30}}>
                            <TouchableHighlight>
                                <View style={{flex: 1, padding: 5}}>
                                    <Button
                                        onPress={this.onPressResetPassword}
                                        title={strings.resetPassword}
                                        color="#841584"
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({user}, ownProps) => ({
    email: user.email,
});

export default connect(
    mapStateToProps,
    null
)(RecoverPassword);

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
