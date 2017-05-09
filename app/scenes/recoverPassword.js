/**
 * Created by AAB3605 on 17/02/2017.
 */
import React, {Component} from 'react';
import {
    View,
    Alert,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    Image,
    TouchableHighlight
} from 'react-native';
import AppText from '../components/appText';
import {isEmailValid} from "../util/util";
import strings from "../util/localizedStrings";
import EmailInput from "./../components/emailInput";

export default class RecoverPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            isEmailValid: true,
            isFormCompletelyFilled: true,
        }

        this.onChangeEmailText = this.onChangeEmailText.bind(this);
        this.onPressResetPassword = this.onPressResetPassword.bind(this);
    }

    onPressResetPassword() {

        if(isEmailValid(this.state.email)) {
            console.warn("Réinitialisation effectuée avec succès à l'adresse mail : " + this.state.email);
            Alert.alert(
                'Mot de passe réinitialisé avec succès',
                'Vérifiez votre email',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed!')},
                ],
                {
                    cancelable: false
                }
            )
        }
    };

    onChangeEmailText(text) {
        this.setState({
            email: text,
            isEmailValid: isEmailValid(text) || !text.length,
            isFormCompletelyFilled: true
        });
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>

                <ScrollView>
                    <View style={{flexDirection: 'column', justifyContent: 'center', padding: 30}}>

                        {/* VISEO or SIGN UP logo */}
                        <View style={{alignItems: 'center', paddingBottom: 50}}>
                            <Image
                                source={require('./../images/signUpLogo.png')}
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
                                    onChangeText={this.onChangeEmailText}
                        />

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
