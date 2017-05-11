/**
 * Created by HEL3666 on 11/05/2017.
 */

import React, {Component} from "react";
import {View, Text, TouchableOpacity, Picker, StyleSheet, AppState, Dimensions, Platform, Image} from "react-native";
import Swipeout from "react-native-swipe-out";
import strings from "../../util/localizedStrings";
import Highlighter from "react-native-highlight-words";
import * as util from "../../util/util";
import colors from "../colors";

export default class EventCardExp extends Component {
    static defaultProps = {
        name: '',
        description: '',
        location: '',
        date: '',
        categoryId: '',
        onParticipationChange: () => {
        },
    }

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <View>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={this.props.onPress}
                    >
                        {this.renderParticipationIndicator()}
                        {this.renderTypeIndicator()}
                        {this.renderEventInfo()}
                    </TouchableOpacity>

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
                    {backgroundColor:(this.props.participating) ? colors.blueLight : 'white'}
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
                    searchWords={this.props.searchWords}
                    textToHighlight={this.props.name || ''}
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
                    searchWords={this.props.searchWords}
                    textToHighlight={this.props.description || ''}
                />
            </View>
        );
    }

    renderDate() {
        return (
            <View style={styles.date}>
                <Highlighter
                    numberOfLines={1}
                    highlightStyle={styles.highlightStyle}
                    style={[styles.dateText, styleFont.textFont]}
                    searchWords={this.props.searchWords}
                    textToHighlight={this.props.day || ''}
                />
            </View>
        );
    }

    renderLocation() {
        return (
            <View style={styles.location}>
                <View style={{flex:3}}>
                    <Highlighter
                        numberOfLines={1}
                        highlightStyle={styles.highlightStyle}
                        style={[
                            styles.locationText,
                            styleFont.textFont,
                        ]}
                        searchWords={this.props.searchWords}
                        textToHighlight={this.props.location || ''}
                    />
                </View>
                <View style={{flex:1}}>
                    <Highlighter
                        numberOfLines={1}
                        highlightStyle={styles.highlightStyle}
                        style={[
                            styles.dateText,
                            styleFont.textFont,
                        ]}
                        searchWords={this.props.searchWords}
                        textToHighlight={this.props.time || ''}
                    />
                </View>
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
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        height: 100,
        borderBottomWidth: 0.5,
        borderColor: colors.blue,
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
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
