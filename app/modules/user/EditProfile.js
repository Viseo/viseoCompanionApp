import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import AppTextInput from '../global/components/AppTextInput';
import PropTypes from 'prop-types';
import * as db from '../global/db';
import PasswordInput from './authentication/PasswordInput';
import PasswordCheckInput from './authentication/PasswordCheckInput';
import {bindActionCreators} from 'redux';
import {updateUser} from './user.actions';
import {signOut} from './authentication/authentication.actions';
import {startLoader} from '../global/navigationLoader';

class EditProfile extends Component {

    state = {
        user: {...this.props.user},
        passwordCheck: '',
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        const firstName = this.renderFirstNameField();
        const lastName = this.renderLastNameField();
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                {firstName}
                {lastName}
                <PasswordInput onPasswordChange={password => this._setPassword(password)}/>
                <PasswordCheckInput
                    password={this.state.user.password}
                    onPasswordCheckChange={passwordCheck => this._setPasswordCheck(passwordCheck)}
                />
            </ScrollView>
        );
    }

    renderFirstNameField() {
        return (
            <AppTextInput
                label="Nom"
                validator={(text) => this.isNonEmpty(text)}
                value={this.state.user.firstName}
                onChangeText={firstName => {
                    this._setFirstName(firstName);
                }}
            />
        );
    }

    renderLastNameField() {
        return (
            <AppTextInput
                label="Prénom"
                validator={(text) => this.isNonEmpty(text)}
                value={this.state.user.lastName}
                onChangeText={lastName => {
                    this._setLastName(lastName);
                }}
            />
        );
    }

    isNonEmpty(text) {
        return text.length > 0;
    }

    async updateProfile() {
        const updatedUser = await db.users.update(this.state.user);
        this.props.updateUser(updatedUser);
    }

    async submitProfileForm() {
        const passwordWasEdited = this.state.user.password && this.state.passwordCheck;
        const isPasswordValid = this.state.user.password === this.state.passwordCheck;
        if (!passwordWasEdited) {
            let updatedPassword = this.props.user.password;
            this._setPassword(updatedPassword);
            await this.updateProfile();
            this.props.navigator.pop();
        } else if (isPasswordValid) {
            await this.updateProfile();
            this.props.signOut();
            startLoader();
        }
    }

    onNavigatorEvent(event) {
        if (event.id === 'save') {
            this.submitProfileForm();
        }
    }

    _setFirstName(firstName) {
        this.setState({
            user: {
                ...this.state.user,
                firstName,
            },
        });
    }

    _setLastName(lastName) {
        this.setState({
            user: {
                ...this.state.user,
                lastName,
            },
        });
    }

    _setPassword(password) {
        this.setState({
            user: {
                ...this.state.user,
                password,
            },
        });
    }

    _setPasswordCheck(passwordCheck) {
        this.setState({
            passwordCheck,
        });
    }
}

EditProfile.propTypes = {
    user: PropTypes.object.isRequired,
};

EditProfile.navigatorButtons = {
    rightButtons: [
        {
            title: 'Enregistrer',
            id: 'save',
        },
    ],
};

const mapStateToProps = ({user}, ownProps) => ({
    user,
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateUser,
        signOut,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditProfile);

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 20,
    },
});