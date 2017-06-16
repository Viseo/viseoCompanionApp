import React, {Component} from 'react';
import AppText from '../global/components/AppText';
import {View, Dimensions, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Avatar from '../../components/Avatar';
import strings from '../global/localizedStrings';
import FlexImage from '../../components/FlexImage';
import ItemSpacer from '../../components/ItemSpacer';
import colors from '../global/colors';
import CheckBox from 'react-native-check-box';
import {defaultNavBarStyle} from '../global/navigatorStyle';

const {height, width} = Dimensions.get('window');

export default class Event extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.id === 'edit') {
            this._goToEditEvent();
        }
    }

    render() {
        const mainInfo = this._renderMainInfo();
        const details = this._renderDetails();
        return (
            <View style={styles.mainContainer}>
                {mainInfo}
                {details}
                <ItemSpacer/>
            </View>
        );
    }

    _getCategoryColorFromId(id) {
        switch (id) {
            case 0:
                return colors.red;
            case 1:
                return colors.orange;
            case 2:
                return colors.green;
            default:
                return 'transparent';
        }
    }

    _goToEditEvent() {
        this.props.navigator.push({
            screen: 'events.editEvent',
            title: 'Modifier l\'évènement',
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                eventId: this.props.id,
            },
        });
    }

    _renderDetails() {
        const eventPicture = this._renderEventPicture();
        const dateAndParticipants = this._renderEventDateAndParticipants();
        const description = <AppText style={styles.description}>{this.props.description}</AppText>;
        return (
            <View style={styles.eventDetails}>
                <ScrollView
                    style={{flex: 1}}
                    contentContainerStyle={{flex: 0}}
                >
                    {eventPicture}
                    {dateAndParticipants}
                    {description}
                </ScrollView>
            </View>
        );
    }

    _renderEventDateAndParticipants() {
        const {day, time} = this.props;
        const countParticipants =
            <View style={styles.participationInfoItem}>
                <AppText style={styles.participationInfoContainer}>
                    {this.props.numberOfParticipants}
                </AppText>
                <AppText style={styles.secondaryParticipationInfoText}>
                    {strings.participantsLabel}
                </AppText>
            </View>;
        const checkParticipation = (
            <View style={{alignItems: 'center'}}>
                <CheckBox
                    isChecked={this.props.participating}
                    onClick={() => this.props.onParticipationChange()}
                />
                <AppText>{strings.participationLabel}</AppText>
            </View>
        );
        return (
            <View style={styles.dateAndParticipantsContainer}>
                <View style={styles.participationInfoRectangle}>
                    {countParticipants}
                    <View style={styles.participationInfoItem}>
                        <AppText style={styles.participationInfoContainer}>
                            {day}
                        </AppText>
                        <AppText style={styles.secondaryParticipationInfoText}>
                            à {time}
                        </AppText>
                    </View>
                    <View style={styles.participationInfoItem}>
                        {checkParticipation}
                    </View>
                </View>
            </View>
        );
    }

    _renderEventPicture() {
        const imageUrl = this.props.imageUrl || 'https://s3-eu-west-1.amazonaws.com/viseo-companion/defaultEventImage.jpeg';
        return (
            <Image
                style={{height: 200, width: width}}
                source={{uri: imageUrl}}

            />
        );
    }

    _renderHostInfo() {
        const fullHostName = this.props.hostFirstName + '  ' + this.props.hostLastName;
        return (
            <View style={styles.locationAndDate}>
                <FlexImage source={require('./../../images/user.png')}/>
                <AppText style={styles.locationAndDateText}>{fullHostName}</AppText>
            </View>
        );
    }

    _renderLocation() {
        return (
            <View style={styles.locationAndDate}>
                <FlexImage source={require('./../../images/location.png')}/>
                <AppText style={styles.locationAndDateText}>{this.props.location}</AppText>
            </View>
        );
    }

    _goToUserProfile() {
        this.props.navigator.push({
            screen:'user.othersProfile',
            title:'Profil détaillé',
            passProps: {
                user: this.props.host
            }
        });
    }

    _renderMainInfo() {
        const hostAvatar =
            <TouchableOpacity
                onPress={() => this._goToUserProfile()}>
                <Avatar
                    firstName={this.props.hostFirstName}
                    lastName={this.props.hostLastName}
                    style={{flex: 3, paddingHorizontal: 10}}
                />
            </TouchableOpacity>;
        const name = <AppText style={styles.name}>{this.props.name}</AppText>;
        const categoryName = strings.categoriesNames[this.props.category];
        const category = <AppText>{categoryName}</AppText>;
        const categoryColor = this._getCategoryColorFromId(this.props.category);
        const categoryIndicator = <View style={[styles.categoryIndicator, {borderTopColor: categoryColor}]}/>;
        const hostInfo = this._renderHostInfo();
        const location = this._renderLocation();
        return (
            <View style={styles.mainInfo}>
                {hostAvatar}
                <View style={{flex: 6, flexDirection: 'column', paddingBottom: 20}}>
                    {name}
                    {category}
                    <View style={styles.locationAndDateContainer}>
                        {hostInfo}
                        {location}
                    </View>
                </View>
                {categoryIndicator}
            </View>
        );
    }

}

Event.propTypes = {
    category: PropTypes.number.isRequired,
    description: PropTypes.string,
    hostFirstName: PropTypes.string.isRequired,
    hostLastName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    numberOfParticipants: PropTypes.number.isRequired,
    onParticipationChange: PropTypes.func.isRequired,
    participating: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
    categoryIndicator: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 30,
        borderTopWidth: 30,
        borderRightColor: 'transparent',
        transform: [
            {rotate: '90deg'},
        ],
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 20,
    },
    dateAndParticipantsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -20,
    },
    eventDetails: {
        flex: 30,
        flexDirection: 'column',
    },
    hostName: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 22,
        flex: 2,
    },
    locationAndDate: {
        flex: 1,
        flexDirection: 'row',
    },
    locationAndDateContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    locationAndDateText: {
        flex: 5,
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: 'white',
        flex: 15,
    },
    mainInfo: {
        flexDirection: 'row',
        height: height / 5,
    },
    name: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 22,
        flex: 2,
    },
    participationInfoRectangle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height * 0.1,
        width: width * 0.85,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'grey',
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    participationInfoItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    participationInfoContainer: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    secondaryParticipationInfoText: {
        textAlign: 'center',
        fontSize: 16,
    },
});