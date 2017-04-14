/**
 * Created by VBO3596 on 10/04/2017.
 */
import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    Button,
    Platform,
    TouchableOpacity
} from 'react-native';
import PasswordInput from "../components/passwordInput";
import EditableImage from "../components/editableImage";
import AppText from "../components/appText";
import EditableAppText from "../components/editableAppText";
import strings from '../util/localizedStrings';
import colors from "../components/colors";
import DatePicker from "react-native-datepicker";
import * as util from '../util/util';
import FlexImage from './../components/FlexImage'
import ItemSpacer from './../components/ItemSpacer'


let {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');

export default class Profile extends Component {

    static defaultProps = {
        isModificationAllowed: true,
        isInModificationMode: false,
        picture: require('./../images/userAvatar.jpg'),
        firstname: 'Al',
        lastname: 'Inclusive',
        email: 'al.inclusive@mail.com',
        password: 'topsecret',
        birthdate: '1988/04/05',
        passwordPlaceholder: '******'
    }

    constructor(props) {
        super(props);
        let defaultImage = require('./../images/userAvatar.jpg');
        this.state = {
            isModificationAllowed: this.props.isModificationAllowed,
            isInModificationMode: this.props.isInModificationMode,
            modalVisible: false,
            notificationMessage: '',
            picture: defaultImage,
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            email: this.props.email,
            password: this.props.password,
            birthdate: this.props.birthdate,
            cannotSave: false,
            newPassword: '',
            isNewPasswordValid: true,
            passwordCheck: '',
            isPasswordCheckValid: true,
            passwordPlaceholder: this.props.passwordPlaceholder
        };
        this.onChangePasswordText = this.onChangePasswordText.bind(this);
        this.onChangePasswordCheckText = this.onChangePasswordCheckText.bind(this);
        this.validate = this.validate.bind(this);
    }

    render() {
        return (
            <View style={{flex:1}}>
                {this.renderHeader()}
                <View style={{flex:15, flexDirection: 'column'}}>
                    <ScrollView style={{flex:15}}
                                contentContainerStyle={{flex:1, flexDirection:'column', justifyContent:'flex-start', alignItems: 'center'}}
                    >
                        <ItemSpacer/>
                        {this.renderUserPicture()}
                        <ItemSpacer/>
                        <EditableAppText
                            fieldName={strings.firstname}
                            style={styles.field}
                            isInModificationMode={this.state.isInModificationMode}
                            content={this.state.firstname}
                            mandatory={true}
                            onValidate={(value) => {
                                        this.setState({firstname: value});
                                        this.validate();
                                }}
                        />
                        <ItemSpacer/>
                        <EditableAppText
                            fieldName={strings.lastname}
                            style={styles.field}
                            isInModificationMode={this.state.isInModificationMode}
                            content={this.state.lastname}
                            mandatory={true}
                            onValidate={(value) => {
                                        this.setState({lastname: value});
                                        this.validate();
                                }}
                        />
                        <ItemSpacer/>
                        <AppText style={[styles.field, {color:colors.lightGray, flex:1}]}>{this.state.email}</AppText>
                        <ItemSpacer/>
                        {this.renderBirthdate()}
                        <ItemSpacer/>
                        {this.renderCurrentPassword()}
                        <ItemSpacer/>
                        {this.renderPasswordModificationInputs()}
                        <ItemSpacer style={{flex:5}}/>
                    </ScrollView>
                </View>
            </View>
        );
    }

    renderHeader() {
        return (
            <View style={{flex:1, flexDirection:'row', backgroundColor:colors.blue, alignItems:'center'}}>
                <View style={{flex:3, flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <AppText style={styles.topBarText}>{strings.profileEditionLabel}</AppText>
                </View>
                <View style={{flex:2, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {this.state.isInModificationMode ? this.renderSaveButton() : this.renderEditButton()}
                        <Button title={strings.delete} style={{flex:1, marginLeft:5}} onPress={() => {this.delete()}}/>
                    </View>

                </View>
            </View>
        );
    }

    renderSaveButton() {
        return (
            <Button disabled={this.state.cannotSave} title={strings.save} style={{flex:1, marginLeft:5}}
                    onPress={() => {this.save();}}/>
        );
    }

    renderEditButton() {
        return (
            <Button title={strings.edit} style={{flex:1, margin:1}}
                    onPress={() => this.setState({isInModificationMode: true})}/>
        );
    }

    renderUserPicture() {
        const picture = this.state.isInModificationMode ?
            (
                <EditableImage
                    defaultPicture={this.state.picture}
                    onSelected={(selected) => {this.updateImage(selected)}}
                    style={styles.organizatorPictureCircle}
                />
            ) :
            (
                <FlexImage
                    source={this.state.picture}
                    style={styles.organizatorPictureCircle}
                    resizeMode="stretch"
                />
            );
        return (
            <View style={{flex:0, flexDirection: 'row', justifyContent: 'center', height:100}}>
                <ItemSpacer/>
                {picture}
                <ItemSpacer/>
            </View>
        );
    }

    renderBirthdate() {
        if (this.state.isInModificationMode) {
            let birthdate = new Date(this.state.birthdate);
            return (
                <View style={{flexDirection: 'row'}}>
                    <DatePicker
                        date={birthdate}
                        placeholder={strings.birthdate}
                        mode="date"
                        format="YYYY/MM/DD"
                        confirmBtnText="OK"
                        cancelBtnText="Annuler"
                        onDateChange={(datetime) => {
                            this.setState({birthdate: datetime});
                            this.validate(datetime);}}
                        customStyles={{
                                dateIcon: {
                                  position: 'absolute',
                                  left: 0,
                                  top: 4,
                                  marginLeft: 0
                                },
                                dateInput: {
                                  marginLeft: 36,
                                  borderWidth:0
                                }
                              }}
                    />
                    <AppText
                        style={{color:'red'}}>{this.state.birthdate === undefined ? strings.field + ' ' + strings.mandatory : ''}</AppText>
                </View>);
        }
        else {
            return (
                <View style={{flexDirection: 'row'}}>
                    <AppText>{strings.birthdate}</AppText>
                    <AppText>{this.props.birthdate}</AppText>
                </View>
            );
        }
    }

    renderCurrentPassword() {
        if (this.state.isModificationAllowed) {
            return (
                <View style={{flex:1, flexDirection: 'row'}}>
                    <AppText>{strings.password + ' : '}</AppText>
                    <AppText>{this.state.passwordPlaceholder}</AppText>
                    <TouchableOpacity onPress={() => this.setState({passwordPlaceholder:this.state.password})}>
                        <Image source={require('./../images/eye.png')}/>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return;
        }
    }

    renderPasswordModificationInputs() {
        if (this.state.isInModificationMode) {
            return (
                <View style={{ flex:1}}>
                    <PasswordInput ref="password"
                                   underlineColorAndroid={this.state.isNewPasswordValid ? 'lightgray' : 'red'}
                                   style={styles.field}
                                   returnKeyType="next"
                                   onChangeText={this.onChangePasswordText}
                                   onSubmitEditing={() => {
                        this.refs.passwordCheck.focus();}}/>
                    <PasswordInput ref="passwordCheck"
                                   placeholder={strings.verifyPassword}
                                   style={styles.field}
                                   underlineColorAndroid={this.state.isPasswordCheckValid ? 'lightgray' : 'red'}
                                   returnKeyType="done"
                                   onChangeText={this.onChangePasswordCheckText}
                                   onSubmitEditing={this.validate}/>
                </View>
            );
        }
        else {
            return;
        }
    }

    validate() {
        let cannotSave = !this.state.isNewPasswordValid || !this.state.isPasswordCheckValid
            || this.state.firstname === '' || this.state.lastname === '';
        this.setState({cannotSave});
    }

    save = async() => {
        if (this.props.isInCreationMode) {
            let [date, time] = this.state.date.split(' ');
            //AddUser
            this.setState({notificationMessage: strings.created});
            this.setState({modalVisible: true});
        }
        else {
            // Update
            this.setState({notificationMessage: strings.modified});
            this.setState({modalVisible: true});
        }
    }

    delete = async() => {
        // Delete
        this.setState({notificationMessage: strings.deleted});
        this.setState({modalVisible: true});
    }

    updateImage(selected) {
        let imageSource = {uri: selected};
        this.setState({picture: imageSource});
    }

    onChangePasswordText(text) {
        this.setState({
            newPassword: text,
            isNewPasswordValid: util.isPasswordValid(text) || !text.length,
        });
    }

    onChangePasswordCheckText(text) {
        let isPasswordCheckValid = this.state.newPassword === text || !text.length;
        this.setState({
            passwordCheck: text,
            isPasswordCheckValid: isPasswordCheckValid,
        });
    }
}

const styles = StyleSheet.create({

    topbar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: (1 / 16) * deviceHeight,
        backgroundColor: colors.blue,
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
        // alignItems: 'stretch',
        backgroundColor: 'white'
    },

    organizatorPicture: {
        flex: 1,
        // flexDirection: 'column',
        justifyContent: 'center',
        // padding: 20,
        // alignItems: 'center',
    },

    organizatorPictureCircle: {
        height: 100,
        width: 100,
        borderRadius: 75,
    },

    field: {
        flex:1,
        justifyContent: 'center',
        fontSize: 16,
        color: colors.mediumGray,
        textAlign: 'center',
    },

    error: {
        color: 'red'
    },
});