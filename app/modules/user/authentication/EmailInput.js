import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import TextField from "react-native-md-textinput";
import colors from "../../global/colors";
import AppText from "../../global/AppText";
import strings from "../../global/localizedStrings";
import PropTypes from 'prop-types';

export default class EmailInput extends Component {

    state = {
        isValid: true,
        email: '',
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
                        this._setEmail(email);
                        email = this._isEmailValid(email) ? email : '';
                        this.props.onEmailChange(email);
                    }}
                    returnKeyType={this.props.returnKeyType || 'next'}
                    autoFocus = {true}
                    onSubmitEditing = {this.props.onSubmitEditing}
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

    _setEmail(email) {
        const isValid = this._isEmailValid(email);
        this.setState({email, isValid});
    };
}
EmailInput.propTypes = {
    onEmailChange: PropTypes.func.isRequired,
    returnKeyType: PropTypes.string,
    onSubmitEditing: PropTypes.func,
};

const styles = StyleSheet.create({
    errorInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic'
    },
});