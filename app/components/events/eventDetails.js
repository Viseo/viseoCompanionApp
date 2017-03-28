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
            <View style={{flex:1}}>
                <Header/>
                <View style={styles.container}>
                    <View style={{flex:1}}>
                        <View style={{flex:1, paddingBottom:10}}>
                            <EventDetailsHeader event={event}/>
                        </View>
                        <View style={{flex:4,flexDirection:'column'}}>
                            <ScrollView
                                style={{
                                    flex:1,
                                }}
                            >
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
            <View style={{marginBottom:-20}}>
                <Image
                    source={require('./../../images/sampleImage.jpg')}
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

    renderEventParticipationInfos(event) {
        return (
            <View style={{alignItems:'center'}}>
                <EventDetailsParticipationInfos event={event} onPressGoing={this.props.onParticipationChange}/>
            </View>
        );
    }

    renderEventDescription(description) {
        return (
            <View style={{padding:20}}>
                <AppText style={styles.description}>{description} </AppText>
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
}

const styles = StyleSheet.create({
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
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },

    keywords: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        flex: 1,
        padding: 20
    },
});