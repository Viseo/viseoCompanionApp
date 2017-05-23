/**
 * Created by VBO3596 on 18/04/2017.
 */
import React, {Component} from "react";
import {Button, Dimensions, Modal, Platform, ScrollView, StyleSheet, View} from "react-native";
import AppText from "./appText";
import strings from "../util/localizedStrings";
import colors from "./colors";
import * as util from "../util/util";
import ItemSpacer from "./ItemSpacer";
import BackButton from "./BackButton";
import TextField from "react-native-md-textinput";
import Toggle from "./Toggle";
import Avatar from "./Avatar";

let {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
let defaultImage = require('./../images/userAvatar.jpg');
export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            modalVisible: false,
            editedProfile: {
                picture: defaultImage,
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                email: this.props.user.email,
                password: this.props.password,
                birthDate: this.props.birthDate,
            },
        };
        this.onChangePasswordText = this.onChangePasswordText.bind(this);
        this.onChangePasswordCheckText = this.onChangePasswordCheckText.bind(this);
        this.validate = this.validate.bind(this);
    }

    toggleEditProfile = (editing) => {
        if (!editing) {
            this.props.updateUser(this.state.editedEvent)
        }
        this.setState({
            editing
        })
    }

    render() {
        const {editing, editedProfile} = this.state
        let passwordValid = editedProfile.password.length >= 6
        let passwordMatch = editedProfile.passwordCheck === editedProfile.password
        const password = (
            <TextField
                label={'Mot de passe'}
                style={{color: colors.mediumGray}}
                wrapper={styles.textFieldContainer}
                secureTextEntry={true}
                highlightColor={passwordValid ? '#00BCD4' : '#d41a0e'}
                value={editedProfile.password}
                onChangeText={(password) => {
                    this.setState({editedProfile: {...editedProfile, password}})
                }}
            />
        )
        const passwordCheck = (
            <TextField
                label={'Confirmez le mot de passe'}
                wrapper={styles.textFieldContainer}
                style={{color: colors.mediumGray}}
                secureTextEntry={true}
                highlightColor={passwordMatch ? '#00BCD4' : '#d41a0e'}
                value={editedProfile.passwordCheck}
                onChangeText={(passwordCheck) => {
                    this.setState({editedProfile: {...editedProfile, passwordCheck}})
                }}
            />
        )
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                {this.renderHeader()}
                <ScrollView
                    style={{flex: 15}}
                    contentContainerStyle={{paddingHorizontal: 20, justifyContent: 'flex-start'}}
                >
                    {this.renderAvatar()}
                    {this.renderFirstName()}
                    {this.renderLastName()}
                    {this.renderEmail()}
                    {editing && password}
                    {editing && passwordCheck}
                </ScrollView>
            </View>
        )
    }

    renderAvatar() {
        return (
            <Avatar firstName={this.state.editedProfile.firstName}
                    lastName={this.state.editedProfile.lastName}
                    style={{marginTop: 20}}
            />
        )
    }

    renderEmail() {
        let {editedProfile, editing} = this.state
        return editing ?
            <View/> :
            <View style={styles.textFieldContainer}>
                <AppText style={styles.label}>Email</AppText>
                <AppText style={styles.displayText}>{editedProfile.email}</AppText>
            </View>
    }

    renderFirstName() {
        let {editedProfile, editing} = this.state
        const firstNameText = (
            <View style={styles.textFieldContainer}>
                <AppText style={styles.label}>Nom</AppText>
                <AppText style={styles.displayText}>{editedProfile.firstName}</AppText>
            </View>
        )
        let firstNameValid = editedProfile.firstName.length > 0
        const firstNameField = (
            <TextField
                label={strings.firstName}
                wrapper={styles.textFieldContainer}
                style={{color: colors.mediumGray}}
                highlightColor={firstNameValid ? '#00BCD4' : '#d41a0e'}
                onChangeText={(firstName) => {
                    this.setState({editedProfile: {...editedProfile, firstName}});
                }}
                value={editedProfile.firstName}
            />
        )
        return editing ? firstNameField : firstNameText
    }

    renderLastName() {
        let {editedProfile, editing} = this.state
        const lastNameText = (
            <View style={styles.textFieldContainer}>
                <AppText style={styles.label}>Prénom</AppText>
                <AppText style={styles.displayText}>{editedProfile.lastName}</AppText>
            </View>
        )
        let lastNameValid = editedProfile.lastName.length > 0
        const lastNameField = (
            <TextField
                label={strings.lastName}
                style={{color: colors.mediumGray}}
                wrapper={styles.textFieldContainer}
                highlightColor={lastNameValid ? '#00BCD4' : '#d41a0e'}
                onChangeText={(lastName) => {
                    this.setState({editedProfile: {...editedProfile, lastName}});
                }}
                value={editedProfile.lastName}
            />
        )
        return editing ? lastNameField : lastNameText
    }

    renderHeader() {
        let {editing} = this.state
        const backButton = (
            <BackButton navigator={this.props.navigator}/>
        )
        const cancelButton = (
            <BackButton
                navigator={this.props.navigator}
                source={require("./../images/crossWhite.png")}
                style={{padding: 8}}
                onPress={() => this.setState({editing: false})}
            />
        )
        return (
            <View
                style={{flex: 0, height: 40, flexDirection: 'row', backgroundColor: colors.blue, alignItems: 'center'}}>
                {editing ? cancelButton :
                    backButton
                }
                <AppText style={{flex: 5, color: 'white', fontSize: 20}}>
                    {editing ? "Modification du profil" : "Profil"}
                </AppText>
                <View style={{flex: 3, flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Toggle
                            isOn={false}
                            style={{flex: 5}}
                            onToggle={this.toggleEditProfile}
                        >
                            <AppText style={{color: 'white', textAlign: 'right'}}>
                                {editing ? 'Enregistrer' : 'Modifier'}
                            </AppText>
                        </Toggle>
                        <ItemSpacer/>
                    </View>
                </View>
            </View>
        )
    }

    renderNotifySuccess() {
        const notificationMessage = this.state.cannotSave ? strings.invalidForm : profilModified;
        const pressFunction = this.state.cannotSave ? () => {
            this.setState({modalVisible: false})
        } : () => {
            this.props.navigator.resetTo({title: 'Home'});
        }
        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.props.navigator.resetTo({title: 'Home'});
                    }}>
                    <View style={{flex: 2, backgroundColor: 'rgba(227, 254, 255, 0.5)'}}></View>
                    <View style={styles.modal}>
                        <View>
                            <AppText style={{textAlign: 'center'}}>
                                {notificationMessage}
                            </AppText>
                            <Button
                                onPress={pressFunction}
                                title="OK"
                                color="#6ABEFF"
                            />
                        </View>
                    </View>
                    <View style={{flex: 2, backgroundColor: 'rgba(227, 254, 255, 0.5)'}}></View>
                </Modal>
            </View>
        );
    }

    validate() {
        let cannotSave = !this.state.isNewPasswordValid || !this.state.isPasswordCheckValid
            || this.state.firstname === '' || this.state.lastname === '';
        this.setState({cannotSave});
    }

    updateImage(selected) {
        const {editedProfile} = this.state
        let picture = {uri: selected};
        this.setState({editedProfile: {...editedProfile, picture}})
    }

    onChangePasswordText(password) {
        const {editedProfile} = this.state
        let isNewPasswordValid = util.isPasswordValid(password) || !password.length
        if (isNewPasswordValid) {
            this.setState({
                editedProfile: {...editedProfile, password},
                isNewPasswordValid: isNewPasswordValid
            });
        }
    }

    onChangePasswordCheckText(text) {
        const {editedProfile} = this.state
        let isPasswordCheckValid = editedProfile.password === text;
        this.setState({isPasswordCheckValid: isPasswordCheckValid});
    }
}

Profile.defaultProps = {
    picture: require('./../images/userAvatar.jpg'),
    firstName: 'Non renseigné',
    lastName: 'Non renseigné',
    email: 'Non renseigné',
    password: '',
    birthDate: '',
}

const styles = StyleSheet.create({

    avatar: {
        height: deviceWidth / 4,
        width: deviceWidth / 4,
        borderRadius: deviceWidth / 8,
        fontSize: 40,
        backgroundColor: colors.lightGray,
        textAlign: 'center',
        color: 'white',
    },
    topBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.blue,
        alignItems: 'center',
        height: (1 / 16) * deviceHeight,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    displayText: {
        fontSize: 18,
    },
    topBarText: {
        paddingHorizontal: 10,
        fontSize: 20,
        color: 'white',
    },

    container: {
        flex: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },

    organizatorPictureCircle: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },

    field: {
        justifyContent: 'center',
        fontSize: 16,
        color: colors.mediumGray,
        textAlign: 'center',
    },
    textFieldContainer: {
        marginTop: 20,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(186, 242, 255, 1)'
    }
});