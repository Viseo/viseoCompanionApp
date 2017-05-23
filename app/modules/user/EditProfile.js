import React, {Component} from 'react';
import {ScrollView, StyleSheet} from "react-native";
import {connect} from "react-redux";
import AppTextInput from "../global/AppTextInput";
import PropTypes from 'prop-types';

class EditProfile extends Component {

    state = {
        password: '',
        passwordsMatch: false,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const firstName = this.renderFirstNameField();
        const lastName = this.renderLastNameField();
        const passwordField = this.renderPasswordField();
        const passwordCheckField = this.renderPasswordCheckField();
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                {firstName}
                {lastName}
                {passwordField}
                {passwordCheckField}
            </ScrollView>
        );
    }

    renderFirstNameField() {
        return (
            <AppTextInput
                label="Nom"
                validator={(text) => this.isNonEmpty(text)}
                value={this.props.firstName}
            />
        );
    }

    renderLastNameField() {
        return (
            <AppTextInput
                label="Prénom"
                validator={(text) => this.isNonEmpty(text)}
                value={this.props.lastName}
            />
        );
    }

    renderPasswordField() {
        return (
            <AppTextInput
                label="Mot de passe"
                validator={(text) => this.verifyPassword(text)}
                secureTextEntry={true}
                value={this.props.password}
            />
        );
    }

    renderPasswordCheckField() {
        return (
            <AppTextInput
                label="Vérifiez le mot de passe"
                validator={(text) => this.verifyPasswordCheck(text)}
                secureTextEntry={true}
                value={this.props.password}
            />
        );
    }

    verifyPassword(password) {
        const isValid = password.length >= 6;
        this.setState({
            password: isValid ? password : '',
        })
        return isValid;
    }

    verifyPasswordCheck(passwordCheck) {
        const passwordsMatch = this.state.password === passwordCheck;
        this.setState({
            passwordsMatch
        });
        return passwordsMatch;
    }

    isNonEmpty(text) {
        return text.length > 0;
    }
}

EditProfile.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

EditProfile.navigatorButtons = {
    rightButtons: [
        {
            title:'Enregistrer',
            id: 'save'
        }
    ]
};

const mapStateToProps = ({user}, ownProps) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    ...ownProps,
});

export default connect(
    mapStateToProps,
)(EditProfile);

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal:20,
    }
});