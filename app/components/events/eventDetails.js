/**
 * Created by AAB3605 on 20/03/2017.
 */
import React, {Component} from "react";
import {StyleSheet, Image, ScrollView, View, Dimensions, TouchableOpacity} from "react-native";
import Header from "../header";
import AppText from "../appText";
import EventDetailsParticipationInfos from "./eventDetailsParticipationInfos";
import strings from "../../util/localizedStrings";
import * as util from "../../util/util";

let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

const eventIdToImages = {
    "40": require('./../../images/formation_securite.jpg'),
    "0":require('./../../images/0.jpg'),
    "7":require('./../../images/blockchain-iot.jpg'),
    "41":require('./../../images/poker_jeux.jpg'),
    "42":require('./../../images/concert-de-rock.jpg'),
    "39":require('./../../images/coderdojo.jpg'),
    "44":require('./../../images/formationAgile.jpg'),
    "43":require('./../../images/reactive-nativingitup-png-800x600_q96.png'),
    "38":require('./../../images/soiree_nouveaux.jpg'),
    "46":require('./../../images/tdd.png'),
}


export default class EventDetails extends Component {
    static defaultProps = {
        keywords: ["cool", "fun", "awesome"],
        userName: 'Al Inclusive',
    }

    constructor(props) {
        super(props);
        let categoryName = strings.categoriesNames[this.props.event.category];
        let categoryColor = util.getCategoryColor(this.props.event.category);
        this.state = {
            categoryName: categoryName,
            categoryColor: categoryColor
        };
    }

    render() {
        let event = this.props.event;
        return (
            <View style={{flex:1}}>
                <Header/>
                <View style={styles.container}>
                    <View style={{flex:1}}>
                        <View style={{flex:3}}>
                            {this.renderHeader(event)}
                        </View>
                        <View style={{flex:7,flexDirection:'column'}}>
                            <ScrollView
                                style={{
                                    flex:1,
                                }}
                            >
                                {this.renderEventIllustration(event.id)}
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

    renderHeader(event) {
        return (
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={styles.organizatorPicture}>
                    <TouchableOpacity>
                        <Image source={require('./../../images/userAvatar.jpg')} style={styles.organizatorPictureCircle}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <View style={{flexDirection:'row'}}>
                        <AppText style={styles.headerTitle}>
                            {event.name}
                        </AppText>
                        <View style={[styles.headerCategoryTriangle, {borderTopColor:this.state.categoryColor}]}/>
                    </View>
                    <AppText style={[styles.category, {color: this.state.categoryColor}]}>
                        {this.state.categoryName}
                    </AppText>
                    <View style={styles.headerInfoItem}>
                        <Image source={require('./../../images/user.png')}/>
                        <AppText style={{margin: 5}}>
                            {this.props.userName}
                        </AppText>
                    </View>
                    <View style={styles.headerInfoItem}>
                        <Image source={require('./../../images/place.png')}/>
                        <AppText style={{margin: 5}}>
                            {event.location}
                        </AppText>
                    </View>
                </View>
            </View>
        )
    }

    renderEventIllustration(id) {
        let defaultImage = require('./../../images/0.jpg');
        let image = eventIdToImages[id] || defaultImage;
        return (
            <View style={{marginBottom:-20}}>
                <Image
                    source={image}
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
        fontSize: 16,
        textAlign: 'center',
    },

    keywords: {
        fontSize: 14,
        textAlign: 'center',
        flex: 1,
        padding: 20
    },

    headerCategoryTriangle: {
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

    organizatorPictureCircle: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },

    organizatorPicture:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        padding:20,
        alignItems:'center',
    },

    contentContainer: {
        flex:3,
        paddingLeft:20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    headerTitle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 22,
        flex:2
    },

    category: {
        textAlign: 'left',
        flex:3,
        justifyContent:'flex-start',
        paddingTop:5
    },

    headerInfoItem: {
        flex:2,
        flexDirection: 'row',
    }
});