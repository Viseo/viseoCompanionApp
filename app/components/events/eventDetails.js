/**
 * Created by AAB3605 on 20/03/2017.
 */
import React, {Component} from "react";
import {StyleSheet, Image, ScrollView, View, Dimensions, TouchableOpacity} from "react-native";
import Header from "../header";
import AppText from "../appText";
import EventDetailsHeader from "./eventDetailsHeader";
import EventDetailsParticipationInfos from "./eventDetailsParticipationInfos";

let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

export default class EventDetails extends Component {
    static defaultProps = {
        keywords: ["cool", "fun", "awesome"]
    }

    constructor(props) {
        super(props);
    }

    render() {
        let event = this.props.event;
        return (
            <View>
                <Header/>
                <View style={styles.container}>
                    <View style={{flex:1}}>
                        <View style={{flex:1}}>
                            <EventDetailsHeader event={event}/>
                        </View>
                        <View style={{flex:3}}>
                            <ScrollView style={{height: deviceHeight}}>
                                {this.renderEventIllustration()}
                                {this.renderEventParticipationInfos(event)}
                                {this.renderEventDescription(event.description)}
                                {this.renderEventKeywords(this.props.keywords)}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderEventIllustration() {
        return (
            <View style={{flex:2, alignItems:'center', marginBottom:-50}}>
                <Image
                    source={require('./../../images/sampleImage.jpg')}
                    resizeMode='cover'
                />
            </View>
        );
    }

    renderEventParticipationInfos(event) {
        return (
            <View style={{alignItems:'center'}}>
                <EventDetailsParticipationInfos event={event} onPressGoing={this.props.onParticipationChange}/>
            </View>
        );
    }

    renderEventDescription(description) {
        return (
            <AppText style={styles.description}>{description}{description}{description}{description}{description}{description} </AppText>
        );
    }

    renderEventKeywords(keywords) {
        let keywordText = this.formatKeywords(keywords);
        return (
            <AppText style={styles.keywords}>{keywordText}</AppText>
        );
    }

    formatKeywords(keywords) {
        let text = '';
        for (let i = 0; i < keywords.length; i++) {
            text += "#" + keywords[i];
        }
        return text;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: deviceWidth,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        overflow: 'hidden',
        height: 0.85 * deviceHeight,
    },

    illustration: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: -0.04 * deviceHeight
    },

    description: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        flex:1,
        padding:20
    },

    keywords: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        flex:1,
        padding:20
    },
});