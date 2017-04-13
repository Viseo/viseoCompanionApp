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
import Header from "../components/header";
import PasswordInput from "../components/passwordInput";
import EditableImage from "../components/editableImage";
import AppText from "../components/appText";
import EditableAppText from "../components/editableAppText";
import strings from '../util/localizedStrings';
import colors from "../components/colors";
import DatePicker from "react-native-datepicker";
import * as util from '../util/util';

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
            isModificationAllowed : this.props.isModificationAllowed,
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
                <Header
                    isModificationAllowed={this.props.isModificationAllowed}
                    edit={()=> {this.setState({isInModificationMode: true})}}
                    save={this.save}
                    delete={this.delete}
                    cannotSave={this.state.cannotSave}/>
                <View style={styles.container}>
                    <View style={{flex:1}}>
                        <View style={{flex:7,flexDirection:'column', alignItems: 'center'}}>
                            <ScrollView style={{flex:1}}>
                                {this.renderUserPicture()}
                                <View style={{padding:10}}>
                                    <EditableAppText
                                        fieldName={strings.firstname}
                                        style={styles.field}
                                        isInModificationMode={this.state.isInModificationMode}
                                        content={this.state.firstname}
                                        mandatory={true}
                                        onValidate={(value) => {
                                            this.setState({firstname: value});
                                            this.validate();
                                    }}/>
                                </View>
                                <View style={{padding:10}}>
                                    <EditableAppText
                                        fieldName={strings.lastname}
                                        style={styles.field}
                                        isInModificationMode={this.state.isInModificationMode}
                                        content={this.state.lastname}
                                        mandatory={true}
                                        onValidate={(value) => {
                                            this.setState({lastname: value});
                                            this.validate();
                                    }}/>
                                </View>
                                <View style={{padding:10}}>
                                    <AppText style={[styles.field, {color:colors.lightGray}]}>{this.state.email}</AppText>
                                </View>
                                <View style={{padding:10, flexDirection: 'row', justifyContent:'space-between', alignItems: 'flex-start'}}>
                                    {this.renderBirthdate()}
                                </View>
                                <View style={{padding:10, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                                    <AppText>{strings.password + ' : '}</AppText>
                                    <AppText>{this.state.passwordPlaceholder}</AppText>
                                    <TouchableOpacity onPress={() => this.setState({passwordPlaceholder:this.state.password})}>
                                        <Image source={require('./../images/eye.png')}/>
                                    </TouchableOpacity>
                                </View>
                                {this.renderPasswordModificationInputs()}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderUserPicture() {
        if(this.state.isInModificationMode){
            return(
                <View style={styles.organizatorPicture}>
                    <EditableImage
                        defaultPicture={this.state.picture}
                        onSelected={(selected) => {this.updateImage(selected)}}/>
                </View>
            );
        }
        else{
            return (
                <View style={styles.organizatorPicture}>
                    <TouchableOpacity>
                        <Image source={require('./../images/userAvatar.jpg')} style={styles.organizatorPictureCircle}/>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    renderBirthdate(){
        if(this.state.isInModificationMode){
            let birthdate = new Date(this.state.birthdate);
            return(
                <View style={{alignItems:'center'}}>
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
                    <AppText style={{color:'red'}}>{this.state.birthdate === undefined ? strings.field + ' ' + strings.mandatory: ''}</AppText>
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

    renderPasswordModificationInputs(){
        if(this.state.isInModificationMode){
            return(
              <View style={{flexDirection: 'column'}}>
                  <PasswordInput ref="password"
                     underlineColorAndroid={this.state.isNewPasswordValid ? 'lightgray' : 'red'}
                     returnKeyType="next"
                     onChangeText={this.onChangePasswordText}
                     onSubmitEditing={() => {
                        this.refs.passwordCheck.focus();}}/>
                  <PasswordInput ref="passwordCheck"
                     placeholder={strings.verifyPassword}
                     underlineColorAndroid={this.state.isPasswordCheckValid ? 'lightgray' : 'red'}
                     returnKeyType="done"
                     onChangeText={this.onChangePasswordCheckText}
                     onSubmitEditing={this.validate}/>
              </View>
            );
        }
        else{
            return;
        }
    }

    validate(){
        let cannotSave = !this.state.isNewPasswordValid || !this.state.isPasswordCheckValid
            || this.state.firstname === '' || this.state.lastname === '';
        this.setState({cannotSave});
    }

    save = async() => {
        if(this.props.isInCreationMode){
            let [date, time] = this.state.date.split(' ');
            //AddUser
            this.setState({notificationMessage: strings.created});
            this.setState({modalVisible: true});
        }
        else{
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

    updateImage(selected){
        let imageSource = { uri: selected };
        this.setState({picture:imageSource});
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
        marginTop:(Platform.OS === 'ios') ? 20 : 0,
    },

    topBarText: {
        paddingHorizontal:10,
        fontSize: 20,
        color: 'white',
    },

    container: {
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: 'white',
        flex: 1
    },

    organizatorPicture:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        padding:20,
        alignItems:'center',
    },

    organizatorPictureCircle: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },

    field: {
        fontSize: 16,
        textAlign: 'center',
        justifyContent:'center',
    },

    error: {
        color:'red'
    },
});