/**
 * Created by LMA3606 on 14/02/2017.
 */

/** VISEO COMPANION **/
'use strict';
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    TouchableOpacity,
    ListView,
    Dimensions
} from "react-native";
import setting from "../config/settings";
import CheckBox from 'react-native-check-box';
import Header from './../components/header';
import AppText from '../components/appText';


let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

export default class EventDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statut: '',
        };
    }

    render() {
        return (
            <View>
                <Header/>
                {this.renderEventInfo()}
            </View>
        );
    }

    renderEventInfo() {
        let event = this.props.event;
        return (
            <View style={styles.maincontainer}>
                <View style={styles.container}>
                    <ScrollView
                        contentInset={{top : -50}}
                        style={styles.scrollView}
                    >
                        {this.renderEventName(event.name)}
                        {this.renderEventDate(event.date)}
                        {this.renderEventLocation(event.location)}
                        {this.renderEventKeywords('all keywords here')}
                        {this.renderEventDescription(event.description)}
                        <View style={styles.MapContainer}>
                            <Image source={require('../images/sampleImage.jpg')} style={styles.carte}/>
                        </View>
                    </ScrollView>
                    {this.renderParticipateToEventButton()}
                </View>
            </View>
        );
    }

    renderEventDate(date) {
        return (
            <View style={styles.Rectangle1}>
                <View style={styles.leftRectangle1}>
                    <AppText style={styles.label}> Date </AppText>
                </View>
                <View style={styles.rightRectangle1}>
                    <AppText
                        style={styles.text}> {new Date(date).getDate()}/{addZero(new Date(date).getMonth() + 1)}/{new Date(date).getFullYear()}
                        {" à "} {addZero(new Date(date).getHours())}h{addZero(new Date(date).getMinutes()) + '\n' } </AppText>
                </View>
            </View>
        );
    }

    renderEventDescription(description) {
        return (
            <View style={styles.Rectangle2}>
                <AppText style={styles.label}> Description </AppText>
                <AppText style={styles.textdescription}>{description} </AppText>
            </View>
        );
    }

    renderEventKeywords(keywords) {
        return (
            <View style={styles.Rectangle1}>
                <View style={styles.leftRectangle1}>
                    <AppText style={styles.label}> Mot-clés </AppText>
                </View>
                <View style={styles.rightRectangle1}>
                    <AppText style={styles.text}> {keywords + '\n' } </AppText>
                </View>
            </View>
        );
    }

    renderEventLocation(location) {
        return (
            <View style={styles.Rectangle1}>
                <View style={styles.leftRectangle1}>
                    <AppText style={styles.label}> Lieu </AppText>
                </View>
                <View style={styles.rightRectangle1}>
                    <AppText style={styles.text}> {location + '\n' } </AppText>
                </View>
            </View>
        );
    }

    renderEventName(name) {
        return (
            <View style={styles.Rectangle1}>
                <View style={styles.leftRectangle1}>
                    <AppText style={styles.text_titre}> Titre </AppText>
                </View>
                <View style={styles.rightRectangle1}>
                    <AppText style={styles.text}> {name + '\n' } </AppText>
                </View>
            </View>
        );
    }

    renderParticipateToEventButton() {
        return (
            <View style={styles.bottomRect}>
                <CheckBox
                    style={{flex: 1, padding: 10}}
                    onClick={this.props.onParticipationChange}
                    isChecked={this.props.event.participating}
                    rightText={"Going"}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({

    titre_et_statutContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    titre_et_statut: {
        flexDirection: 'row',
        width: 0.95 * deviceWidth,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center',
    },

    title: {
        color: 'black',
    },

    _statut: {
        color: 'green',
    },

    MapContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0.05 * deviceHeight,
    },

    carte: {
        width: 0.9 * deviceWidth,
        height: 0.4 * deviceHeight,
    },

    map: {
        height: 150,
        margin: 10,
        borderWidth: 1,
        borderColor: '#000000',
    },

    bottomRect: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        height: 0.15 * deviceHeight,
    },


    maincontainer: {
        justifyContent: 'center',
        width: deviceWidth,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    container: {
        width: 0.95 * deviceWidth,
        height: 0.85 * deviceHeight,
        marginTop: 0.01 * deviceHeight,
        backgroundColor: 'white',
        flexDirection: 'column',
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden',
    },

    Rectangle1: {
        width: 0.95 * deviceWidth,
        flexDirection: 'row',
    },

    Rectangle2: {
        width: 0.95 * deviceWidth,
        flexDirection: 'column',
        marginBottom: 0.02 * deviceHeight,
    },

    leftRectangle1: {
        flex: 0.3,
    },

    rightRectangle1: {
        flex: 0.7,
    },

    menu: {
        width: 30,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'flex-start',
        margin: 5,
    },

    menu0: {
        width: 85,
    },

    icon: {
        width: 25,
        height: 25,
        marginLeft: 5,
        marginTop: 5,
    },

    toolbar: {
        backgroundColor: 'white',

    },

    topbar: {
        height: 0.06 * deviceHeight,
        backgroundColor: 'white',
        flexDirection: 'row',
    },

    viseocompanion: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: 'blue',
    },

    text_titre: {
        color: 'black',
        fontSize: 15,
        textAlign: 'left',
        fontWeight:'bold'
    },

    text: {
        color: 'black',
        fontSize: 15,
        textAlign: 'left',
    },
    label: {
        color: 'black',
        fontSize: 15,
        textAlign: 'left',
        fontWeight: 'bold'
    },

    textdescription: {
        color: 'black',
        fontSize: 12,
        textAlign: 'left',
        marginLeft: 0.04 * deviceWidth,
    },

    rtext: {
        flex: 1,
        color: 'black',
        fontSize: 10,
    },

    scrollView: {
        height: deviceHeight,
    },

    details: {
        backgroundColor: 'black',
        height: 200,
        width: 300,
    },

    back: {
        color: 'blue',
    },

    BackButtonContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },

    ok_cross_ButtonContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    okButton: {
        height: 0.08 * deviceHeight,
        width: 0.08 * deviceHeight,
        resizeMode: 'contain',
    },

    crossButton: {
        height: 0.08 * deviceHeight,
        width: 0.08 * deviceHeight,
        resizeMode: 'contain',
        marginLeft: 0.05 * deviceWidth,
    },

    separator: {
        width: 0.03 * deviceWidth,
    },

    BackButton: {
        height: 0.1 * deviceHeight,
        width: 0.15 * deviceWidth,
    }
});
