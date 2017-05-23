import React, {Component} from "react";
import {Button, ScrollView, StyleSheet} from "react-native";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import strings from "../global/localizedStrings";
import AppText from "../global/AppText";
import {authenticate} from "./authentication.actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class SignIn extends Component {

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

    componentWillReceiveProps({isAuthenticated}) {
        if (isAuthenticated) {
            this._navigateToHome();
        }
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

    _navigateToHome() {
        this.props.navigator.popToRoot();
        this.props.navigator.push({
            screen: 'NewsFeed',
            title: 'Actualités',
            backButtonHidden: true,
        });
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
        if (this._isFormValid()) {
            const {email, password} = this.state;
            this.props.authenticate(email, password);
        }
    }
}

SignIn.defaultProps = {
    savedEmail: null,
    savedPassword: null,
};

SignIn.navigatorButtons = {
    rightButtons: [
        {
            title: 'Créer un compte',
            id: 'signUp',
            buttonColor: 'blue',
            buttonFontSize: 12,
            buttonFontWeight: '400',
        },
    ]
};

const mapStateToProps = ({authentication}, ownProps) => ({
    isAuthenticated: authentication.isAuthenticated,
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            authenticate,
        },
        dispatch
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);

const styles = StyleSheet.create({
    errorInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic'
    },
});