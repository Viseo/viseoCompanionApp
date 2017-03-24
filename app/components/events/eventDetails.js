/**
 * Created by AAB3605 on 20/03/2017.
 */
import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    ScrollView,
    View,
    Dimensions
} from "react-native";

import Header from '../header';
import AppText from '../appText';
import EventDetailsHeader from './eventDetailsHeader';
import EventDetailsParticipationInfos from './eventDetailsParticipationInfos';

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
                    {this.renderEventHeader(event)}
                    <ScrollView
                        contentInset={{top : -50}}
                        style={{height: deviceHeight}}>
                        {this.renderEventIllustration()}
                        {this.renderEventParticipationInfos(event)}
                        {this.renderEventDescription(event.description)}
                        {this.renderEventKeywords(this.props.keywords)}
                    </ScrollView>
                </View>
            </View>
        );
    }


    renderEventHeader(event) {
        return (
            <View style={{width: deviceWidth}} >
                <EventDetailsHeader event={event}/>
            </View>
        );
    }

    renderEventIllustration() {
        return (
            <Image source={require('./../../images/sampleImage.jpg')} style={styles.illustration}/>
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
            <AppText style={styles.description}>{description} </AppText>
        );
    }

    renderEventKeywords(keywords) {
        let keywordText = this.formatKeywords(keywords);
        return (
            <AppText style={styles.keywords}>{keywordText}</AppText>
        );
    }

    formatKeywords(keywords){
        let text = '';
        for(let i=0; i < keywords.length; i++){
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
        width: deviceWidth,
        height: 0.3 * deviceHeight,
        marginBottom: -0.04 * deviceHeight
    },

    description: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 0.04 * deviceWidth,
        marginLeft: 0.04 * deviceWidth,
    },

    keywords: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 0.04 * deviceWidth,
        marginLeft: 0.04 * deviceWidth,
    },
});