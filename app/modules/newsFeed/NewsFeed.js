import React, {Component} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import AppText from '../global/components/AppText';
import colors from '../global/colors';
import UserAvatar from 'react-native-user-avatar';
import Svg, {Defs, G, Image, LinearGradient, Rect, Stop, Text} from 'react-native-svg';
import {defaultNavBarStyle} from '../global/navigatorStyle';

const {height, width} = Dimensions.get('window');

class NewsFeed extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    _showNotationPopup = () => {
        let {events} = this.props;
        if (events && events.length > 0) {
            let [day, time] = this._formatDate(events[0].datetime);
            const date = day + ' à ' + time;
            this.props.navigator.showLightBox({
                screen: 'notation.popup',
                title: 'Multi popup',
                style: {
                    backgroundBlur: 'dark',
                    backgroundColor: '#135caa70',
                },
                passProps: {
                    eventName: events[0].name,
                    location: events[0].location,
                    date: date,
                    eventId: events[0].id,
                    userId: this.props.user.id,
                },
            });
        }
    };

    _formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split('/');
    }

    render() {
        // todo take care of this buggy and ugly popup
        // let notationPopup = this.props.isReviewPopupDismissed ? null : this._showNotationPopup();
        const notationPopup = null;
        return (
            <View style={{backgroundColor: colors.lightGray, height: height, width: width}}>
                {this._renderHeadband()}
                {this._renderProfile()}
                {this._renderAvatar()}
                {this._renderVizzBand()}
                {this._renderLiveBand()}
                {this._renderLiveCard()}
            </View>
        );
    }

    onNavigatorEvent(event) {
        if (event.id === 'Notifications') {
            this._goToNotifications();
        }
    }

    _goToNotifications() {
        this.props.navigator.push({
            screen: 'Notifications',
            title: 'Notifications',
        });
    }

    _renderHeadband() {
        return (
            <Svg width="550" height="150">
                <Image width="550" height="150" href={require('../../images/NIVEAUX_BANDEAU_1.jpg')}/>
            </Svg>
        );
    }

    _renderProfile() {
        return (
            <View style={styles.profileContainer}>
                <AppText style={{alignSelf: 'center', marginBottom: 30, color: '#000000', fontSize: 22}}>
                    {this.props.user.firstName + ' ' + this.props.user.lastName}
                </AppText>
                {this._renderProfileButton()}
            </View>
        );
    }

    _renderAvatar() {
        const imageUrl = this.props.user.imageUrl;
        return (
            imageUrl ?
                <TouchableOpacity
                    style={styles.userAvatar}
                    onPress={() => {
                        this.props.navigator.push({
                            screen: 'user.myProfile',
                            title: 'Mon profil',
                            navigatorStyle: defaultNavBarStyle,
                            passProps: {
                                user: this.props.user,
                            },
                        });
                    }}

                >
                    <UserAvatar size="100" name="AvatarImage" src={imageUrl}/>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.userAvatar}
                    onPress={() => {
                        this.props.navigator.push({
                            screen: 'user.myProfile',
                            title: 'Mon profil',
                            navigatorStyle: defaultNavBarStyle,
                            passProps: {
                                user: this.props.user,
                            },
                        });
                    }}
                >
                    <UserAvatar
                        size="100"
                        color={colors.avatarGray}
                        name={this.props.user.firstName.toUpperCase() + ' ' + this.props.user.lastName.toUpperCase()}
                        navigator={navigator}
                    />
                </TouchableOpacity>
        );
    }

    _renderLiveBand() {
        return (
            <View style={styles.liveBand}>
                <AppText style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: colors.red,
                    marginLeft: 15,
                    marginTop: 10,
                    marginBottom: 10,
                }}>
                    En direct
                </AppText>
                <View style={{backgroundColor: colors.red, height: 5}}/>
            </View>
        );
    }

    _renderVizzBand() {
        return (
            <Svg height="50"
                 width={width - 40}
                 style={{alignSelf: 'center', marginTop: -120}}>
                <G>
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2={width} y2="0">
                            <Stop offset="0" stopColor="#621792" stopOpacity="1"/>
                            <Stop offset="1" stopColor="#ed6744" stopOpacity="1"/>
                        </LinearGradient>
                    </Defs>
                    <Rect x="0" y="0" height="50" width={width} fill="url(#grad)"/>
                    <Text fontFamily="Times New Roman" fontWeight="bold" fontSize="20"
                          x="20" y="12" fill="#FFFFFF">
                        Solde
                    </Text>
                    <Text fontFamily="Times New Roman" fontWeight="bold" fontSize="20"
                          x="270" y="12" fill="#FFFFFF">
                        98O
                    </Text>
                    <Image width="150" height="50" x="285" href={require('../../images/events/vizz_logo.png')}/>
                </G>
            </Svg>
        );
    }

    _renderProfileButton() {

        return (
            <Svg height="40"
                 width="200"
                 style={{alignSelf: 'center'}}>
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="200" y2="0">
                        <Stop offset="0" stopColor="#ee6744" stopOpacity="1"/>
                        <Stop offset="1" stopColor="#f5a442" stopOpacity="1"/>
                    </LinearGradient>
                </Defs>
                <Rect x="0" y="0" rx="8" ry="8" height="40" width="200" fill="url(#grad)"
                      onPress={() => {
                          this.props.navigator.push({
                              screen: 'user.myProfile',
                              title: 'Mon profil',
                              navigatorStyle: defaultNavBarStyle,
                              passProps: {
                                  user: this.props.user,

                              },
                          });
                      }}
                />
                <Text fontSize="15" x="40" y="10" fill="#FFFFFF">VOIR MON PROFIL</Text>

            </Svg>
        );
    }

    _renderLiveCard() {
        return (
            <View>
                <AppText
                    style={{
                        textAlign: 'center',
                        color: colors.mediumGray,
                        backgroundColor: 'white',
                        height: 50,
                        borderRadius: 4,
                        textAlignVertical: 'center',
                        fontSize: 18,
                        margin: 20,
                    }}
                >
                    Aucun évènement.
                </AppText>
            </View>
        );
    }
}

NewsFeed.propTypes = {
    navigator: PropTypes.object.isRequired,
};

NewsFeed.navigatorButtons = {
    rightButtons: [
        {
            icon: require('../../images/navigation/notifications.png'),
            id: 'Notifications',
        },
    ],
};

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'column',
        padding: 50,
        marginTop: -50,
        marginRight: 20,
        marginLeft: 20,
        backgroundColor: colors.white,
        alignContent: 'center',
    },
    userAvatar: {
        alignSelf: 'center',
        top: -250,
    },
    liveBand: {
        backgroundColor: colors.white,
        alignContent: 'center',
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
    },
});

const getToReviewEvents = (events, eventsReviewed, user) => {

    if (events && eventsReviewed) {
        let eventsByUser = events.filter((event) => {
            const filter = event.participants.filter((e) => {
                return e.id === user.id;
            });
            return filter.length > 0;
        });

        if (eventsByUser.length > 0 && eventsReviewed.length > 0) {
            let notReviewedEvents = eventsByUser.filter((item) => {
                return !JSON.stringify(eventsReviewed).includes(JSON.stringify(item));
            });
            return notReviewedEvents;
        }
        else {
            return eventsByUser;
        }
    }
    return null;
};

const mapStateToProps = ({events, user, review}) => ({
    events: getToReviewEvents(
        events.itemsExpired,
        events.itemsReviewed,
        user,
    ),
    user,
    isReviewPopupDismissed: review.isReviewPopupDismissed,
});

export default connect(
    mapStateToProps,
)(NewsFeed);
