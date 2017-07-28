import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import Svg from "react-native-svg/elements/Svg";
import {Image} from "react-native-svg";
import Icon from "react-native-vector-icons/FontAwesome";
import * as db from "../global/db";
import colors from '../global/colors';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import AppTextInput from '../global/components/AppTextInput';
import GridRow from "./GridRow";
import Action from "./Action";
import  {Select, Option, OptionList} from 'react-native-selectme';
import AppText from '../global/components/AppText';

export default class CreateAction extends Component {

    dateFormat = 'DD/MM/YYYY [à] HH:mm';

    constructor(props) {
        super(props);
        this.state = {
            meanOptions: [],
            showTable: false,
            means: [],
            description: this.props.description,
            location: this.props.location,
            locationError: 'field not filled',
            formattedDateEnd: moment(new Date()).format(this.dateFormat),
            formattedDateStart: moment(new Date()).format(this.dateFormat),
        };
    }

    componentWillMount() {
        this._getMeans();
    }

    render() {
        const descriptionField = this._renderDescriptionField();
        const datePickerStart = this._renderDateStartPicker();
        const locationField = this._renderLocationField();
        const datePickerEnd = this._renderDateEndPicker();
        return (
            <View>
                {this._renderHeadband()}
                {this._renderCreateAction()}
                {/*{datePickerStart}*/}
                {/*{datePickerEnd}*/}
                {/*{descriptionField} */}
                {/*{locationField}*/}
                {/*{this._renderPractice()}*/}
                {/*{this._renderRecurrence()}*/}
                {/* {this._renderReadingTime()}*/}
                {/*{this._renderTypePublication()}*/}
                <View style={{flexDirection: "column"}}>
                    {this._renderAction()}
                    {this._renderMeanButton()}
                    { this.state.showTable ?
                        this._renderMeans()
                        : null
                    }
            </View>
            </View>

        );
    }
    _getOptionListPractice() {
        return this.refs['OPTIONLISTPractice'];
    }

    _selectPractice(practice) {

        this.setState({
            ...this.state,
            practices: practice.id,
        });
    }

