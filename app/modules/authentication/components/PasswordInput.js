import React, {Component} from "react";
import {StyleSheet} from 'react-native';
import TextField from "react-native-md-textinput";
import colors from "../../global/colors";
import {View} from "react-native";
import AppText from "../../global/AppText";
import strings from "../../global/localizedStrings";

export default class PasswordInput extends Component {

    state = {
        isValid: true,
        email: '',
        password: '',
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {isValid, password} = this.state;
        const errorMessage = this.renderErrorMessage();
        return (
            <View>
                <TextField
                    label={'Mot de passe'}
                    style={{color: colors.mediumGray}}
                    highlightColor={isValid ? '#00BCD4' : '#d41a0e'}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={password => {
                        this._setPassword(password);
                        password = this.state.isValid ? password : '';
                        this.props.onPasswordChange(password);
                    }}
                />
                {errorMessage}
            </View>
        );
    }

    renderErrorMessage() {
        const errorMessage = strings.invalidPasswordFormat;
        return this.state.isValid?
            null :
            <AppText style={styles.errorInfo}>{errorMessage}</AppText>;
    }

    _isPasswordValid(password) {
        return password.length >= 6;
    };

    _setPassword(password) {
        const isValid = this._isPasswordValid(password);
        this.setState({password, isValid});
    };
}

const styles = StyleSheet.create({
    errorInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic'
    },
});