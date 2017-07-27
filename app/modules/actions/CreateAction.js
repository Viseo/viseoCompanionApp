import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg from 'react-native-svg/elements/Svg';
import {Image} from 'react-native-svg';
import colors from '../global/colors';
import AppText from '../global/components/AppText';
import Action from './Action';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import AppTextInput from '../global/components/AppTextInput';
import Text from 'react-native-svg/elements/Text';
import  DropDown,{Select, Option, OptionList} from 'react-native-selectme';

export default class CreateAction extends Component {

    dateFormat = 'DD/MM/YYYY [à] HH:mm';

    state = {
        description: this.props.description,
        location: this.props.location,
        locationError: 'field not filled',
        formattedDate: moment(this.props.datetime).format(this.dateFormat),
    };

    constructor(props) {
        super(props);
        this.state = {
            practices: ''
        };
    }
    _getOptionList() {
        return this.refs['OPTIONLIST'];
    }

    render() {
        const descriptionField = this._renderDescriptionField();
        const datePicker = this._renderDatePicker();
        const locationField = this._renderLocationField();
        return (
            <View>
                {datePicker}
                {this._renderHeadband()}
                {this._renderCreateAction()}
                {descriptionField}
                {this._renderAction()}
                {locationField}
                {this. _renderPractice()}
            </View>

        );
    }

    _select(practice) {

        this.setState({
            ...this.state,
            practices: practice.id
        });
    }
   _renderPractice(){
       return (
           <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:100}} >
               <Text>Practice/recencée BT:</Text>
               <Select
                   width={400}
                   height={50}
                   ref="SELECT1"
                   optionListRef={this._getOptionList.bind(this)}
                   defaultValue="Practice/recencée BT ..."
                   onSelect={(practice) => this._select(practice)}
               >
                   <Option value = {{id : "Oui"}}>Oui</Option>
                   <Option>Non</Option>
               </Select>
               <OptionList ref="OPTIONLIST"
                           overlayStyles={{
                               marginTop:15,marginLeft:5,backgroundColor:"#fff",width:400,height:120,
                               padding:0
                           }}
               />
           </View>
       );
   }
    _renderDescriptionField() {
        return (
            <AppTextInput
                ref="description"
                label="Description"
                value={this.state.description}
                onChangeText={description => this.props.setDescription(description)}
                onSubmitEditing={ () => {
                    this.refs.location.focus();
                }}
            />
        );
    }
    _getLocationError(location) {
        if (location.length < 2) {
            return 'Le lieu doit contenir au moins deux caractères.';
        } else {
            const regexLocation = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s\-']*$/;
            if (!regexLocation.test(location)) {
                return 'Le lieu doit seulement contenir des caractères alphanumériques, tiret ou apostrophe.';
            }
        }
        return null;
    }

    _renderLocationField() {
        return (
            <AppTextInput
                ref="location"
                label="Lieu"
                validator={(location) => !this._getLocationError(location)}
                invalidTextMessage={this.state.locationError}
                value={this.state.location}
                onChangeText={location => {
                    const locationError = this._getLocationError(location);
                    this.setState({
                        location,
                        locationError,
                    });
                 //   this.props.setLocation(locationError ? null : location);
                }}
            />
        );
    }

    _renderDatePicker() {
        const currentDate = moment().toDate();
        const selectedDate = this.state.formattedDate.length > 0 ?
            this.state.formattedDate :
            currentDate;
        return (
            <View style={styles.dateContainer}>
                <AppText style={styles.dateLabel}>Date : </AppText>
                <DatePicker
                    style={styles.datePicker}
                    date={selectedDate}
                    mode="datetime"
                    format={this.dateFormat}
                    minDate={currentDate}
                    placeholder='Sélectionnez une date..'
                    confirmBtnText="OK"
                    cancelBtnText="Annuler"
                    onDateChange={formattedDate => {
                        this.setState({formattedDate});
                        const datetime = moment(formattedDate, this.dateFormat).valueOf();
                        //this.props.setDate(datetime);
                    }}
                />
            </View>
        );
    }


    _renderAction() {
        return (
                <Action/>
        )
    }

    _renderHeadband() {
        return (
            <Svg width="550" height="150">
                <Image width="550" height="150" href={require('../../images/NIVEAUX_BANDEAU_1.jpg')}/>
            </Svg>
        );
    }

    _renderCreateAction() {
        return (
            <View style={styles.createAction}>
                <AppText style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    height: 40,
                    color: colors.orange,
                    marginLeft: 25,
                    marginTop: 10,
                    marginBottom: 10,
                }}>
                    Créer une action
                </AppText>
                <View style={{backgroundColor: colors.orange, height: 5}}/>

            </View>
        );
    }
}



const styles = StyleSheet.create({
    createAction: {
        backgroundColor: colors.white,
        alignContent: 'center',
        marginTop: -30,
        marginRight: 20,
        marginLeft: 20,
        marginBottom:50
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { marginLeft: 5 },
    row: { height: 30 },

});