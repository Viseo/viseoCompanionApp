import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet, View, Image} from 'react-native';
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
import AppText from '../global/components/AppText';
import ImagePicker from '../global/components/ImagePicker';

export class EditProfile extends Component {

    state = {
        user: {...this.props.user},
        passwordCheck: '',
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        const image = this._renderImagePicker();
        const firstName = this.renderFirstNameField();
        const lastName = this.renderLastNameField();
        const email = this.renderEmailField();

        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                {image}
                {firstName}
                {lastName}
                {email}
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

    renderEmailField() {
        return (
            <View style={{marginBottom: -5}}>
                <AppText style={{marginLeft: 1, marginTop: 15, fontSize: 12, color: '#A9A9A9'}}>
                    Email
                </AppText>
                <AppText style={{marginLeft: 5}}>
                    {this.state.user.email}
                </AppText>
            </View>
        );
    }

    _renderImagePicker() {
        const defaultPicture = require('../../images/events/defaultEventImage.jpeg');
        return (
            <View>
                <AppText style={styles.imageLabel}>Image : </AppText>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <AppText styles={styles.imagePickerCaption}>Cliquez pour changer d'image</AppText>
                </View>
                <ImagePicker
                    defaultPicture={defaultPicture}
                    style={styles.image}
                    onSelected={imageUrl => this.setState({
                        user: {
                            ...this.state.user,
                            imageUrl: imageUrl,
                        },
                    })}
                />
            </View>
        );
    }

    isNonEmpty(text) {
        return text.length > 0;
    }

    async updateProfile() {
        let updatedUser = await db.users.update(this.state.user);
        this.props.updateUser(updatedUser);
    }

    async submitProfileForm() {
        const passwordWasEdited = this.state.user.password && this.state.passwordCheck;
        const isPasswordValid = (this.state.user.password === this.state.passwordCheck);
        if (!passwordWasEdited && !isPasswordValid) {
            await this.updateProfile();
            this.props.navigator.pop();
        } else if (passwordWasEdited && isPasswordValid) {
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
    navigator: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,

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

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 20,
    },
    image: {
        width,
        height: height / 5,
    },
    imageLabel: {
        fontWeight: 'bold',
        marginBottom: 9,
    },
    imagePickerCaption: {
        fontStyle: 'italic',
    },
});