    _renderPractice() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
                <Text>Practice/recencée BT:{this.state.practices}</Text>
                <Select
                    style={{backgroundColor: "#00BFB3"}}
                    width={350}
                    height={50}
                    ref="SELECT1"
                    optionListRef={this._getOptionListPractice.bind(this)}
                    defaultValue="Practice/recencée BT ..."
                    onSelect={(practice) => this._selectPractice(practice)}
                >
                    <Option value={{id: 'Oui'}}>Oui</Option>
                    <Option>Non</Option>
                </Select>
                <OptionList ref="OPTIONLISTPractice"
                            overlayStyles={{
                                marginTop: 15, marginLeft: 5, backgroundColor: '#fff', width: 400, height: 120,
                                padding: 0,
                            }}
                />
            </View>
        );
    }

    _getOptionListPublication() {
        return this.refs['OPTIONLISTPublication'];
    }


    _selectTypePublication(publication) {

        this.setState({
            ...this.state,
            type: publication.id,
        });
    }

    _renderTypePublication() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
                <Text>Type de Publication:</Text>
                <Select
                    style={{backgroundColor: "#00BFB3"}}
                    width={350}
                    height={50}
                    ref="SELECT1"
                    optionListRef={this._getOptionListPublication.bind(this)}
                    defaultValue="Type de Publication ..."
                    onSelect={(publication) => this._selectTypePublication(publication)}
                >
                    <Option value={{id: 'Blog'}}>Blog</Option>
                    <Option>Press écrite</Option>
                    <Option>Internet</Option>
                </Select>
                <OptionList ref="OPTIONLISTPublication"
                            overlayStyles={{
                                marginTop: 15, marginLeft: 5, backgroundColor: '#fff', width: 400, height: 120,
                                padding: 0,
                            }}
                />
            </View>
        );
    }
    _getOptionListReadingTime() {
        return this.refs['OPTIONLISTTenses'];
    }
    _selectReadingTime(time) {

        this.setState({
            ...this.state,
            lecture: time.id,
        });
    }

    _renderReadingTime() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
                <Text>temps de Lecture:</Text>
                <Select
                    style={{backgroundColor: "#00BFB3"}}
                    width={350}
                    height={50}
                    ref="SELECT1"
                    optionListRef={this._getOptionListReadingTime.bind(this)}
                    defaultValue="Temps de Lecture ..."
                    onSelect={(time) => this. _selectReadingTime(time)}
                >
                    <Option value={{id: '5mn'}}>5mn</Option>
                    <Option>5mn à 10mn</Option>
                    <Option>plus que 10mn</Option>
                </Select>
                <OptionList ref="OPTIONLISTTenses"
                            overlayStyles={{
                                marginTop: 15, marginLeft: 5, backgroundColor: '#fff', width: 400, height: 120,
                                padding: 0,
                            }}
                />
            </View>
        );
    }

    _getOptionListRecurrence() {
        return this.refs['OPTIONLIST'];
    }

    _selectRecurrence(repeated) {

        this.setState({
            ...this.state,
            nbr: repeated.id,
        });
    }

    _renderRecurrence() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
                <Text>Recurence: {this.state.nbr}</Text>
                <Select
                    style={{backgroundColor: "#00BFB3"}}
                    width={350}
                    height={50}
                    ref="SELECT1"
                    optionListRef={this._getOptionListRecurrence.bind(this)}
                    defaultValue="Réccurence ..."
                    onSelect={(repeated) => this._selectRecurrence(repeated)}
                >
                    <Option value={{id: 'Reccurence hebdo'}}>Reccurence hebdo</Option>
                    <Option>une fois</Option>
                </Select>
                <OptionList ref="OPTIONLIST"
                            overlayStyles={{
                                marginTop: 15, marginLeft: 5, backgroundColor: '#fff', width: 400, height: 120,
                                padding: 0,
                            }}
                />
            </View>
        );
    }


    _renderDescriptionField() {
        return (
            <AppTextInput
                style={{backgroundColor: "#00BFB3"}}
                width={350}
                height={50}
                ref="description"
                label="Description"
                value={this.state.description}
               // onChangeText={description => this.props.setDescription(description)}
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
                style={{backgroundColor: "#00BFB3"}}
                width={350}
                height={50}
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

    _renderDateStartPicker() {
        const currentDate = moment().toDate();
        return (
            <View style={styles.dateContainer}>
                <AppText style={styles.dateLabel}>Date Debut: </AppText>
                <DatePicker
                    style={{flex: 4, alignItems: 'stretch', backgroundColor: "#00BFB3"}}
                    date={currentDate}
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

    _renderDateEndPicker() {
        const currentDate = moment().toDate();

        return (
            <View style={styles.dateContainer}>
                <AppText style={{alignItems: 'center'}}>Date fin : </AppText>
                <DatePicker
                    style={{flex: 4, alignItems: 'stretch'}}
                    date={currentDate}
                    mode="datetime"
                    format={this.dateFormat}
                    minDate={currentDate}
                    placeholder='Sélectionnez une date..'
                    confirmBtnText="OK"
                    cancelBtnText="Annuler"
                    onDateChange={formattedDates => {
                        this.setState({formattedDates});
                        const datetime = moment(formattedDates, this.dateFormat).valueOf();
                        //this.props.setDate(datetime);
                    }}
                />
                {this._renderHeadband()}
                {this._renderCreateAction()}
                <View style={{flexDirection: "column"}}>
                    {this._renderAction()}
                    {this._renderMeanButton()}
                    { this.state.showTable ?
                        this._renderMeans()
                        : null
                    }
                </View>
            </View>
        );
    }

    _renderAction() {

            <View style={{justifyContent: "space-between",}}>
                <AppText style={{padding: 30}}>Action</AppText>
                <Action/>
            </View>

    }

    _renderMeanButton() {
        const show = this.state.showTable;
        return (
            <View style={{flexDirection: "row", marginTop: 50, marginLeft: 30}}>
                <Icon.Button name="angle-down" backgroundColor="#00BFB3"
                             style={{width: 350, height: 50, borderRadius: 0}}
                             onPress={() => {
                                 this.setState({
                                     showTable: !show,
                                 });
                             }}
                >
                    <Text style={{fontSize: 15, color: "#fff"}}>Acheter un moyen</Text>
                </Icon.Button>
            </View>
        );
    }

    _renderMeans() {

        return (
            <View style={{
                flexDirection: "column",
                backgroundColor: "rgb(221, 239, 239)",
                width: 350,
                marginLeft: 30,
                marginRight: 20,
            }}>
                <View style={{flexDirection: "row", justifyContent: "space-between", height: 50, width: 200}}>
                    <AppText style={{paddingRight: 30, paddingLeft: 30}}>Moyen</AppText>
                    <AppText style={{paddingRight: 50, paddingLeft: 50}}>Prix</AppText>
                    <AppText style={{paddingRight: 10, paddingLeft: 10}}>Quantité</AppText>
                </View>
                {
                    this.state.meanOptions.map((mean, i) =>
                    <GridRow mean={mean} key={i}></GridRow>
                    )
                }
            </View>
        );
    }

    _isNonEmpty(text) {
        return text.length > 0;
    }

    _getMeans = async () => {
        this.setState({
            meanOptions: await db.actions.getMeans(),
        });

    };

    _renderHeadband() {
        return (
            <Svg width="550" height="150">
                <Image width="550" height="150" href={require("../../images/NIVEAUX_BANDEAU_1.jpg")}/>
            </Svg>
        );
    }

    _renderCreateAction() {
        return (
            <View style={styles.createAction}>
                <AppText style={{
                    fontWeight: "bold",
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
};

const spaceBetweenFields = 10;
const styles = StyleSheet.create({
    createAction: {
        backgroundColor: colors.white,
        alignContent: "center",
        marginTop: -30,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 50,

    },
    /*head: {height: 40, backgroundColor: '#f1f8ff'},
    text: {marginLeft: 5},
    row: {height: 30},*/

    dateContainer: {
        flexDirection: 'row',
        marginBottom: spaceBetweenFields,
    },
     dateLabel: {
        flexDirection: 'column',
        flex: 1,
        fontWeight: 'bold',
    },
   datePicker: {
        justifyContent: 'flex-start',
    },

    componentContainer: {
        flex: 1,
        flexDirection: "column",
    },
    head: {height: 40},
    title: {flex: 1},
    row: {height: 30},
    text: {textAlign: "center", color: "dimgrey"},
});