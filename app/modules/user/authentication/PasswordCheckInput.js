import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import TextField from 'react-native-md-textinput';
import colors from '../../global/colors';
import {View} from 'react-native';
import AppText from '../../global/AppText';
import strings from '../../global/localizedStrings';
import PropTypes from 'prop-types';

export default class PasswordCheckInput extends Component {

    state = {
        isValid: true,
        passwordCheck: '',
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {isValid, passwordCheck} = this.state;
        const errorMessage = this.renderErrorMessage();
        return (
            <View>
                <TextField
                    label={'Confirmation du mot de passe'}
                    style={{color: colors.mediumGray}}
                    highlightColor={isValid ? '#00BCD4' : '#d41a0e'}
                    value={passwordCheck}
                    secureTextEntry={true}
                    onChangeText={passwordCheck => {
                        this._setPassword(passwordCheck);
                        passwordCheck = this._isPasswordValid(passwordCheck) ? passwordCheck : '';
                        this.props.onPasswordCheckChange(passwordCheck);
                    }}
                    returnKeyType={'next'}
                />
                {errorMessage}
            </View>
        );
    }

    renderErrorMessage() {
        const errorMessage = strings.passwordsDontMatch;
        return this.state.isValid ?
            null :
            <AppText style={styles.errorInfo}>{errorMessage}</AppText>;
    }

    _isPasswordValid(passwordCheck) {
        return passwordCheck === this.props.password;
    };

    _setPassword(passwordCheck) {
        const isValid = this._isPasswordValid(passwordCheck);
        this.setState({passwordCheck, isValid});
    };
}

PasswordCheckInput.propTypes = {
    onPasswordCheckChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    errorInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic',
    },
});