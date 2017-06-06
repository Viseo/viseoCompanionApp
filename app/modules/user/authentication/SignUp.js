import React, {Component} from 'react';
import {Button, Image, ScrollView, StyleSheet, TouchableHighlight, View} from 'react-native';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import strings from '../../global/localizedStrings';
import AppText from '../../global/AppText';
import {authenticate} from './authentication.actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {startApp} from '../../global/navigationLoader';
import {rememberUser as toggleRememberUser} from '../../../actionCreators/user';
import {defaultNavBarStyle} from '../../global/navigatorStyle';
import colors from '../../global/colors';
import PasswordCheckInput from './PasswordCheckInput';

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        passwordCheck: '',
        errorMessage: '',
        hasSubmittedForm: false,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const logo = this._renderLogo();
        const shouldDisplayErrorMessage = this.state.hasSubmittedForm && !this._isFormFilled();
        const errorMessage = shouldDisplayErrorMessage ? this._renderErrorMessage() : null;
        const signUpButton = this._renderSignUpButton();
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                {logo}
                <EmailInput onEmailChange={email => this._setEmail(email)}/>
                <PasswordInput onPasswordChange={password => this._setPassword(password)}/>
                <PasswordCheckInput
                    password={this.state.password}
                    onPasswordCheckChange={passwordCheck => this._setPassword(passwordCheck)}
                />
                {errorMessage}
                {signUpButton}
            </ScrollView>
        );
    }

    _isFormFilled() {
        return this.state.email
            && this.state.password
            && this.state.passwordCheck;
    }

    _navigateToHome() {
        startApp();
    }

    _renderErrorMessage() {
        return <AppText style={styles.errorInfo}>{this.state.errorMessage}</AppText>;
    }

    _renderLogo() {
        return (
            <View style={{alignItems: 'center', paddingBottom: 50}}>
                <Image
                    source={require('../../../images/user/signUpLogo.png')}
                    style={{width: 110, height: 110}}
                />
            </View>
        );
    }

    _renderSignUpButton() {
        return (
            <View style={styles.signUpButton}>
                <Button
                    title={strings.signUp}
                    onPress={() => this._signIn()}
                    color={colors.blue}
                />
            </View>
        );
    }

    _setEmail(email) {
        this.setState({
            email,
        });
    }

    _setPassword(password) {
        this.setState({
            password,
        });
    }

    _signIn() {
        this.setState({hasSubmittedForm: true});
        if (this._isFormFilled()) {
            const {email, password} = this.state;
            this.props.authenticate(email, password);
        }
    }
}

const mapStateToProps = ({authentication}, ownProps) => ({
    isAuthenticated: authentication.isAuthenticated,
    rememberUser: authentication.rememberUser,
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            authenticate,
            toggleRememberUser,
        },
        dispatch,
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignUp);

const styles = StyleSheet.create({
    errorInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic',
    },
    mainContainer: {
        paddingHorizontal: 60,
        paddingTop: 30,
        backgroundColor: 'white',
    },
    rememberPasswordLink: {
        textAlign: 'right',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic',
        paddingRight: 5,
    },
    signUpButton: {
        marginTop: 30,
    },
});