import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg from 'react-native-svg/elements/Svg';
import {Circle, G, Image, Text} from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as db from '../global/db';
import colors from '../global/colors';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import AppTextInput from '../global/components/AppTextInput';
import GridRow from './GridRow';
import Action from './Action';
import {Option, OptionList, Select} from 'react-native-selectme';
import AppText from '../global/components/AppText';

export default class CreateAction extends Component {

    dateFormat = "DD/MM/YYYY [à] HH:mm";
    deviceHeight = Dimensions.get("window").height;

    constructor(props) {
        super(props);
        this.state = {
            meanOptions: [],
            showTable: false,
            means: [],
            description: "",
            location: "",
            formattedDateEnd: moment(new Date()).format(this.dateFormat),
            formattedDateStart: moment(new Date()).format(this.dateFormat),
            idAction: 0,
        };
    }

    componentWillMount() {
        this._getMeans();
    }

    render() {

        return (
            <View>

                {this._renderHeadband()}
                {this._renderCreateAction()}

                <View style={{flexDirection: "column"}}>
                    <ScrollView style={{height: 300}}>
                        {this._renderAction()}
                        {this._renderMeanButton()}
                        { this.state.showTable ?
                            this._renderMeans()
                            : null
                        }
                        {this._renderByAction()}

                    </ScrollView>
                </View>

            </View>

        );
    }

    _renderByAction() {
        const descriptionField = this._renderDescriptionField();
        const datePickerStart = this._renderDateStartPicker();
        const locationField = this._renderLocationField();
        const datePickerEnd = this._renderDateEndPicker();

        switch (this.state.idAction) {
            case 2:
                return (   <View>
                        {datePickerStart}
                        {datePickerEnd}


                        {descriptionField}
                        {locationField}
                        {this._renderPractice()}
                        {this._renderRecurrence()}
                        {this._renderReadingTime()}
                        {this._renderTypePublication()}
                        {this._renderValidate()}
                    </View>
                );

                break;
        }

    };

