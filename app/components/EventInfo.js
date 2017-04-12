/**
 * Created by AAB3605 on 20/03/2017.
 */
import React, {Component} from "react";
import {
    TextInput,
    StyleSheet,
    Image,
    ScrollView,
    View,
    Platform,
    Dimensions,
    TouchableOpacity,
    Button,
    Modal,
} from "react-native";
import Header from "./header";
import AppText from "./appText";
import EditableAppText from "./editableAppText";
import EditableImage from "./editableImage";
import CheckBox from "react-native-check-box";
import DatePicker from "react-native-datepicker";
import ModalDropdown from 'react-native-modal-dropdown';
import strings from "../util/localizedStrings";
import * as util from "../util/util";
import colors from './colors';
import BackButton from './BackButton'
import Toggle from './Toggle'
import ItemSpacer from './ItemSpacer'
import FlexImage from './FlexImage'
import AppTextInput from './AppTextInput'

let {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');

const eventIdToImages = {
    "40": require('./../images/formation_securite.jpg'),
    "0": require('./../images/0.jpg'),
    "7": require('./../images/blockchain-iot.jpg'),
    "41": require('./../images/poker_jeux.jpg'),
    "42": require('./../images/concert-de-rock.jpg'),
    "39": require('./../images/coderdojo.jpg'),
    "44": require('./../images/formationAgile.jpg'),
    "43": require('./../images/reactive-nativingitup-png-800x600_q96.png'),
    "38": require('./../images/soiree_nouveaux.jpg'),
    "46": require('./../images/tdd.png'),
}

export default class Event extends Component {
    static defaultProps = {
        event: {
            name: '',
            date: '',
            category: '2',
            description: '',
            location: '',
            keywords: ["cool", "fun", "awesome"],
        },
        keywords: ["cool", "fun", "awesome"],
        userName: 'Al Inclusive',
        numberOfParticipants: '121',
        isModificationAllowed: true,
        isInModificationMode: false,
        isInCreationMode: false,
    }

    constructor(props) {
        super(props);
        let categoryName = strings.categoriesNames[this.props.event.category];
        let categoryColor = util.getCategoryColor(this.props.event.category);
        let defaultImage = require('./../images/0.jpg');
        let image = eventIdToImages[this.props.event.id] || defaultImage;
        let isEventInvalid = this.props.event.name === ''
            || this.props.event.location === ''
            || this.props.event.date === '';
        this.state = {
            editing: false,
            categoryId: this.props.event.category,
            categoryName: categoryName,
            categoryColor: categoryColor,
            going: this.props.event.participating,
            description: this.props.event.description,
            title: this.props.event.name,
            location: this.props.event.location,
            date: this.props.event.date,
            picture: image,
            isModificationAllowed: this.props.isModificationAllowed,
            isInModificationMode: this.props.isInModificationMode,
            isEventInvalid: isEventInvalid,
            modalVisible: false,
            event: {
                name: '',
                description: '',
                category: 0,
                location: '',
                date: '',
            }
        };
    }

    componentWillMount() {
        this.props.fetchEventParticipants(this.props.id)
    }

    getCategoryNameFromId(id) {
        return strings.categoriesNames[this.props.event.category]
    }

    toggleEditEvent = (editing) => {
        if (!editing) {
            this.props.updateEvent(this.state.event)
        }
        this.setState({
            editing
        })
    }

    render() {
        let {event} = this.props
        return (
            <View style={{flex:1}}>
                {this.renderHeader()}
                <View style={styles.container}>
                    {this.renderMainInfo()}
                    <View style={{flex:8,flexDirection:'column'}}>
                        <ScrollView
                            style={{flex:1}}
                            contentContainerStyle={{flex:1}}
                        >
                            {this.renderEventPicture(event.id)}
                            {this.renderCenterContent()}
                            {this.renderEventDescription(this.state.description)}
                            {this.renderEventKeywords(this.props.keywords)}
                            {this.renderNotifySuccess()}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }

    renderHeader() {
        let {editing} = this.state
        let {canEdit} = this.props
        return (
            <View style={{flex:1, flexDirection:'row', backgroundColor:colors.blue, alignItems:'center'}}>
                <BackButton navigator={this.props.navigator}/>
                <AppText style={{flex:5, color:'white', fontSize:16}}>
                    {this.state.editing ? "Modification" : "Evènement"}
                </AppText>
                <View style={{flex:3, flexDirection:'row'}}>
                    {!canEdit && (
                        <View style={{flex:1, flexDirection:'row'}}>
                            <Toggle
                                style={{flex:5}}
                                onToggle={this.toggleEditEvent}
                            >
                                <AppText style={{color:'white', textAlign:'right'}}>
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

    renderMainInfo() {
        let {event} = this.props
        let {editing} = this.state
        const hostAvatar = (
            <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity>
                    <Image
                        source={require('./../images/userAvatar.jpg')}
                        style={styles.hostAvatar}
                    />
                </TouchableOpacity>
            </View>
        )
        const name = (
            <AppTextInput
                style={styles.name}
                onValidate={(text) => {this.setState({event:{...this.state.event, name:text}})}}
                editable={editing}
            >
                {event.name || "Nom de l'évènement.."}
            </AppTextInput>
        )
        const category = false ?
            (
                <ModalDropdown
                    dropdownStyle={styles.dropdown}
                    textStyle={{color:this.state.categoryColor}}
                    options={strings.categoriesNames}
                    defaultValue={this.state.categoryName}
                    onSelect={(selectedCategory)=> this.updateCategory(selectedCategory)}
                />
            ) :
            (
                <AppText style={[styles.category, {color: this.state.categoryColor}]}>
                    {this.getCategoryNameFromId(event.category)}
                </AppText>
            )
        const username = (
            <View style={styles.locationAndDate}>
                <FlexImage source={require('./../images/user.png')}/>
                <ItemSpacer/>
                <AppText style={{flex:5, textAlign:'left', textAlignVertical:'center'}}>
                    {this.props.userName}
                </AppText>
            </View>
        )
        const location = (
            <View style={styles.locationAndDate}>
                <FlexImage source={require('./../images/location.png')}/>
                <ItemSpacer/>
                <AppTextInput
                    style={{flex:5, textAlign:'left', textAlignVertical:'center'}}
                    onValidate={(text) => {this.setState({event:{...this.state.event, location:text}})}}
                    editable={editing}
                >
                    {event.location || "Lieu de l'évènement.."}
                </AppTextInput>
            </View>
        )
        const categoryIndicator = (
            <View style={[styles.categoryIndicator, {borderTopColor:this.state.categoryColor}]}/>
        )
        const eventInfo = (
            <View style={{flex:6, flexDirection:'column'}}>
                {name}
                {category}
                <View style={styles.locationAndDateContainer}>
                    {username}
                    {location}
                </View>
            </View>
        )
        return (
            <View style={{flex:3, flexDirection:'row'}}>
                {hostAvatar}
                {eventInfo}
                {categoryIndicator}
            </View>
        )
    }

    renderEventPicture() {
        const picture = this.state.editing ?
            (
                <EditableImage
                    refs="eventDescription"
                    resizeMode="stretch"
                    defaultPicture={this.state.picture}
                    onSelected={(selected) => {this.updateImage(selected)}}
                />
            ) :
            (
                <FlexImage
                    source={this.state.picture}
                    resizeMode="stretch"
                />
            )
        return (
            <View style={{flex:1,marginBottom:-20}}>
                {picture}
            </View>
        )
    }

    renderNotifySuccess() {
        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.props.navigator.resetTo({
                            title: 'Home'
                        });
                    }}
                >
                    <View style={{flex:2, backgroundColor: 'rgba(227, 254, 255, 0.5)'}}></View>
                    <View
                        style={{
                            flex:1,
                            justifyContent: 'center',
                            alignItems:'center',
                            backgroundColor: 'rgba(186, 242, 255, 1)'
                        }}
                    >
                        <View>
                            <AppText style={{textAlign:'center'}}>
                                {"Evènement créé avec succès!"}
                            </AppText>
                            <Button
                                onPress={() => {
                                    this.props.navigator.resetTo({
                                        title: 'Home'
                                    });
                                }}
                                title="OK"
                                color="#6ABEFF"
                            />
                        </View>
                    </View>
                    <View style={{flex:2, backgroundColor: 'rgba(227, 254, 255, 0.5)'}}></View>
                </Modal>
            </View>
        );
    }

    renderCenterContent() {
        return this.state.isInModificationMode ? this.renderDatePicker() : this.renderEventDateAndParticipants();
    }

    renderDatePicker() {
        let eventDate = new Date(this.state.date);
        return (
            <View style={{alignItems:'center'}}>
                <View style={[styles.participationInfoRectangle, {justifyContent: 'center'}]}>
                    <DatePicker
                        date={eventDate}
                        mode="datetime"
                        format="YYYY/MM/DD HH:mm"
                        confirmBtnText="OK"
                        cancelBtnText="Annuler"
                        onDateChange={(datetime) => {
                            this.setState({date: datetime});
                            this.validateEvent();}}
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
                        style={{color:'red'}}>{this.state.date === undefined ? strings.requiredField : ''}</AppText>
                </View>
            </View>
        );
    }

    renderEventDateAndParticipants() {
        let {going} = this.state;
        let {event} = this.props
        let date = {event}
        let {participants} = this.props

        return (
            <View style={{alignItems:'center'}}>
                <View style={styles.participationInfoRectangle}>
                    <View style={styles.participationInfoItem}>
                        <AppText style={styles.participationInfoContainer}>
                            {participants ? participants.length : ''}
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
                            onClick={this.onParticipationChange}/>
                        <AppText>{strings.participationLabel}</AppText>
                    </View>
                </View>
            </View>
        );
    }

    renderEventDescription() {
        let {editing} = this.state
        let placeholder = editing ?
            'Description..' :
            'Aucune description'
        let description = this.props.event.description || placeholder
        return (
            editing ?
                <AppTextInput
                    style={styles.description}
                    onValidate={(text) => {this.setState({event:{...this.state.event, description:text}})}}
                    multiline={true}
                >
                    {description}
                </AppTextInput> :
                <AppText style={styles.description}>
                    {description}
                </AppText>
        );
    }

    renderEventKeywords(keywords) {
        let keywordText = this.formatKeywords(keywords);
        return (
            <AppText style={styles.keywords}>{keywordText}</AppText>
        );
    }

    /*process functions*/

    Save = async() => {
        if (this.props.isInCreationMode) {
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
            this.setState({modalVisible: true});
        }
        else {
            // Update
        }
    }

    getDateTime(date, time) {
        let unixTime = (time.split(":")[0] * 3600 + time.split(":")[1] * 60) * 1000;
        return (new Date(date).valueOf() + unixTime)
    }

    validateEvent() {
        let isEventInvalid = this.state.title === '' || this.state.location === '' || this.state.date === '';
        this.setState({isEventInvalid});
    }

    updateCategory(selectedCategory) {
        this.setState({categoryId: selectedCategory});
        this.setState({categoryName: strings.categoriesNames[selectedCategory]});
        this.setState({categoryColor: util.getCategoryColor(selectedCategory)});
    }

    updateImage(selected) {
        let imageSource = {uri: selected};
        this.setState({picture: imageSource});
    }

    formatKeywords(keywords) {
        let text = '';
        for (let i = 0; i < keywords.length; i++) {
            text += "#" + keywords[i];
        }
        return text;
    }

    onParticipationChange = () => {
        let {user, event} = this.props
        this.state.going ?
            this.props.unregisterUser(event.id, user.id) :
            this.props.registerUser(event.id, user.id);
        // setTimeout(() => {this.props.fetchEventParticipants(this.props.id)},500)
        this.setState({going: !this.state.going});
    }
}

const styles = StyleSheet.create({
    dropdown: {
        flexDirection: 'row',
        flex: 1,
    },

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
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: 'white',
        flex: 15
    },

    illustration: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    description: {
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    keywords: {
        fontSize: 14,
        textAlign: 'center',
        flex: 1,
    },

    categoryIndicator: {
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

    hostAvatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },

    organizatorPicture: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
    },

    contentContainer: {
        flex: 3,
        paddingLeft: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    name: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 22,
        flex: 2
    },
    category: {
        textAlign: 'left',
        flex: 3,
        justifyContent: 'flex-start',
        paddingTop: 5
    },

    locationAndDateContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    locationAndDate: {
        flex: 1,
        flexDirection: 'row',
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