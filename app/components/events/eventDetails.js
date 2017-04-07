/**
 * Created by AAB3605 on 20/03/2017.
 */
import React, {Component} from "react";
import {TextInput, StyleSheet, Image, ScrollView, View, Platform, Dimensions, TouchableOpacity, Button} from "react-native";
import Header from "../header";
import AppText from "../appText";
import EditableAppText from "../editableAppText";
import EditableImage from "../editableImage";
import strings from "../../util/localizedStrings";
import * as util from "../../util/util";
import CheckBox from "react-native-check-box";
import colors from './../events/colors';
import DatePicker from "react-native-datepicker";
import ModalDropdown from 'react-native-modal-dropdown';


let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

const eventIdToImages = {
    "40": require('./../../images/formation_securite.jpg'),
    "0":require('./../../images/0.jpg'),
    "7":require('./../../images/blockchain-iot.jpg'),
    "41":require('./../../images/poker_jeux.jpg'),
    "42":require('./../../images/concert-de-rock.jpg'),
    "39":require('./../../images/coderdojo.jpg'),
    "44":require('./../../images/formationAgile.jpg'),
    "43":require('./../../images/reactive-nativingitup-png-800x600_q96.png'),
    "38":require('./../../images/soiree_nouveaux.jpg'),
    "46":require('./../../images/tdd.png'),
}


export default class EventDetails extends Component {
    static defaultProps = {
        keywords: ["cool", "fun", "awesome"],
        userName: 'Al Inclusive',
        numberOfParticipants: '121',
        isModificationAllowed: true,
        isInModificationMode: false
    }

    constructor(props) {
        super(props);
        let categoryName = strings.categoriesNames[this.props.event.category];
        let categoryColor = util.getCategoryColor(this.props.event.category);
        let defaultImage = require('./../../images/0.jpg');
        let image = eventIdToImages[this.props.event.id] || defaultImage;
        this.state = {
            categoryId:this.props.event.category,
            categoryName: categoryName,
            categoryColor: categoryColor,
            going: this.props.event.participating,
            description: this.props.event.description,
            title: this.props.event.name,
            location: this.props.event.location,
            date: this.props.event.date,
            picture: image,
            isModificationAllowed : this.props.isModificationAllowed,
            isInModificationMode: this.props.isInModificationMode
        };
    }

