import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Dimensions, ScrollView, StyleSheet, View} from "react-native";
import Svg from "react-native-svg/elements/Svg";
import {Circle, G, Image, Text} from "react-native-svg";
import Icon from "react-native-vector-icons/FontAwesome";
import * as db from "../global/db";
import colors from "../global/colors";
import moment from "moment";
import AppTextInput from "../global/components/AppTextInput";
import GridRow from "./GridRow";
import Action from "./Action";
import {Option, OptionList, Select} from "react-native-selectme";
import AppText from "../global/components/AppText";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Holidays from "date-holidays";
import {defaultNavBarStyle} from "../global/navigatorStyle";
//import {Card, CardTitle, CardContent, CardAction} from "react-native-material-cards";
import PropTypes from "prop-types";
import DatePicker from "react-native-datepicker";

class CreateAction extends Component {

    dateFormat = "DD-MM-YYYY HH:mm";
    deviceHeight = Dimensions.get("window").height;

    constructor(props) {
        super(props);
        this.state = {

            quantity: 0,
            maxGain: 0,
            vizzsPerMean: 0,
            meanOptions: [],
            showTable: false,
            means: [],
            description: "",
            location: "",
            formattedDateEnd: "",
            typePublication: "blog",
            formattedDateStart: moment(new Date()).format(this.dateFormat),
            formattedDateEnd: moment(new Date()).format(this.dateFormat),
            practice: true,
            readTime: "5 mn",
            recurrence: "Récurrence hebdo",
            action: "",
            isValidDescription: false,
            isValidLocation: true,
            isValidDates: true,
            errorStartDate: "",
            errorEndDate: "",
            borderValidateDate: colors.lightGray,
            borderDescription: colors.lightGray,
            borderLocation: colors.lightGray,
            locationPermission: "undetermined",
            showFields: 0,
            meansByAction: [],
        };
    }

    componentWillMount() {
        this._getMeans();
        //  console.disableYellowBox = true;
    }

    _emptyFields() {
        this.setState({
            showFields: 0,
            description: "",
            location: "",
        });
    }

    render() {

        return (
            <View  >

                {this._renderHeadband()}
                {this._renderCreateAction()}
                {/*{this._renderVizzCard()}*/}
                <View style={{flexDirection: "column"}}>
                    <ScrollView style={{height: 300}}>

                        {this._renderAction()}
                        {this._renderMeanButton()}
                        { this.state.showTable ?
                            this._renderMeans()
                            : null
                        }
                        {/*{this._renderVizzCard()}*/}
                        {this._renderByAction()}

                    </ScrollView>
                </View>

            </View>

        );
    }

    _getActions = async () => {
        this.setState({
            ActionOptions: await db.actions.getAll(),
        });

    };

    renderMaxGain() {
        this._getActions();
        return (
            <View style={styles.textFieldContainer}>
                <AppText style={styles.label}>MaxGain</AppText>
                <AppText style={styles.displayText}>{this.state.action.maxGain}</AppText>
            </View>
        );
    }

    _renderAverage() {
        let result;
        result = this.state.means.vizzsPerMean * this.state.means.quantity;
        console.log("it work");
        return result;
    }

    // _renderVizzCard() {
    //     return (
    //         <Card style={styles.card}>
    //             <CardTitle title="Gain" subtitle="Vizz">
    //                 <AppText>{this.state.action.maxGain}</AppText>
    //                 <Image
    //                     source={require("../../images/events/vizz_logo.png")}
    //                     style={{width: 45, height: 45}}
    //                 />
    //             </CardTitle>
    //             <CardContent text="Dépenses Immédiates:">
    //                 {this._renderAverage()}
    //                 <Image
    //                     source={require("../../images/events/vizz_logo.png")}
    //                     style={{width: 45, height: 45}}
    //                 />
    //
    //             </CardContent>
    //             <CardAction seperator={true} inColumn={false}>
    //             </CardAction>
    //         </Card>
    //     );
    // }

