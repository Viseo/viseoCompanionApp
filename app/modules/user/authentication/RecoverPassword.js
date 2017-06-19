import React, {Component} from 'react';
import {Alert, Button, ScrollView, StyleSheet, View} from 'react-native';
import AppText from '../../global/components/AppText';
import strings from '../../global/localizedStrings';
import EmailInput from './EmailInput';
import {sendEmailPassword} from '../../global/db';
import PropTypes from 'prop-types';
import {defaultNavBarStyle} from '../../global/navigatorStyle';

export default class RecoverPassword extends Component {

    state = {
        email: this.props.email,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const instruction =
            <AppText style={{width: 300, height: 110}}>
                Veuillez entrer votre adresse email:
            </AppText>;
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
                <ScrollView>
                    <View style={{flexDirection: 'column', justifyContent: 'center', padding: 30}}>
                        {instruction}
                        <EmailInput ref="email"
                                    value={this.state.email}
                                    onEmailChange={(email) => this._onEmailChange(email)}
                                    onSubmitEditing={() => this.onPressResetPassword()}
                        />
                        <AppText style={styles.errorInfo}>{this.state.errorMessage}</AppText>
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 30}}>
                            <Button
                                onPress={this.onPressResetPassword}
                                title={strings.resetPassword}
                                color="#841584"
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _onEmailChange(text) {
        this.setState({
            email: text,
        });
    }

    _showSuccessModal() {
        Alert.alert(
            'Mot de passe réinitialisé avec succès',
            'Vérifiez votre email',
            [
                {
                    text: 'OK', onPress: () =>
                    this.props.navigator.resetTo({
                        screen: 'user.authentication.signIn',
                        title: 'Connexion',
                        navigatorStyle: defaultNavBarStyle,
                    }),
                },
            ],
            {
                cancelable: false,
            },
        );
    }

    onPressResetPassword = async () => {
        if (this.state.email) {
            let responseStatus = await sendEmailPassword(this.state.email);
            let emailNotFoundCode = 'false';
            switch (responseStatus) {
                case 404:
                    console.warn('Serveur introuvable');
                    break;
                case 'true':
                    this._showSuccessModal();
                    break;
                case emailNotFoundCode:
                    this.setState({errorMessage: 'Cette adresse mail n\'existe pas'});
                    break;
                default:
                    console.warn('erreur inconnu');
            }
        } else {
            this.setState({errorMessage: 'Veuillez entrer votre adresse mail.'});
        }
    };
}

RecoverPassword.propTypes = {
    email: PropTypes.string,
};

const styles = StyleSheet.create({
    errorInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic',
    },
});
