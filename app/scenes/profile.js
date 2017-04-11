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
import EditableImage from "../components/editableImage";
import AppText from "../components/appText";
import EditableAppText from "../components/editableAppText";
import strings from '../util/localizedStrings';
import colors from "../components/events/colors";
import DatePicker from "react-native-datepicker";

let {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');

export default class Profile extends Component {

    static defaultProps = {
        isModificationAllowed: true,
        isInModificationMode: false,
        picture: require('./../images/userAvatar.jpg'),
        firstname: 'Al',
        lastname: 'Inclusive',
        email: 'al.inclusive@mail.com',
        password: 'topsecret'
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
            isInvalid: false,
        };
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Header
                    isModificationAllowed={this.props.isModificationAllowed}
                    edit={()=> {this.setState({isInModificationMode: true})}}
                    save={this.save}
                    delete={this.delete}/>
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


                                {/*{this.renderNotifySuccess()}*/}
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
                    this.validate();}}
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
            </View>
        );
    }

    validate(){
        //let isEventInvalid = this.state.title === '' || this.state.location === '' || this.state.date === '';
        //this.setState({isEventInvalid});
    }

    save = async() => {
        if(this.props.isInCreationMode){
            let [date, time] = this.state.date.split(' ');
            let formattedDate = this.getDateTime(date, time);
            await this.props.db.addEvent({
                category: this.state.categoryId,
                name: this.state.title,
                datetime: formattedDate,
                location: this.state.location,
                description: this.state.description,
                keyWords: this.props.keyWords,
            });
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
});