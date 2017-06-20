import React, {Component} from 'react';
import CircularSlider from 'react-native-circular-slider';
import {
    View,
    StyleSheet, Button,
} from 'react-native';
import moment from 'moment';
import {Navigation} from 'react-native-navigation';
import AppText from '../../global/components/AppText';

export default class Rating extends Component {

    state = {
        startAngle: 0,
        angleLength: 0,
        rating: 0,
        notation: {},
        color: '#ffffff',
    };

    render() {
        const [date, time] = this._formatDate(this.props.date);
        return (
            <View style={styles.container}>
                <AppText>{this.props.eventName}</AppText>
                <AppText>{this.props.location}</AppText>
                <AppText>{date} à {time}</AppText>
                <AppText style={{
                    top: 110,
                    fontWeight: 'bold',
                    fontSize: 24,
                }}>
                    {this.state.rating} %
                </AppText>
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
                        rating: Math.round((angleLength * 100) / (2 * Math.PI)),
                        color: this._getColor(this.state.rating),
                    })}
                    bgCircleColor="#ffffff"
                />
                <View style={{
                    flexDirection: 'row', marginTop: 10,
                    justifyContent: 'space-between',
                    display: 'flex',
                }}>
                    <View>
                        <Button
                            title="Plus tard"
                            onPress={() => {
                            }}
                        />
                    </View>
                    <View style={{marginLeft: 100}}>
                        <Button
                            title="Envoyer"
                            style={{backgroundColor: '#C41F06'}}
                            onPress={() => this.props.sendReview(this.state.rating)}
                        />
                    </View>
                </View>
            </View>

        );
    }

    _formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split('/');
    }

    _getColor(val) {
        let hsl = require('hsl-to-hex');
        let hue = this._percentageToHsl(val / 100, 0, 120);
        let saturation = 100;
        let luminosity = 50;
        return hsl(hue, saturation, luminosity);
    }

    _percentageToHsl(percentage, hue0, hue1) {
        const hue = (percentage * (hue1 - hue0)) + hue0;
        return hue;
    }

    redirect(notation) {
        const note = notation.notation;
        if (true) {
            this.props.showNotationRemarkPopup(notation);
        }
        else {
            dismissLightBox();
            Navigation.showLightBox({
                screen: 'notation.NotationThanks',
                title: 'Merci',
                passProps: {
                    textContent: 'Merci de nous aider à nous améliorer !',
                    emotion: 'happy',
                },
                animationType: 'slide-up',
            });
        }
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ede3f2',
        padding: 100,
        alignItems: 'center',
    },
});