    _renderByAction() {
        const descriptionField = this._renderDescriptionField();
        const datePickerStart = this._renderDateStartPicker();
        const locationField = this._renderLocationField();
        const datePickerEnd = this._renderDateEndPicker();
        switch (this.state.showFields) {

            case 1:
                return (
                    <View>
                        {this._renderPractice()}
                        {locationField}
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;
            case 2:
                return (
                    <View>
                        {datePickerStart}
                        {datePickerEnd}
                        {locationField}
                        {this._renderPractice()}
                        {this._renderRecurrence()}
                        {this._renderReadingTime()}
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;
            case 3:
                return (
                    <View>
                        {datePickerStart}
                        {datePickerEnd}
                        {locationField}
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;
            case 4:
                return (
                    <View>
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;
            case 5:
                return (
                    <View>

                        {locationField}
                        {this._renderPractice()}
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;
            case 6:
                return (
                    <View>
                        {/*datePickerStart*/}
                        {/*datePickerEnd*/}
                        {locationField}
                        {this._renderPractice()}
                        {this._renderRecurrence()}
                        {this._renderReadingTime()}
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;
            case 7:
                return (
                    <View>
                        {datePickerStart}
                        {datePickerEnd}
                        {locationField}
                        {this._renderPractice()}
                        {this._renderRecurrence()}
                        {this._renderReadingTime()}
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;
            case 8:
                return (
                    <View>
                        {this._renderReadingTime()}
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;
            case 9:
                return (
                    <View>
                        {locationField}
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;
            case 10:
                return (
                    <View>
                        {datePickerStart}
                        {datePickerEnd}
                        {locationField}
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;
            case 11:
                return (
                    <View>
                        {/*datePickerStart*/}
                        {/*datePickerEnd*/}
                        {locationField}
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;
            case 12:
                return (
                    <View>
                        {datePickerStart}
                        {datePickerEnd}
                        {locationField}
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;
            case 13:
                return (
                    <View>
                        {/*datePickerStart*/}
                        {/*datePickerEnd*/}
                        {locationField}
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;
            case 14:
                return (
                    <View>
                        {datePickerStart}
                        {datePickerEnd}
                        {locationField}
                        {descriptionField}
                        {this._renderValidate()}
                    </View>
                );

                break;

        }

    };

    _getOptionListPractice() {
        return this.refs["OPTIONLISTPractice"];
    }

    _validateFieldsAndSubmit() {

        const actionSplitted = this.state.action.split("|");
        let activity = {};
        switch (parseInt(actionSplitted[0])) {
            case 1:
                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: 0,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: 0,
                    dateCreation: 0,
                    address: this.state.location,
                    vizzWon: 0,
                    practice: this.state.practice,
                    readingTime: "",
                    recurrence: "",
                    publicationType: "",
                };
                if (this.state.isValidLocation && this.isValidDescription)
                    this._addActivity(activity);

                break;
            case 2:
                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: 0,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: 0,
                    dateCreation: 0,
                    address: this.state.location,
                    vizzWon: 0,
                    practice: this.state.practice,
                    readingTime: this.state.readTime,
                    recurrence: this.state.recurrence,
                    publicationType: "",
                };
                if (this.state.isValidLocation && this.state.isValidDates && this.state.isValidDescription)
                    this._addActivity(activity);
                break;
            case 3:
                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: 0,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: 0,
                    dateCreation: 0,
                    address: "",
                    vizzWon: 0,
                    practice: "",
                    readingTime: "",
                    recurrence: "",
                    publicationType: "",
                };

                if (this.state.isValidLocation && this.state.isValidDates && this.state.isValidDescription)
                    this._addActivity(activity);
                break;
            case 4:
                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: moment(this.state.formattedDateStart, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: moment(this.state.formattedDateEnd, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateCreation: 0,
                    address: this.state.location,
                    vizzWon: 0,
                    practice: this.state.practice,
                    readingTime: "",
                    recurrence: "",
                    publicationType: "",
                };
                if (this.state.isValidLocation && this.state.isValidDates && this.state.isValidDescription)
                    this._addActivity(activity);
                break;
            case 5:
                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: moment(this.state.formattedDateStart, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: moment(this.state.formattedDateEnd, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateCreation: 0,
                    address: this.state.location,
                    vizzWon: 0,
                    practice: this.state.practice,
                    readingTime: this.state.readTime,
                    recurrence: this.state.recurrence,
                    publicationType: "",
                };
                if (this.state.isValidLocation && this.state.isValidDates && this.state.isValidDescription)
                    this._addActivity(activity);
                break;
            case 6:
                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: 0,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: 0,
                    dateCreation: 0,
                    address: this.state.location,
                    vizzWon: 0,
                    practice: "",
                    readingTime: this.state.readTime,
                    recurrence: "",
                    publicationType: "",
                };
                if (this.state.isValidLocation && this.state.isValidDates && this.state.isValidDescription)
                    this._addActivity(activity);
                break;
            case 7:

                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: moment(this.state.formattedDateStart, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: moment(this.state.formattedDateEnd, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateCreation: 0,
                    address: this.state.location,
                    vizzWon: 0,
                    practice: "",
                    readingTime: this.state.readTime,
                    recurrence: "",
                    publicationType: "",
                };

                if (this.state.isValidLocation && this.state.isValidDescription)
                    this._addActivity(activity);
                break;
            case 8:
                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: moment(this.state.formattedDateStart, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: moment(this.state.formattedDateEnd, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateCreation: 0,
                    address: this.state.location,
                    vizzWon: 0,
                    practice: "",
                    readingTime: "",
                    recurrence: "",
                    publicationType: "",
                };
                if (this.state.isValidLocation && this.state.isValidDescription)
                    this._addActivity(activity);
                break;
            case 9:
                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: moment(this.state.formattedDateStart, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: moment(this.state.formattedDateEnd, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateCreation: 0,
                    address: this.state.location,
                    vizzWon: 0,
                    practice: "",
                    readingTime: "",
                    recurrence: "",
                    publicationType: "",
                };
                if (this.state.isValidLocation && this.state.isValidDates && this.state.isValidDescription)
                    this._addActivity(activity);
                break;
            case 10:
                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: moment(this.state.formattedDateStart, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: moment(this.state.formattedDateEnd, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateCreation: 0,
                    address: this.state.location,
                    vizzWon: 0,
                    practice: this.state.practice,
                    readingTime: this.state.readTime,
                    recurrence: "",
                    publicationType: this.state.typePublication,
                };
                if (this.state.isValidLocation && this.state.isValidDates && this.state.isValidDescription)
                    this._addActivity(activity);
                break;
            case 11:
                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: moment(this.state.formattedDateStart, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: moment(this.state.formattedDateEnd, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateCreation: 0,
                    address: this.state.location,
                    vizzWon: 0,
                    practice: this.state.practice,
                    readingTime: this.state.readTime,
                    recurrence: "",
                    publicationType: this.state.typePublication,
                };
                if (this.state.isValidLocation && this.state.isValidDates && this.state.isValidDescription)
                    this._addActivity(activity);
                break;
            case 12:
                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: moment(this.state.formattedDateStart, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: moment(this.state.formattedDateEnd, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateCreation: 0,
                    address: this.state.location,
                    vizzWon: 0,
                    practice: this.state.practice,
                    readingTime: this.state.readTime,
                    recurrence: "",
                    publicationType: this.state.typePublication,
                };
                if (this.state.isValidLocation && this.state.isValidDates && this.state.isValidDescription)
                    this._addActivity(activity);
                break;
            case 13:
                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: moment(this.state.formattedDateStart, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: moment(this.state.formattedDateEnd, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateCreation: 0,
                    address: this.state.location,
                    vizzWon: 0,
                    practice: this.state.practice,
                    readingTime: this.state.readTime,
                    recurrence: "",
                    publicationType: this.state.typePublication,
                };
                if (this.state.isValidLocation && this.state.isValidDates && this.state.isValidDescription)
                    this._addActivity(activity);
                break;
            case 14:
                activity = {
                    actionId: actionSplitted[0],
                    userId: this.props.user.id,
                    means: this.state.means,
                    title: actionSplitted[1],
                    description: this.state.description,
                    etat: "",
                    dateStart: moment(this.state.formattedDateStart, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateRelease: 0,
                    dateValidation: 0,
                    dateEnd: moment(this.state.formattedDateEnd, "DD-MM-YYYY hh:mm").unix() * 1000,
                    dateCreation: 0,
                    address: this.state.location,
                    vizzWon: 0,
                    practice: this.state.practice,
                    readingTime: this.state.readTime,
                    recurrence: "",
                    publicationType: this.state.typePublication,
                };
                if (this.state.isValidLocation && this.state.isValidDates && this.state.isValidDescription)
                    this._addActivity(activity);
                break;
        }
        this._emptyFields();
        this.props.navigator.push({
            screen: "events.events",
            title: "Evénèments",
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                actionId: actionSplitted[0],
                tabId: 3,
            },
        });
    }

    _renderValidate() {
        return (
            <View style={{
                width: 350, height: 50,
                marginLeft: 30,
            }}>
                <Button style={{
                    backgroundColor: colors.blue,
                    color: colors.white,
                    borderRadius: 0,
                }}
                        title="Ajouter"
                        onPress={() => {
                            this._validateFieldsAndSubmit();
                        }}
                /></View>
        );
    }

    _selectPractice(practice) {

        this.setState({
            practices: practice.valPractice,
        });
    }

    _renderPractice() {
        return (
            <View style={styles.containers}>
                <View>
                    <AppText style={styles.labels}>Practice/recencée BT </AppText>
                </View>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Select
                        style={{backgroundColor: "#00BFB3"}}
                        width={350}
                        height={50}
                        ref="SELECT1"
                        optionListRef={this._getOptionListPractice.bind(this)}
                        defaultValue={this.state.practice}
                        onSelect={(practice) => this._selectPractice(practice)}
                    >
                        <Option value={{valPractice: true}} style={styles.options}>Oui</Option>
                        <Option value={{valPractive: false}} style={styles.options}>Non</Option>
                    </Select>
                    <OptionList ref="OPTIONLISTPractice" overlayStyles={styles.optionsLists}/>
                </View>
            </View>
        );
    }

    _getOptionListPublication() {
        return this.refs["OPTIONLISTPublication"];
    }

    _selectTypePublication(publication) {

        this.setState({
            TypePublication: publication.TypePublication,
        });
    }

    _renderTypePublication() {
        return (
            <View style={styles.containers}>
                <View><AppText style={styles.labels}>Type de publication:</AppText></View>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Select
                        style={{backgroundColor: "#00BFB3"}}
                        width={350}
                        height={50}
                        ref="SELECT1"
                        optionListRef={this._getOptionListPublication.bind(this)}
                        defaultValue={this.state.typePubication}
                        onSelect={(publication) => this._selectTypePublication(publication)}
                    >
                        <Option value={{TypePublication: "Blog"}} style={styles.options}>Blog</Option>
                        <Option value={{TypePublication: "Press écrite"}} style={styles.options}>Press écrite</Option>
                        <Option value={{TypePublication: "Internet"}} style={styles.options}>Internet</Option>
                    </Select>
                    <OptionList ref="OPTIONLISTPublication" overlayStyles={styles.optionsLists}
                    />
                </View>
            </View>
        );
    }

    _getOptionListReadingTime() {
        return this.refs["OPTIONLISTTenses"];
    }

    _selectReadingTime(time) {

        this.setState({
            lecture: time.valTiming,
        });
    }

    _renderReadingTime() {
        return (
            <View style={styles.containers}>
                <View><AppText style={styles.labels}>temps de Lecture:</AppText></View>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Select
                        style={{backgroundColor: "#00BFB3"}}
                        width={350}
                        height={50}
                        ref="SELECT1"
                        optionListRef={this._getOptionListReadingTime.bind(this)}
                        defaultValue={this.state.readTime}
                        onSelect={(time) => this._selectReadingTime(time)}
                    >
                        <Option value={{valTiming: "5 mn"}} style={styles.options}>5mn</Option>
                        <Option value={{valTiming: "5 mn à 10 mn"}} style={styles.options}>5mn à 10mn</Option>
                        <Option value={{valTiming: "plus que 10 mn"}} style={styles.options}>plus que 10mn</Option>
                    </Select>
                    <OptionList ref="OPTIONLISTTenses" overlayStyles={styles.optionsLists}
                    />
                </View>
            </View>
        );
    }

    _getOptionListRecurrence() {
        return this.refs["OPTIONLISTReccurence"];
    }

    _selectRecurrence(repeated) {
        this.setState({
            recurrence: repeated.valReccurence,
        });
    }

    _renderRecurrence() {
        return (
            <View style={styles.containers}>
                <View><AppText style={styles.labels}>Récurrence:</AppText></View>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Select
                        style={{backgroundColor: "#00BFB3"}}
                        width={350}
                        height={50}
                        ref="SELECTRECURRENCE"
                        optionListRef={this._getOptionListRecurrence.bind(this)}
                        defaultValue={this.state.recurrence}
                        onSelect={(repeated) => this._selectRecurrence(repeated)}
                    >
                        <Option value={{valReccurence: "Récurrence hebdo"}} style={styles.options}>Récurrence
                            hebdo</Option>
                        <Option value={{valReccurence: "Une fois"}} style={styles.options}>Une fois</Option>
                    </Select>
                    <OptionList ref="OPTIONLISTReccurence" overlayStyles={styles.optionsLists}
                    />
                </View>
            </View>
        );
    }

    _renderDescriptionField() {
        return (
            <View style={styles.containers}>
                <View>
                    <AppText style={styles.labels}> Description:</AppText>
                </View>
                <View style={{width: 0}}>
                    <AppTextInput
                        style={{
                            backgroundColor: "#00BFB3",
                            width: 350,
                            height: 50,
                            marginLeft: 30,
                            marginTop: -30,
                            borderWidth: 1,
                            borderColor: this.state.borderDescription,
                        }}
                        value={this.state.description}
                        onChangeText={(text) => {
                            if (text.length <= 2) {
                                this.setState({
                                    borderDescription: "#d9534f",
                                    isValidDescription: false,
                                    description: text,
                                });
                            }
                            else {
                                this.setState({
                                    description: text,
                                    isValidDescription: true,
                                    borderDescription: colors.lightGray,
                                });
                            }
                        }}
                        maxLength={30}
                        multiline={true}
                    />
                </View>
            </View>

        );
    }

    _renderLocationField() {
        return (
            <View style={[styles.containers]}>
                <View>
                    <AppText style={[styles.labels, {marginTop: 5}]}>Location:</AppText>
                </View>
                <View style={{width: 390}}>
                    <GooglePlacesAutocomplete
                        placeholder=''
                        minLength={2}
                        autoFocus={false}
                        returnKeyType={"search"}
                        listViewDisplayed='auto'
                        fetchDetails={true}
                        textInputProps={{value: this.state.location}}
                        onPress={(text) =>
                            this.setState({location: text.description})
                        }
                        getDefaultValue={() => {
                            return "";
                        }}
                        query={{
                            key: "AIzaSyA5mOz3Lz2_O0hpZIkylbRyAV2NWdariZQ",
                            language: "fr", // language of the results
                            types: ["establishment", "geocode"] // default: 'geocode'
                        }}
                        styles={{
                            textInputContainer: {
                                backgroundColor: "transparent",
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                                height: 50,
                            },
                            textInput: {
                                backgroundColor: "#00BFB3",
                                height: 50,
                                marginLeft: 30,
                                borderWidth: 1,
                                color: "#005852",
                                fontSize: 14,
                                borderColor: colors.lightGray,
                                borderRadius: 0,
                            },
                            predefinedPlacesDescription: {
                                color: "#1faadb",
                            },
                        }}
                        currentLocation={false}
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={200}
                    />
                </View>
            </View>
        );
    }

    _renderDateStartPicker() {
        const currentDate = moment().toDate();
        let hd = new Holidays("fr");
        let listHolidays = hd.getHolidays(moment().format("YYYY"));

        return (
            <View style={styles.containers}>
                <AppText style={styles.labels}>Date Début</AppText>
                <View>
                    <DatePicker
                        style={[
                            styles.calander,
                            {
                                borderColor: this.state.borderValidateDate,
                            }]}
                        date={this.state.formattedDateStart}
                        mode="datetime"
                        format={this.dateFormat}
                        minDate={currentDate}
                        placeholder='Sélectionnez une date..'
                        confirmBtnText="OK"
                        cancelBtnText="Annuler"
                        customStyles={{
                            dateInput: {
                                marginLeft: 36,
                                borderColor: "transparent",
                            },
                        }}
                        onDateChange={formattedDateStart => {
                            let dayBefore = moment(this.state.formattedDateEnd, "DD-MM-YYYY hh:mm").isBefore(moment(formattedDateStart, "DD-MM-YYYY hh:mm"));

                            let isHoliday = listHolidays.every(holiday =>
                                moment(holiday.date).format("DD-MM-YYYY") !== moment(formattedDateStart, "DD-MM-YYYY hh:mm").format("DD-MM-YYYY"),
                            );
                            let dayName = moment(formattedDateStart, "DD-MM-YYYY hh:mm").format("dddd");
                            let isWeekEnd = dayName === "Dimanche" || dayName === "Samedi" ? true : false;

                            if (dayBefore || !isHoliday || isWeekEnd) {
                                if (isWeekEnd || !isHoliday) this.setState({errorStartDate: "Jours non ouvrés"});
                                if (dayBefore) this.setState({errorStartDate: "Date début antérieure à date fin"});
                                this.setState({
                                    isValidDates: false,
                                    borderValidateDate: "#d50000",
                                    formattedDateStart: moment().format(this.dateFormat),
                                    formattedDateEnd: moment().format(this.dateFormat),
                                });
                            }
                            else {

                                this.setState({
                                    isValidDates: true,
                                    borderValidateDate: colors.lightGray,
                                    errorStartDate: "",
                                    errorEndDate: "",
                                    formattedDateStart: formattedDateStart,
                                });
                            }
                        }}
                    />

                    <AppText style={{color: "#d50000", marginLeft: 30}}>{this.state.errorStartDate}</AppText>
                </View>
            </View>
        );
    }

    _renderDateEndPicker() {

        let hd = new Holidays("fr");
        let listHolidays = hd.getHolidays(moment().format("YYYY"));
        return (
            <View style={styles.containers}>
                <View><AppText style={styles.labels}>Date fin </AppText></View>
                <View>
                    <DatePicker
                        style={[
                            styles.calander,
                            {
                                borderColor: this.state.borderValidateDate,
                            }]}
                        date={this.state.formattedDateEnd}
                        mode="datetime"
                        format={this.dateFormat}
                        minDate={this.state.formattedDateStart}
                        placeholder='Sélectionnez une date...'
                        confirmBtnText="OK"
                        cancelBtnText="Annuler"
                        customStyles={{
                            dateInput: {
                                marginLeft: 36,
                                borderColor: "transparent",
                            },
                        }}
                        onDateChange={formattedDateEnd => {
                            let dayBefore = (moment(formattedDateEnd, "DD-MM-YYYY hh:mm").isBefore(moment(this.state.formattedDateStart, "DD-MM-YYYY hh:mm")));
                            let isHoliday = listHolidays.every(holiday =>
                                moment(holiday.date).format("DD-MM-YYYY") !== moment(formattedDateEnd, "DD-MM-YYYY hh:mm").format("DD-MM-YYYY"),
                            );
                            let dayName = moment(formattedDateEnd, "DD-MM-YYYY hh:mm").format("dddd");
                            let isWeekEnd = dayName === "Dimanche" || dayName === "Samedi" ? true : false;

                            if (dayBefore || !isHoliday || isWeekEnd) {
                                if (isWeekEnd || !isHoliday) this.setState({errorEndDate: "Jours non ouvrés"});
                                if (dayBefore) this.setState({errorEndDate: "Date début antérieure à date fin"});
                                this.setState({
                                    isValidDates: false,
                                    borderValidateDate: "#d50000",
                                    formattedDateStart: moment().format(this.dateFormat),
                                    formattedDateEnd: moment().format(this.dateFormat),

                                });
                            }
                            else {
                                this.setState({
                                    isValidDates: true,
                                    borderValidateDate: colors.lightGray,
                                    errorEndDate: "",
                                    errorStartDate: "",
                                    formattedDateEnd: formattedDateEnd,
                                });
                            }

                        }}
                    />
                    <AppText style={{color: "#d50000", marginLeft: 30}}>{this.state.errorEndDate}</AppText>
                </View>
            </View>
        );
    }

    _renderAction() {
        return (
            <View style={styles.containers}>
                <View>
                    <AppText style={styles.labels}>Action</AppText></View>
                <Action
                    onSelect={(action, means) => {
                        const actionSplit = action.split("|");

                        this.setState({
                            action: action,
                            showFields: parseInt(actionSplit[0]),
                            meansByAction: means,
                        });
                    }}

                />
            </View>
        );
    }

    _renderMeanButton() {
        const show = this.state.showTable;
        return (
            <View style={{flexDirection: "row", marginLeft: 30, marginBottom: 20}}>
                <Icon.Button name="angle-down" backgroundColor="#00BFB3"
                             style={{width: 350, height: 50, borderRadius: 0}}
                             onPress={() => {
                                 this.setState({
                                     showTable: !show,
                                 });
                             }}
                >
                    <AppText style={{fontSize: 15, color: "#005852"}}>Acheter un moyen</AppText>
                </Icon.Button>
            </View>
        );
    }

    _renderMeans() {
        let arrayMeans = [];
        if (this.state.meansByAction.length > 0)
            arrayMeans = this.state.meanOptions.map(m => {

                    let mean = this.state.meansByAction.find(mba => parseInt(mba.meanId) === parseInt(m.id));

                    const newMean = mean ? {
                        name: m.name,
                        vizzsPerMean: m.vizzsPerMean,
                        quantity: mean.quantity,
                    }
                        :
                        m;
                    return newMean;

                },
            );

        return (
            <View style={{
                flexDirection: "column",
                backgroundColor: "rgb(221, 239, 239)",
                width: 350,
                marginLeft: 30,
                marginRight: 20,
            }}>
                <View style={{flexDirection: "row", justifyContent: "space-between", height: 50, width: 200}}>
                    <AppText style={{paddingRight: 30, paddingLeft: 30, fontWeight: "bold"}}>Moyen</AppText>
                    <AppText style={{paddingRight: 80, paddingLeft: 70, fontWeight: "bold"}}>Prix</AppText>
                    <AppText style={{fontWeight: "bold"}}>Quantité</AppText>
                </View>
                {
                    arrayMeans.map((mean, i) =>
                        <GridRow mean={mean} key={i}
                                 onQuantityChange={(meanId, quantity) => {
                                     let uniqueMeans = this.state.means;

                                     if (uniqueMeans.indexOf(meanId) === -1)
                                         uniqueMeans.push(meanId);

                                     this.setState({
                                         means: uniqueMeans,
                                     });

                                 }}
                        ></GridRow>,
                    )
                }
            </View>
        );
    }

    _getMeans = async () => {
        const means = await db.actions.getMeans();
        const meansWithQuantity = [];

        means.map(mean => {
            const _mean = {
                id:mean.id,
                name: mean.name,
                vizzsPerMean: mean.vizzsPerMean,
                quantity: 0,
            };
            meansWithQuantity.push(_mean);
        });

        this.setState({
            meanOptions: meansWithQuantity,
        });

    };

    _addActivity = async (activity) => {

        await db.actions.addActivity(activity);

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
                <View style={{flexDirection: "row"}}>
                    <AppText style={{
                        flex: 6,
                        fontWeight: "bold",
                        fontSize: 20,
                        height: 60,
                        color: colors.orange,
                        color: colors.orange,
                        marginLeft: 25,
                        marginTop: 10,
                        marginBottom: 10,
                    }}>
                        Créer une action
                    </AppText>
                    {this._renderVizzBadge()}
                </View>
                <View style={{backgroundColor: colors.orange, height: 5}}/>
            </View>
        );
    }

    _renderVizzBadge() {
        return (
            <Svg width="120" height="80">
                <G>
                    <Circle
                        cx="38"
                        cy="40"
                        r="38"
                        fill="orange"
                    />
                    <Text x="13" y="30" fontWeight="bold" fontSize="16" fill="white">980</Text>
                    <Image height="45" width="45" x="17" y="9" href={require("../../images/events/vizz_logo.png")}/>
                </G>
            </Svg>
        );
    }
}

const spaceBetweenFields = 20;

const styles = StyleSheet.create({
    createAction: {
        backgroundColor: colors.white,
        alignContent: "center",
        marginTop: -30,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 50,

    },
    options: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.lightGray,
    },
    optionsLists: {
        backgroundColor: "transparent",
        width: 400,
        height: 120,
        padding: 0,
        left: 5,
        top: 45,
        zIndex: 100,
    },
    containers: {
        flexDirection: "column",
        marginBottom: spaceBetweenFields,
    },
    labels: {
        paddingLeft: 30,
        color: "#005852",
        marginBottom: 0,
        height: 20,
    },
    mainContainer: {
        paddingTop: 0,
        backgroundColor: "white",
    },
    datePicker: {
        justifyContent: "flex-start",
    },

    componentContainer: {
        flex: 1,
        flexDirection: "column",
    },
    calander: {
        width: 350,
        backgroundColor: "#00BFB3",
        borderWidth: 1,
        marginLeft: 30,
        padding: 0,
    },
    card: {
        backgroundColor: "#00BFB3",
        borderRadius: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0.3,
        },
    },

});

CreateAction.propTypes = {
    action: PropTypes.object.isRequired,
};

const mapStateToProps = ({user}, ownProps) => ({
    user,
    ...ownProps,
});

export default connect(
    mapStateToProps,
)(CreateAction);