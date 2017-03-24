/**
 * Created by AAB3605 on 10/03/2017.
 */
import React, {Component} from "react";
import {View, Text, TouchableOpacity, Picker, StyleSheet, AppState, Dimensions, Platform} from "react-native";
import Swipeout from "react-native-swipe-out";
import AppText from "../appText";
import strings from "../../util/localizedStrings";
import Highlighter from "react-native-highlight-words";
import categories from "../../util/eventCategories";

export default class EventCard extends Component {

    static defaultProps = {
        name: '',
        description: '',
        location: '',
        date: '',
        categoryId:'',
        onParticipationChange: () => {
        },
        searchWords: {
            searchString: '',
            properties: []
        }
    }

    constructor(props) {
        super(props);
    }

    getBriefIfTextIsTooLong(text, maxLength) {
        if (text.length > maxLength) {
            text = text.substr(0, maxLength) + '...';
        }
        return text;
    }

    getSearchWords(property) {
        let searchWords = [];
        if (this.props.searchWords.properties.indexOf(property) !== -1)
            searchWords.push(this.props.searchWords.searchString);
        return searchWords;
    }

    getSwipeOption = () => {
        return this.props.participating ?
            [{
                className: 'participate',
                text: strings.IAmNotGoingToEvent,
                onPress: () => {
                    this.props.onParticipationChange()
                },
                backgroundColor: '#ba7a7c',
                color: '#601d20',
            }] :
            [{
                className: 'participate',
                text: strings.IAmGoingToEvent,
                onPress: () => {
                    this.props.onParticipationChange()
                },
                backgroundColor: '#4fba8a',
                color: '#14605a',
            }];
    }

    render() {
        let swipeOption = this.getSwipeOption();
        return (
            <View>
                <Swipeout
                    className="swipeout"
                    style={{ backgroundColor: '#c1c1c1' }}
                    right={swipeOption}
                    autoClose={true}
                >
                    <TouchableOpacity
                        style={styles.card}
                        onPress={this.props.onPress}
                    >
                        {this.renderParticipationIndicator()}
                        {this.renderTypeIndicator()}
                        {this.renderEventInfo()}
                    </TouchableOpacity>
                </Swipeout>
            </View>
        );
    }

    renderTypeIndicator() {
        let eventCategory = categories.eventCategories[this.props.categoryId];
        return (
            <View style={[styles.eventType, {backgroundColor: categories.eventCategoriesColors[eventCategory]}]}/>
        );
    }

    renderParticipationIndicator() {
        return (
            <View style={styles.dotContainer}>
                <View style={[
                    styles.dot,
                    {backgroundColor:(this.props.participating) ? '#4169E1' : 'white'}
                ]}/>
            </View>
        );
    }

    renderEventInfo() {
        return (
            <View style={styles.eventInfo}>
                <View style={styles.firstColumn}>
                    {this.renderTitle()}
                    {this.renderDescription()}
                </View>
                <View style={styles.secondColumn}>
                    {this.renderDateAndLocation()}
                </View>
            </View>
        );
    }

    renderTitle() {
        return (
            <Highlighter
                highlightStyle={{backgroundColor: 'yellow'}}
                style={[styles.eventName, styleFont.textFont]}
                searchWords={this.getSearchWords('name')}
                textToHighlight={this.getBriefIfTextIsTooLong(this.props.name, 31)}
            />
        );
    }

    renderDescription() {
        return (
                <Highlighter
                    highlightStyle={{backgroundColor: 'yellow'}}
                    style={[styles.eventDescription, styleFont.textFont]}
                    searchWords={this.getSearchWords('description')}
                    textToHighlight={this.getBriefIfTextIsTooLong(this.props.description, 100)}
                />
        );
    }

    renderDateAndLocation() {
        return (
            <View style={styles.eventLocation}>
                     <AppText className="info date" style={styles.eventLocationText}>
                         {this.props.date}
                     </AppText>
                     <AppText className="info location" style={styles.eventLocationText}>
                         {this.getBriefIfTextIsTooLong(this.props.location.toUpperCase(),30)}
                     </AppText>
            </View>

        );
    }
}

let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        height: deviceHeight * 0.17,
    },
    dotContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: deviceWidth * 0.005,
        marginRight: deviceWidth * 0.005,
    },
    dot: {
        width: deviceWidth * 0.03,
        height: deviceWidth * 0.03,
        borderRadius: 50,
    },
    eventInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#999999',
        borderTopWidth: 0.5,
        borderTopColor: '#999999',
    },
    firstColumn: {
        flex:3,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    secondColumn: {
        flex: 1,
    },
    eventName: {
        flex: 0,
        paddingBottom: deviceHeight * 0.01,
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: deviceWidth * 0.054,
        color: 'black',
    },
    eventDescription: {
        flex: 3,
        textAlign: 'left',
        fontWeight: '400',
        fontSize: deviceWidth * 0.045,
        color: "#8c8c8c",
        textAlignVertical:'bottom',
    },
    eventLocation: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    eventLocationText: {
        textAlign: 'center',
        fontWeight: '300',
        color: '#2c2c2c',
        fontSize: deviceWidth * 0.035
    },
    eventType: {
        width: 5,
        alignSelf:'stretch',
        backgroundColor: '#ef4954',
    }
});


const styleFont = StyleSheet.create({
    textFont: {
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    }
});
