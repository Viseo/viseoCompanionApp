import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import TextField from 'react-native-md-textinput';
import colors from '../../global/colors';
import AppText from '../../global/components/AppText';
import strings from '../../global/localizedStrings';
import PropTypes from 'prop-types';

export default class EmailInput extends Component {

    state = {
        isValid: true,
        email: this.props.value,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {isValid, email} = this.state;
        const errorMessage = this.renderErrorMessage();
        return (
            <View>
                <TextField
                    label={'Email'}
                    keyboardType={'email-address'}
                    style={{color: colors.mediumGray}}
                    highlightColor={isValid ? '#00BCD4' : '#d41a0e'}
                    value={email}
                    onChangeText={email => {
                        const isValid = this._isEmailValid(email);
                        this._setEmail(email, isValid);
                        email = isValid ? email : '';
                        this.props.onEmailChange(email);
                    }}
                    returnKeyType={this.props.returnKeyType || 'next'}
                    onSubmitEditing={this.props.onSubmitEditing}
                />
                {errorMessage}
            </View>
        );
    }

    renderErrorMessage() {
        const errorMessage = strings.invalidEmailFormat;
        return this.state.isValid ?
            null :
            <AppText style={styles.errorInfo}>{errorMessage}</AppText>;
    }

    _isEmailValid(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };

    _setEmail(email, isValid) {
        this.setState({email, isValid});
    };
}
EmailInput.propTypes = {
    onEmailChange: PropTypes.func.isRequired,
    returnKeyType: PropTypes.string,
    onSubmitEditing: PropTypes.func,
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