    _getOptionListPractice() {
        return this.refs["OPTIONLISTPractice"];
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
                        }}
                /></View>
        );
    }

    _selectPractice(practice) {

        this.setState({
            ...this.state,
            practices: practice.id,
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
                        defaultValue="Practice/recencée BT ..."
                        onSelect={(practice) => this._selectPractice(practice)}
                    >
                        <Option value={{id: "Oui"}}>Oui</Option>
                        <Option>Non</Option>
                    </Select>
                    <OptionList ref="OPTIONLISTPractice"
                                overlayStyles={{
                                    marginTop: 50, marginLeft: 30, backgroundColor: "#fff", width: 350, height: 120,
                                }}
                    />
                </View>
            </View>
        );
    }

    _getOptionListPublication() {
        return this.refs["OPTIONLISTPublication"];
    }

    _selectTypePublication(publication) {

        this.setState({
            ...this.state,
            type: publication.id,
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
                        defaultValue="Type de Publication ..."
                        onSelect={(publication) => this._selectTypePublication(publication)}
                    >
                        <Option value={{id: "Blog"}}>Blog</Option>
                        <Option>Press écrite</Option>
                        <Option>Internet</Option>
                    </Select>
                    <OptionList ref="OPTIONLISTPublication"
                                overlayStyles={{
                                    marginTop: 50, marginLeft: 30, backgroundColor: "#fff", width: 350, height: 120,
                                }}
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
            ...this.state,
            lecture: time.id,
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
                        defaultValue="Temps de Lecture ..."
                        onSelect={(time) => this._selectReadingTime(time)}
                    >
                        <Option value={{id: "5mn"}}>5mn</Option>
                        <Option>5mn à 10mn</Option>
                        <Option>plus que 10mn</Option>
                    </Select>
                    <OptionList ref="OPTIONLISTTenses"
                                overlayStyles={{
                                    marginTop: 15, marginLeft: 5, backgroundColor: "#fff", width: 400, height: 120,
                                    padding: 0,
                                }}
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
            ...this.state,
            nbr: repeated.id,
        });
    }

    _renderRecurrence() {
        return (
            <View style={styles.containers}>
                <View><AppText style={styles.labels}>Recurence:</AppText></View>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Select
                        style={{backgroundColor: "#00BFB3"}}
                        width={350}
                        height={50}
                        ref="SELECTRECURRENCE"
                        optionListRef={this._getOptionListRecurrence.bind(this)}
                        defaultValue="Réccurence ..."
                        onSelect={(repeated) => this._selectRecurrence(repeated)}
                    >
                        <Option value={{id: "Reccurence hebdo"}}>Reccurence hebdo</Option>
                        <Option>une fois</Option>
                    </Select>
                    <OptionList ref="OPTIONLISTReccurence"
                                overlayStyles={{
                                    marginTop: 50, marginLeft: 30, backgroundColor: "#fff", width: 350, height: 120,

                                }}
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
                <AppTextInput
                    style={{
                        backgroundColor: "#00BFB3", width: 350,
                        height: 50, marginLeft: 30, marginTop: -20,
                    }}
                />
            </View>

        );
    }

    _getLocationError(location) {
        if (location.length < 2) {
            return "Le lieu doit contenir au moins deux caractères.";
        } else {
            const regexLocation = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s\-']*$/;
            if (!regexLocation.test(location)) {
                return "Le lieu doit seulement contenir des caractères alphanumériques, tiret ou apostrophe.";
            }
        }
        return null;
    }

    _renderLocationField() {
        return (
            <View style={styles.containers}>
                <View>
                    <AppText style={[styles.labels, {marginTop: -20}]}>Location:</AppText>
                </View>
                <AppTextInput
                    style={{
                        backgroundColor: "#00BFB3", width: 350,
                        height: 50, marginLeft: 30, marginTop: -25, marginBottom: -25,
                    }}
                />
            </View>
        );
    }

    _renderDateStartPicker() {
        const currentDate = moment().toDate();
        return (
            <View style={styles.containers}>
                <AppText style={styles.labels}>Date Debut: </AppText>
                <View><DatePicker
                    style={styles.calander}
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
                /></View>
            </View>
        );
    }

    _renderDateEndPicker() {
        const currentDate = moment().toDate();

        return (
            <View style={styles.containers}>
                <View><AppText style={styles.labels}>Date fin : </AppText></View>
                <View><DatePicker
                    style={styles.calander}
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
                </View>
            </View>
        );
    }

    _renderAction() {
        return (
            <View style={styles.containers}>
                <View><AppText style={styles.labels}>Action</AppText></View>
                <Action
                    onSelect={id => {
                        this.setState({
                            idAction: id,
                        });
                    }}
                />
            </View>
        );
    }

    _renderMeanButton() {
        const show = this.state.showTable;
        return (
            <View style={{flexDirection: "row", marginLeft: 30, marginBottom: 10}}>
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
                    this.state.meanOptions.map((mean, i) =>
                        <GridRow mean={mean} key={i}
                                 onQuantityChange={quantity => {
                                     this.setState({
                                         meanQuantity: this.state.meanQuantity.push(quantity),
                                     });
                                 }}
                        ></GridRow>,
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
                <View style={{flexDirection: 'row'}}>
                    <AppText style={{
                        flex: 6,
                        fontWeight: 'bold',
                        fontSize: 20,
                        height: 60,
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
                    <Image height="45" width="45" x="17" y="9" href={require('../../images/events/vizz_logo.png')}/>
                </G>
            </Svg>
        );
    }
};

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
    containers: {
        flexDirection: "column",
        marginBottom: spaceBetweenFields,
    },
    labels: {
        paddingLeft: 30,
        color: "dimgrey",
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
        marginLeft: 30,
        padding: 0,
    },

});