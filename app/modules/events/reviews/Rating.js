import React, {Component} from 'react';
import CircularSlider from 'react-native-circular-slider';
import {
    View,
    StyleSheet, Button,
} from 'react-native';
import moment from 'moment';
import AppText from '../../global/components/AppText';
import {dismissLightBox} from '../../global/navigationUtil';

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
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                    <AppText style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}> Donnez votre avis</AppText>
                    <AppText style={{marginBottom: 10,alignSelf:"center"}}>{this.props.eventName}</AppText>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    display: 'flex',alignItems:"stretch"
                }}>
                    <View style={{alignSelf:"flex-start",marginRight:150}}><AppText>{this.props.location}</AppText></View>
                    <View style={{alignSelf:"flex-end"}}><AppText>{date} à {time}</AppText></View>

                </View>
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
                            onPress={dismissLightBox}
                        />
                    </View>
                    <View>
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
};

// todo set propTypes

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ede3f2',
        padding: 100,
        alignItems: 'center',
    },
});