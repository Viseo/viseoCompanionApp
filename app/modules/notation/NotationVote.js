import React, {Component} from 'react';
import CircularSlider from 'react-native-circular-slider';
import {
    View,
    StyleSheet, Button,
} from 'react-native';
import AppText from '../global/components/AppText';
import moment from 'moment';
import * as db from "../global/db"
import {Navigation} from 'react-native-navigation';

export default class NotationVote extends Component {
    state = {
        modalVisible: false,
        startAngle: 0,
        angleLength: 0,
        note: 0,
        notation: {},
        color: '#ffffff'

    };

    render() {
        let [date, time] = this.formatDate(this.props.date);

        return (

            <View style={styles.container}>
                <AppText>{this.props.eventName}</AppText>
                <AppText>{this.props.location}</AppText>
                <AppText>{date} à {time}</AppText>
                <AppText style={{
                    top: 110,
                    fontWeight: 'bold',
                    fontSize: 24,
                }}>{this.state.note} %</AppText>
                <CircularSlider
                    startAngle={this.state.startAngle}
                    segments={2}
                    strokeWidth={ 20 }
                    radius={ 80 }
                    gradientColorFrom={this.state.color}
                    gradientColorTo={this.state.color}
                    angleLength={this.state.angleLength}
                    onUpdate={({startAngle, angleLength}) => this.setState({
                        startAngle: this.state.startAngle,
                        angleLength,
                        note: Math.round((angleLength * 100) / (2 * Math.PI)),
                        color: this.getColor(this.state.note)
                    })}
                    bgCircleColor="#ffffff"
                />
                <View style={{
                    flexDirection: 'row', marginTop: 10,
                    justifyContent: "space-between",
                    display: 'flex'
                }}>
                    <View>
                        <Button
                            title="Plus tard"
                            onPress={() => {}}
                        />
                    </View>
                    <View style={{marginLeft: 100}}>
                        <Button title="Envoyer" style={{ backgroundColor: '#C41F06'}}
                                onPress={async () => {
                                    let notationObj = {
                                        userId: "1",
                                        eventId: "2",
                                        notation: this.state.note,
                                        avis: "",
                                    }
                                    const notation = await db.sendNotation(notationObj);
                                    this.setState({notation});
                                    this.redirect(notation);
                                }}
                        />
                    </View>
                </View>
            </View>

        );
    }

    percentageToHsl(percentage, hue0, hue1) {
        var hue = (percentage * (hue1 - hue0)) + hue0;
        return hue;
    }

    getColor(val) {
        let hsl = require('hsl-to-hex')
        let hue = this.percentageToHsl(val / 100, 0, 120)
        let saturation = 100
        var luminosity = 50
        return hsl(hue, saturation, luminosity)
    }

    redirect(notation) {
        const note = notation.notation;
        if (note <= 50) {
            Navigation.dismissLightBox({
                animationType: 'slide-down'
            });
            Navigation.showLightBox({
                screen: 'notation.NotationRemark',
                title: 'Avis',
                animationType: 'slide-up',
                passProps: {
                    notation: notation,
                }
            });
        }
        else {
            Navigation.dismissLightBox({
                animationType: 'slide-down'
            });
            Navigation.showLightBox({
                screen: 'notation.NotationThanks',
                title: 'Merci',
                passProps: {
                    textContent: "Merci de nous aider à nous améliorer !",
                    emotion: "happy"
                },
                animationType: 'slide-up',
            });
        }
    }

    formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split('/');
    }a
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ede3f2',
        padding: 100,
        alignItems: 'center',
    },
});