    render() {
        let event = this.props.event;
        return (
            <View style={{flex:1}}>
                {this.renderTopBar()}
                <View style={styles.container}>
                    <View style={{flex:1}}>
                        <View style={{flex:3}}>
                            {this.renderHeader(event)}
                        </View>
                        <View style={{flex:7,flexDirection:'column'}}>
                            <ScrollView
                                style={{
                                    flex:1,
                                }}
                            >
                                {this.renderEventIllustration(event.id)}
                                {this.renderCenterContent()}
                                {this.renderEventDescription(this.state.description)}
                                {this.renderEventKeywords(this.props.keywords)}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderTopBar() {
        if(this.state.isModificationAllowed){
            return(
                <View style={styles.topbar}>
                    <View style={{flex:3, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <AppText style={styles.topBarText}>{strings.eventEditionLabel}</AppText>
                    </View>
                    <View style={{flex:2, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Button title={strings.editEvent} style={{flex:1, margin:1}}
                                    onPress={() => this.setState({isInModificationMode: true})}/>
                            <Button title={strings.saveEvent} style={{flex:1, marginLeft:5}}
                                    onPress={() => this.setState({isInModificationMode: false})}/>
                        </View>

                    </View>
                </View>
            );
        }
        else{
            return(
                <Header/>
            );
        }
    }

    renderHeader(event) {
        return (
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={styles.organizatorPicture}>
                    <TouchableOpacity>
                        <Image source={require('./../../images/userAvatar.jpg')} style={styles.organizatorPictureCircle}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <View style={{flexDirection:'row'}}>
                        <EditableAppText
                            refs="eventName"
                            isInModificationMode={this.state.isInModificationMode}
                            style={styles.headerTitle}
                            content={this.state.title}
                            mandatory={true}
                            onValidate={(value) => this.setState({title: value})}/>
                        <View style={[styles.headerCategoryTriangle, {borderTopColor:this.state.categoryColor}]}/>
                    </View>
                    {this.renderCategory()}
                    <View style={styles.headerInfoItem}>
                        <Image source={require('./../../images/user.png')}/>
                        <AppText style={{margin: 5}}>
                            {this.props.userName}
                        </AppText>
                    </View>
                    <View style={styles.headerInfoItem}>
                        <Image source={require('./../../images/place.png')}/>
                        <EditableAppText
                            isInModificationMode={this.state.isInModificationMode}
                            content={this.state.location}
                            mandatory={true}
                            onValidate={(value) => this.setState({location: value})}/>
                    </View>
                </View>
            </View>
        )
    }

    renderCategory(){
        if(this.state.isInModificationMode){
            return(
                <ModalDropdown
                    dropdownStyle={styles.dropdown}
                    textStyle={{color:this.state.categoryColor}}
                    options={strings.categoriesNames}
                    defaultValue={this.state.categoryName}
                    onSelect={(selectedCategory)=> this.updateCategory(selectedCategory)}/>
            );
        }
        else{
            return(
                <AppText style={[styles.category, {color: this.state.categoryColor}]}>
                    {this.state.categoryName}
                </AppText>
            );
        }
    }

    updateCategory(selectedCategory){
        this.setState({categoryId: selectedCategory});
        this.setState({categoryName: strings.categoriesNames[selectedCategory]});
        this.setState({categoryColor: util.getCategoryColor(selectedCategory)});
    }

    updateImage(selected){
        let imageSource = { uri: selected };
        this.setState({picture:imageSource});
    }

    renderEventIllustration() {
        if(this.state.isInModificationMode){
            return(
                <EditableImage
                    defaultPicture={this.state.picture}
                    onSelected={(selected) => {this.updateImage(selected)}}
                />
            );
        }
        else{
            return (
                <View style={{marginBottom:-20}}>
                    <Image
                        source={this.state.picture}
                        resizeMode="stretch"
                        style={{
                        flex: 1,
                        width:null,
                        height:deviceHeight*(1/3)
                    }}
                    />
                </View>
            );
        }
    }

    renderCenterContent(){
        return this.state.isInModificationMode ? this.renderDatePicker() : this.renderEventParticipationInfos();
    }

    renderDatePicker(){
        let eventDate = new Date(this.state.date);
        return(
            <View style={{alignItems:'center'}}>
                <View style={[styles.participationInfoRectangle, {justifyContent: 'center'}]}>
                    <DatePicker
                        date={eventDate}
                        mode="datetime"
                        format="YYYY/MM/DD HH:mm"
                        confirmBtnText="OK"
                        cancelBtnText="Annuler"
                        onDateChange={(datetime) => {this.setState({date: datetime});}}
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
                </View>
            </View>
        );
    }

    renderEventParticipationInfos() {
        let { going } = this.state;
        let date = this.formatDate();
        return (
            <View style={{alignItems:'center'}}>
                <View style={styles.participationInfoRectangle}>
                    <View style={styles.participationInfoItem}>
                        <AppText style={styles.participationInfoContainer}>
                            {this.props.numberOfParticipants}
                        </AppText>
                        <AppText style={styles.secondaryParticipationInfoText}>
                            {strings.participantsLabel}
                        </AppText>
                    </View>
                    <View style={styles.participationInfoItem}>
                        <AppText style={styles.participationInfoContainer}>
                            {date[1]}
                        </AppText>
                        <AppText style={styles.secondaryParticipationInfoText}>
                            {date[0]}
                        </AppText>
                    </View>
                    <View style={styles.participationInfoItem}>
                        <CheckBox
                            isChecked={going}
                            onClick={this.pressGoing}
                        />
                        <AppText>{strings.participationLabel}</AppText>
                    </View>
                </View>
            </View>
        );
    }

    renderEventDescription(description) {
        return (
            <View style={{padding:20}}>
                <EditableAppText
                    isInModificationMode={this.state.isInModificationMode}
                    style={styles.description}
                    multiline={true}
                    content={description}
                    onValidate={(value) => this.setState({description: value})}/>
            </View>
        );
    }

    renderEventKeywords(keywords) {
        let keywordText = this.formatKeywords(keywords);
        return (
            <View>
                <AppText style={styles.keywords}>{keywordText}</AppText>
            </View>
        );
    }

    formatKeywords(keywords) {
        let text = '';
        for (let i = 0; i < keywords.length; i++) {
            text += "#" + keywords[i];
        }
        return text;
    }

    pressGoing = () => {
        this.setState({going: !this.state.going});
        this.props.onParticipationChange();
    }

    formatDate() {
        return this.props.event.getDateToString().split("/");
    }
}

const styles = StyleSheet.create({
    dropdown:{
        flexDirection: 'row',
        flex:1,
    },

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

    illustration: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    description: {
        fontSize: 16,
        textAlign: 'center',
        justifyContent:'center',
    },

    keywords: {
        fontSize: 14,
        textAlign: 'center',
        flex: 1,
        padding: 20
    },

    headerCategoryTriangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 30,
        borderTopWidth: 30,
        borderRightColor: 'transparent',
        transform: [
            {rotate: '90deg'}
        ]
    },

    organizatorPictureCircle: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },

    organizatorPicture:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        padding:20,
        alignItems:'center',
    },

    contentContainer: {
        flex:3,
        paddingLeft:20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    headerTitle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 22,
        flex:2
    },

    category: {
        textAlign: 'left',
        flex:3,
        justifyContent:'flex-start',
        paddingTop:5
    },

    headerInfoItem: {
        flex:3,
        flexDirection: 'row',
        alignItems:'center',
    },

    participationInfoRectangle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: deviceHeight * 0.1,
        width: deviceWidth * 0.85,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'grey',
        paddingLeft: deviceWidth * 0.05,
        paddingRight: deviceWidth * 0.05,
    },

    participationInfoItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    participationInfoContainer: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },

    secondaryParticipationInfoText: {
        textAlign: 'center',
        fontSize: 16
    },
});