/**
 * Created by VBO3596 on 18/04/2017.
 */
import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    Button,
    Platform,
    TouchableOpacity,
    Modal
} from "react-native";
import PasswordInput from "./passwordInput";
import EditableImage from "./editableImage";
import AppText from "./appText";
import EditableAppText from "./editableAppText";
import strings from "../util/localizedStrings";
import colors from "./colors";
import DatePicker from "react-native-datepicker";
import * as util from "../util/util";
import FlexImage from "./FlexImage";
import ItemSpacer from "./ItemSpacer";
import BackButton from "./BackButton";
import TextField from 'react-native-md-textinput'
import Toggle from "./Toggle";
import Avatar from "./Avatar";

let {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
let defaultImage = require('./../images/userAvatar.jpg');
export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            canEdit: this.props.canEdit,
            editing: false,
            modalVisible: false,
            editedProfile: {
                picture: defaultImage,
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                email: this.props.email,
                password: this.props.password,
                birthDate: this.props.birthDate,
            },
            cannotSave: false,
            isNewPasswordValid: true,
            isPasswordCheckValid: true,
            passwordVisible: false,
        };
        this.onChangePasswordText = this.onChangePasswordText.bind(this);
        this.onChangePasswordCheckText = this.onChangePasswordCheckText.bind(this);
        this.validate = this.validate.bind(this);
    }

    render() {
        const {editedProfile} = this.state
        const header = this.renderHeader()
        const avatar = this.renderAvatar()
        const firstName = (
            <TextField
                label={strings.firstName}
                style={{color: colors.mediumGray}}
                highlightColor={'#00BCD4'}
                onChangeText={(firstName) => {
                    this.setState({editedProfile: {...editedProfile, firstName}});
                }}
                value={editedProfile.firstName}
            />
        )
        const lastName = (
            <TextField
                label={strings.lastName}
                style={{color: colors.mediumGray}}
                highlightColor={'#00BCD4'}
                onChangeText={(lastName) => {
                    this.setState({editedProfile: {...editedProfile, lastName}});
                }}
                value={editedProfile.lastName}
            />
        )
        const email = <AppText style={[styles.field, {color: colors.lightGray}]}>{editedProfile.email}</AppText>
        const password = (
            <TextField
                label={'Mot de passe'}
                style={{color: colors.mediumGray}}
                secureTextEntry={true}
                highlightColor={'#00BCD4'}
                onChangeText={() => {
                }}
            />
        )
        const passwordCheck = (
            <TextField
                label={'Confirmez le mot de passe'}
                style={{color: colors.mediumGray}}
                secureTextEntry={true}
                highlightColor={'#00BCD4'}
                onChangeText={() => {
                }}
            />
        )
        const birthdate = this.renderBirthDate()
        return (
            <View style={{flex: 1}}>
                {header}
                <View style={{flex: 15}}>
                    {avatar}
                    {firstName}
                    {lastName}
                    {email}
                    {birthdate}
                    {password}
                    {passwordCheck}
                </View>
            </View>
        )
    }

    renderAvatar() {
        return (
            <Avatar name={this.state.editedProfile.name}
                    lastName={this.state.editedProfile.lastName}/>
        )
    }

    renderHeader() {
        let {editing, newEvent} = this.state
        let {canEdit} = this.props
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
                {editing ?
                    newEvent ? backButton : cancelButton :
                    backButton
                }
                <AppText style={{flex: 5, color: 'white', fontSize: 20}}>
                    {editing ?
                        newEvent ? "Nouvel évènement" : "Modification" :
                        "Evènement"
                    }
                </AppText>
                <View style={{flex: 3, flexDirection: 'row'}}>
                    {canEdit && (
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Toggle
                                isOn={newEvent}
                                style={{flex: 5}}
                                onToggle={() => {
                                }}
                            >
                                <AppText style={{color: 'white', textAlign: 'right'}}>
                                    {editing ? 'Enregistrer' : 'Modifier'}
                                </AppText>
                            </Toggle>
                            <ItemSpacer/>
                        </View>
                    )}
                </View>
            </View>
        )
    }

    oldrender() {
        const {editedProfile} = this.state
        const firstName = (<EditableAppText
            fieldName={strings.firstName}
            style={styles.field}
            isInModificationMode={this.state.editing}
            content={editedProfile.firstName}
            mandatory={true}
            onValidate={(firstName) => {
                this.setState({editedProfile: {...editedProfile, firstName}});
            }}/>);
        const lastName = (<EditableAppText
            fieldName={strings.lastName}
            style={styles.field}
            isInModificationMode={this.state.editing}
            content={editedProfile.lastName}
            mandatory={true}
            onValidate={(lastName) => {
                this.setState({editedProfile: {...editedProfile, lastName}});
            }}/>)
        const newPassword = (<PasswordInput ref="password"
                                            style={styles.field}
                                            underlineColorAndroid={this.state.isNewPasswordValid ? 'lightgray' : 'red'}
                                            returnKeyType="next"
                                            onChangeText={this.onChangePasswordText}
                                            onSubmitEditing={() => {
                                                this.refs.passwordCheck.focus();
                                            }}/>)
        const passwordCheck = (<PasswordInput ref="passwordCheck"
                                              placeholder={strings.verifyPassword}
                                              style={styles.field}
                                              underlineColorAndroid={this.state.isPasswordCheckValid ? 'lightgray' : 'red'}
                                              returnKeyType="done"
                                              onChangeText={this.onChangePasswordCheckText}/>)
        const email = (
            <AppText style={[styles.field, {color: colors.lightGray, flex: 1}]}>{editedProfile.email}</AppText>)
        return (
            <View style={{flex: 1}}>
                {this.renderHeader()}
                <View style={styles.container}>
                    <View style={{flex: 30, flexDirection: 'column'}}>
                        <ScrollView style={{flex: 2}}
                                    contentContainerStyle={{flex: 1, alignItems: 'center', paddingHorizontal: 30}}>
                            <ItemSpacer/>
                            {this.renderUserPicture()}
                            <ItemSpacer/>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                {firstName}
                            </View>
                            <ItemSpacer/>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                {lastName}
                            </View>
                            <ItemSpacer/>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                {email}
                            </View>
                            <ItemSpacer/>
                            {this.renderBirthDate()}
                            <ItemSpacer/>
                            {this.renderCurrentPassword()}
                            <ItemSpacer/>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                {this.state.editing ? newPassword : null}
                            </View>
                            <ItemSpacer/>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                {this.state.editing ? passwordCheck : null}
                            </View>
                            <ItemSpacer/>
                            {this.renderNotifySuccess()}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }

    oldrenderHeader() {
        const backButton = (<BackButton navigator={this.props.navigator}/>)
        const cancelButton = (
            <BackButton
                navigator={this.props.navigator}
                source={require("./../images/crossWhite.png")}
                style={{padding: 8}}
                onPress={() => this.setState({editing: false, passwordVisible: false})}/>)
        const label = (<AppText style={styles.topBarText}>{strings.profileEditionLabel}</AppText>)
        const editButton = (<Button title={strings.edit} style={{flex: 1, margin: 1}}
                                    onPress={() => this.setState({editing: true})}/>)
        const saveButton = (<Button title={strings.save} style={{flex: 1, marginLeft: 5}}
                                    onPress={() => {
                                        this.save();
                                    }}/>)
        return (
            <View style={styles.topBar}>
                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'flex-start'}}>
                    {this.state.editing ? cancelButton : backButton}
                    {label}
                </View>
                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {this.state.editing ? saveButton : editButton}
                    </View>

                </View>
            </View>
        );
    }

    renderUserPicture() {
        const {editedProfile} = this.state
        const picture = this.state.editing ?
            (
                <EditableImage
                    defaultPicture={editedProfile.picture}
                    onSelected={(selected) => {
                        this.updateImage(selected)
                    }}
                    style={styles.organizatorPictureCircle}
                />
            ) :
            (
                <FlexImage
                    source={editedProfile.picture}
                    style={styles.organizatorPictureCircle}
                    resizeMode="stretch"
                />
            );
        return (
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center', height: 100}}>
                <ItemSpacer/>
                {picture}
                <ItemSpacer/>
            </View>
        );
    }

    renderBirthDate() {
        const birthDateValue = new Date(this.state.editedProfile.birthDate);
        const {editedProfile} = this.state
        const dateLabel = (<AppText>{strings.birthDate}</AppText>)
        const dateText = (<AppText>{this.props.birthDate}</AppText>)
        const datePicker = (<DatePicker
            date={birthDateValue}
            placeholder={strings.birthDate}
            mode="date"
            format="YYYY/MM/DD"
            confirmBtnText="OK"
            cancelBtnText="Annuler"
            onDateChange={(birthDate) => {
                this.setState({editedProfile: {...editedProfile, birthDate}});
                this.validate(birthDate);
            }}
            customStyles={{
                dateIcon: {position: 'absolute', left: 0, top: 4, marginLeft: 0},
                dateInput: {marginLeft: 36, borderWidth: 0}
            }}/>)
        const errorMessage = (
            <AppText style={{color: 'red'}}>
                {editedProfile.birthDate === undefined ? strings.field + ' ' + strings.mandatory : ''}
            </AppText>)

        return (
            <View style={{flex: 2, flexDirection: 'row'}}>
                {true || this.state.editing ? datePicker : dateLabel}
                {true || this.state.editing ? errorMessage : dateText}
            </View>
        )
    }

    renderCurrentPassword() {
        const passwordLabel = ( <AppText>{strings.password + ' : '}</AppText>)
        const passwordValue = this.state.passwordVisible ?
            this.state.editedProfile.password :
            '******'
        const passwordContent = (<AppText>{passwordValue}</AppText>)
        const showPasswordButton = (
            <TouchableOpacity style={{marginLeft: 10}} onPress={() => this.setState({passwordVisible: true})}>
                <Image source={require('./../images/eye.png')}/>
            </TouchableOpacity>
        )
        return this.state.canEdit ? (
            <View style={{flex: 2, flexDirection: 'row'}}>
                {passwordLabel}
                {passwordContent}
                {showPasswordButton}
            </View>
        ) :
            null;
    }

    renderNotifySuccess() {
        const notificationMessage = this.state.cannotSave ? strings.invalidForm : strings.modified;
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

    save = () => {
        const {editedProfile} = this.state
        const cannotSave = editedProfile.firstName === ''
            || editedProfile.lastName === ''
            || editedProfile.password === ''
            || editedProfile.birthDate === undefined
            || !this.state.isPasswordCheckValid;
        this.setState({cannotSave})
        if (this.state.isPasswordCheckValid) {
            this.props.updateUser(this.state.editedProfile)
        }
        this.setState({modalVisible: true});
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
    canEdit: true,
    picture: require('./../images/userAvatar.jpg'),
    firstName: 'Al',
    lastName: 'Inclusive',
    email: 'al.inclusive@mail.com',
    password: 'topsecret',
    birthDate: '1988/04/05',
}

const styles = StyleSheet.create({

    avatar: {
        height: deviceWidth / 4,
        width: deviceWidth / 4,
        borderRadius: deviceWidth / 8,
        fontSize: 40,
        backgroundColor:colors.lightGray,
        textAlign:'center',
        color:'white',
    },
    topBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.blue,
        alignItems: 'center',
        height: (1 / 16) * deviceHeight,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
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

    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(186, 242, 255, 1)'
    }
});