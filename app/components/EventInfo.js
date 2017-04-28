/**
 * Created by AAB3605 on 20/03/2017.
 */
import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    ScrollView,
    View,
    Platform,
    Button,
    Modal,
    Dimensions,
    Picker
} from "react-native";
import AppText from "./appText";
import EditableImage from "./editableImage";
import CheckBox from "react-native-check-box";
import DatePicker from "react-native-datepicker";
import strings from "../util/localizedStrings";
import colors from "./colors";
import BackButton from "./BackButton";
import Toggle from "./Toggle";
import ItemSpacer from "./ItemSpacer";
import FlexImage from "./FlexImage";
import AppTextInput from "./AppTextInput";
import moment from "moment";
import KeyboardSpacer from "react-native-keyboard-spacer";
import {Item} from "react-native-mock/build/components/Picker";

const eventIdToImages = {
    "40": require('./../images/events/formation_securite.jpg'),
    "0": require('./../images/events/0.jpg'),
    "7": require('./../images/events/blockchain-iot.jpg'),
    "41": require('./../images/events/poker_jeux.jpg'),
    "42": require('./../images/events/concert-de-rock.jpg'),
    "39": require('./../images/coderdojo.jpg'),
    "44": require('./../images/events/formationAgile.jpg'),
    "43": require('./../images/events/reactive-nativingitup-png-800x600_q96.png'),
    "38": require('./../images/events/soiree_nouveaux.jpg'),
    "46": require('./../images/events/tdd.png'),
}
let defaultImage = require('./../images/events/default.jpg');
const {height} = Dimensions.get('window');

export default class Event extends Component {

    constructor(props) {
        super(props);
        let image = eventIdToImages[this.props.event.id] || defaultImage;
        let {event} = this.props
        this.state = {
            newEvent: !this.props.id,
            editing: !this.props.id,
            picture: image,
            modalVisible: false,
            editedEvent: {
                ...event,
                id: event.id || Math.floor(Math.random() * (999999 - 9999)) + 9999 // TODO remove this atrocity
            }
        };
    }

    componentWillMount() {
        if (this.props.id)
            this.props.fetchEventParticipants(this.props.id)
    }

    formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split('/');
    }

    getCategoryNameFromId(id) {
        return strings.categoriesNames[id]
    }

    getCategoryColorFromId(id) {
        switch (id) {
            case 0:
                return colors.red
            case 1:
                return colors.orange
            case 2:
                return colors.green
            default:
                return 'transparent'
        }
    }

    toggleEditEvent = (editing) => {
        if (!editing) {
            if (this.state.newEvent) {
                this.setState({newEvent: false})
                this.props.addEvent(this.state.editedEvent)
            } else
                this.props.updateEvent(this.state.editedEvent)
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
                    <ItemSpacer/>
                    {this.renderDetails()}
                </View>
            </View>
        );
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
                style={{padding:8}}
                onPress={() => this.setState({editing: false})}
            />
        )
        return (
            <View style={{flex:1, height:150,flexDirection:'row', backgroundColor:colors.blue, alignItems:'center'}}>
                {editing ?
                    newEvent ? backButton : cancelButton :
                    backButton
                }
                <AppText style={{flex:5, color:'white', fontSize:20}}>
                    {editing ?
                        newEvent ? "Nouvel évènement" : "Modification" :
                        "Evènement"
                    }
                </AppText>
                <View style={{flex:3, flexDirection:'row'}}>
                    {canEdit && (
                        <View style={{flex:1, flexDirection:'row'}}>
                            <Toggle
                                isOn={newEvent}
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
        let {editedEvent} = this.state
        let {editing} = this.state
        const hostNameInitials = 'WS'
        const hostAvatar = (
            <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
                <AppText style={styles.avatar}>
                    {hostNameInitials}
                </AppText>
            </View>
        )
        const name = (
            editing ?
                <AppTextInput
                    style={[styles.name, {color:colors.blue, marginTop:2}]}
                    onChangeText={(text) => {this.setState({editedEvent:{...editedEvent, name:text}})}}
                    placeholder={editedEvent.name ? '' : "Nom de l'évènement.."}
                    value={editedEvent.name || ''}
                /> :
                <AppText style={styles.name}>
                    {editedEvent.name || 'Pas de nom'}
                </AppText>
        )
        const categoryDropdown = (
            <Picker
                selectedValue={editedEvent.category}
                onValueChange={(category) => {
                    this.setState({
                        editedEvent: {...editedEvent, category}
                    })}
                }
                style={{width:130}}
            >
                <Item label={this.getCategoryNameFromId(0)} value={0} />
                <Item label={this.getCategoryNameFromId(1)} value={1} />
                <Item label={this.getCategoryNameFromId(2)} value={2} />
            </Picker>
        )
        const categoryLabel = (
            <AppText>{this.getCategoryNameFromId(editedEvent.category)}</AppText>
        )
        const category = editing ? categoryDropdown : categoryLabel
        const categoryIndicator = (
            <View style={[
                styles.categoryIndicator,
                {borderTopColor: this.getCategoryColorFromId(editedEvent.category)}
            ]}
            />
        )
        const username = (
            <View style={styles.locationAndDate}>
                <FlexImage source={require('./../images/user.png')}/>
                <ItemSpacer/>
                <AppText style={{flex:5, textAlign:'left'}}>
                    {this.props.userName}
                </AppText>
            </View>
        )
        const location = (
            <View style={styles.locationAndDate}>
                <FlexImage source={require('./../images/location.png')}/>
                <ItemSpacer/>
                {
                    editing ?
                        <AppTextInput
                            style={{flex:5, textAlign:'left', textAlignVertical:'center'}}
                            onChangeText={(text) => {this.setState({editedEvent:{...this.state.editedEvent, location:text}})}}
                            editable={editing}
                            placeholder={editedEvent.location ? '' : "Lieu de l'évènement.."}
                            value={editedEvent.location}
                        /> :
                        <AppText style={{flex:5, textAlign:'left', textAlignVertical:'center'}}>
                            {editedEvent.location || "Lieu non renseigné.."}
                        </AppText>
                }

            </View>
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
            <View style={{flex:8, flexDirection:'row'}}>
                {hostAvatar}
                {eventInfo}
                {categoryIndicator}
            </View>
        )
    }

    renderDetails() {
        let {event} = this.props
        return (
            <View style={{flex:30,flexDirection:'column'}}>
                <ScrollView
                    style={{flex:1}}
                    contentContainerStyle={{flex:0}}
                >
                    {this.renderEventPicture(event.id)}
                    {
                        this.state.editing ?
                            this.renderDatePicker() :
                            this.renderEventDateAndParticipants()
                    }
                    {this.renderEventDescription(this.state.description)}
                    {/*{this.renderEventKeywords(event.keywords)}*/}
                    {this.renderNotifySuccess()}
                </ScrollView>
                <KeyboardSpacer/>
            </View>
        )
    }

    renderEventPicture() {
        const picture = this.state.editing ?
            (
                <EditableImage
                    style={{minHeight:height / 3}}
                    refs="eventDescription"
                    resizeMode="stretch"
                    defaultPicture={this.state.picture}
                    onSelected={(selected) => {this.updateImage(selected)}}
                />
            ) :
            (
                <FlexImage
                    style={{minHeight:height / 3}}
                    source={this.state.picture}
                    resizeMode="stretch"
                />
            )
        return (
            <View style={{flex:2,marginBottom:-20}}>
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

    renderDatePicker() {
        let {editedEvent, newEvent} = this.state
        return (
            <View style={{alignItems:'center'}}>
                <View style={[styles.participationInfoRectangle, {justifyContent: 'center', borderColor:colors.blue}]}>
                    <DatePicker
                        date={newEvent ? moment().toDate() : moment(editedEvent.date).toDate()}
                        mode="datetime"
                        format="YYYY/MM/DD HH:mm"
                        minDate={moment().toDate()}
                        placeholder='Sélectionnez une date..'
                        confirmBtnText="OK"
                        cancelBtnText="Annuler"
                        onDateChange={(date) => {
                            let formattedDate =  moment(new Date(date).toISOString())
                            this.setState({editedEvent: {...editedEvent, date: formattedDate}})
                        }}
                        customStyles={{
                                        dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                          marginLeft: 0
                                        },
                                        dateInput: {
                                          marginLeft: 36,
                                          borderWidth:0,
                                        },
                                        dateText: {
                                            color:colors.blue
                                        }
                                      }}
                    />
                </View>
            </View>
        );
    }

    renderEventDateAndParticipants() {
        let {editedEvent} = this.state
        let {user, participants} = this.props
        let [day, time] = this.formatDate(editedEvent.date)
        return (
            <View style={{alignItems:'center'}}>
                <View style={styles.participationInfoRectangle}>
                    <View style={styles.participationInfoItem}>
                        <AppText style={styles.participationInfoContainer}>
                            {participants.length}
                        </AppText>
                        <AppText style={styles.secondaryParticipationInfoText}>
                            {strings.participantsLabel}
                        </AppText>
                    </View>
                    <View style={styles.participationInfoItem}>
                        <AppText style={styles.participationInfoContainer}>
                            {day}
                        </AppText>
                        <AppText style={styles.secondaryParticipationInfoText}>
                            {time}
                        </AppText>
                    </View>
                    <View style={styles.participationInfoItem}>
                        <CheckBox
                            isChecked={participants.indexOf(user.id) !== -1}
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
        placeholder = this.state.editedEvent.description ? '' : placeholder;
        return (
            editing ?
                <View
                    style={{flex:1, paddingHorizontal: deviceWidth / 20, paddingTop:10, marginTop:10, height: deviceHeight/5}}>
                    <AppTextInput
                        style={[styles.description]}
                        onChangeText={(text) => {this.setState({editedEvent:{...this.state.editedEvent, description:text}})}}
                        multiline={true}
                        placeholder={placeholder}
                        value={this.state.editedEvent.description}
                    />
                </View> :
                <AppText style={[styles.description, {marginTop: 20}]}>
                    {this.state.editedEvent.description}
                </AppText>
        );
    }

    renderEventKeywords() {
        return (
            <AppText style={styles.keywords}>{this.state.editedEvent.keywords || 'Aucun mot clé'}</AppText>
        );
    }

    onParticipationChange = () => {
        let {user, event} = this.props
        let going = event.participants.indexOf(user.id) !== -1
        going ?
            this.props.unregisterUser(event, user.id) :
            this.props.registerUser(event, user.id)
    }
}

Event.defaultProps = {
    event: {
        name: '',
        date: '',
        category: 0,
        description: '',
        location: '',
        keywords: '',
    },
    userName: 'Wafa Salandre',
}

let {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
const styles = StyleSheet.create({
    categoryDropdown: {
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
        fontSize: 15,
        backgroundColor: 'transparent',
        padding: 0,
        color: colors.mediumGray,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: 'white',
        flex: 15
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
    avatar: {
        height: deviceWidth / 4,
        width: deviceWidth / 4,
        borderRadius: deviceWidth / 8,
        fontSize: 40,
        backgroundColor:colors.lightGray,
        textAlign:'center',
        color:'white',
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
        flex: 1,
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