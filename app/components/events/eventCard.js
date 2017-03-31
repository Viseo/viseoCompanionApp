/**
 * Created by AAB3605 on 10/03/2017.
 */
import React, {Component} from "react";
import {View, Text, TouchableOpacity, Picker, StyleSheet, AppState, Dimensions, Platform, Image} from "react-native";
import Swipeout from "react-native-swipe-out";
import AppText from "../appText";
import strings from "../../util/localizedStrings";
import Highlighter from "react-native-highlight-words";
import * as util from "../../util/util";
import colors from "./colors";

export default class EventCard extends Component {

    static defaultProps = {
        name: '',
        description: '',
        location: '',
        date: '',
        categoryId: '',
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

    getSearchWords(property) {
        let searchWords = [];
        if (this.props.searchWords.properties.indexOf(property) !== -1)
            searchWords.push(this.props.searchWords.searchString);
        return searchWords;
    }

    getSwipeOption = () => {
        let textOption = this.props.participating ? strings.IAmNotGoingToEvent : strings.IAmGoingToEvent;
        let icon = this.props.participating ? require("../../images/crossWhite.png") : require("../../images/checkWhite.png");
        return [{
            component: <View className="participate" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={icon} style={{ width: 33, height: 33}}/>
                <Text style={{color:'white', fontSize:14}}>
                    {textOption}
                </Text>
            </View>,
            onPress: () => {
                this.props.onParticipationChange()
            },
            backgroundColor: this.props.participating ? '#ff6d6d' : colors.blue,
            color: 'white'
        }];
    };

    render() {
        let swipeOption = this.getSwipeOption();
        return (
            <View>
                <Swipeout
                    className="swipeout"
                    style={{ backgroundColor: 'white' }}
                    left={swipeOption}
                    right={swipeOption}
                    autoClose={true}
                    overflow="hidden"
                    sensitivity={2}
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

    renderSpacer() {
        return (
            <View
                style={{
                    flex:1,
                    alignSelf:'stretch'
                }}
            >
            </View>
        );
    }

    renderTypeIndicator() {
        return (
            <View style={[styles.eventType, {backgroundColor: util.getCategoryColor(this.props.categoryId)}]}/>
        );
    }

    renderParticipationIndicator() {
        return (
            <View style={styles.dotContainer}>
                <View style={[
                    styles.dot,
                    {backgroundColor:(this.props.participating) ? colors.blue : 'white'}
                ]}/>
            </View>
        );
    }

    renderEventInfo() {
        return (
            <View style={styles.eventInfo}>
                {this.renderSpacer()}
                <View style={styles.firstRow}>
                    {this.renderTitle()}
                    {this.renderDate()}
                </View>
                <View style={styles.secondRow}>
                    {this.renderLocation()}
                    {this.renderDescription()}
                </View>
                {this.renderSpacer()}
            </View>
        );
    }

    renderTitle() {
        return (
            <View style={styles.name}>
                <Highlighter
                    highlightStyle={styles.highlightStyle}
                    style={[styles.nameText, styleFont.textFont]}
                    searchWords={this.getSearchWords('name')}
                    textToHighlight={this.props.name}
                />
            </View>
        );
    }

    renderDescription() {
        return (
            <View style={styles.description}>
                <Highlighter
                    numberOfLines={1}
                    highlightStyle={styles.highlightStyle}
                    style={[styles.descriptionText, styleFont.textFont]}
                    searchWords={this.getSearchWords('description')}
                    textToHighlight={this.props.description}
                />
            </View>
        );
    }

    renderDate() {
        let formattedDate = this.props.day + ' ' + this.props.time;
        return (
            <View style={styles.date}>
                <Highlighter
                    numberOfLines={1}
                    highlightStyle={styles.highlightStyle}
                    style={[styles.dateText, styleFont.textFont]}
                    searchWords={this.getSearchWords('date')}
                    textToHighlight={formattedDate}
                />
            </View>
        );
    }

    renderLocation() {
        return (
            <View style={styles.location}>
                <AppText className="info location" style={styles.locationText}>
                    {this.props.location}
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
        height: 100,
        borderBottomWidth: 0.5,
        borderColor: 'lightgray',
    },
    eventInfo: {
        flex: 100,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 10
        // borderBottomWidth: 0.5,
        // borderBottomColor: '#999999',
        // borderTopWidth: 0.5,
        // borderTopColor: '#999999',
    },
    firstRow: {
        flex: 3,
        flexDirection: 'row',
        paddingRight: 10
    },
    secondRow: {
        flex: 6,
        flexDirection: 'column',
        paddingRight: 10
    },
    name: {
        flex: 6,
        justifyContent: 'flex-end',
    },
    nameText: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 16,
        color: 'black',
    },
    date: {
        flex: 3,
        justifyContent: 'flex-end',
    },
    dateText: {
        textAlign: 'right',
        fontWeight: '100',
        color: colors.mediumGray,
        fontSize: 14
    },
    description: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 5,
    },
    descriptionText: {
        textAlign: 'left',
        fontWeight: '100',
        fontSize: 14,
        overflow: 'hidden',
        // fontSize: deviceWidth * 0.045,
        color: colors.mediumGray,
        // textAlignVertical: 'bottom',
    },
    location: {
        flex: 1,
        justifyContent: 'space-around',
    },
    locationText: {
        textAlign: 'left',
        fontWeight: '300',
        color: '#8c8c8c',
        fontSize: 14
    },
    dotContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    firstColumn: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    secondColumn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    eventType: {
        width: 3,
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#ef4954',
    },

    highlightStyle: {
        backgroundColor: colors.highlight
    }
});


const styleFont = StyleSheet.create({
    textFont: {
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    }
});
