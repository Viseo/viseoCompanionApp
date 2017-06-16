/**
 * Created by HEL3666 on 15/06/2017.
 */
import React, {Component} from 'react';
import CircularSlider from 'react-native-circular-slider';
import {
    View,
    StyleSheet,
} from 'react-native';
import AppText from '../global/AppText';
import moment from 'moment';

export default class NotationVote extends Component {
    state = {
        modalVisible: false,
        startAngle: '',
        angleLength: '',

    };

    render() {
        let [date,time] = this.formatDate(this.props.date);
        return (


            <View style={styles.container}>
                <AppText>{this.props.eventName}</AppText>
                <AppText>{this.props.location}</AppText>
                <AppText>{date} à {time}</AppText>
                <AppText style={{top:110,fontWeight:'bold',fontSize:24}}>{Math.round((this.state.angleLength*100)/(2*Math.PI))} %</AppText>
                <CircularSlider
                    startAngle={this.state.startAngle}
                    segments={5}
                    strokeWidth = { 20 }
                    radius = { 80 }
                    gradientColorFrom = "#FF0000"
                    gradientColorTo = "#FF9E13"
                    angleLength={this.state.angleLength}
                    onUpdate={({startAngle, angleLength}) => this.setState({
                        startAngle: this.state.startAngle,
                        angleLength,
                    })}
                    bgCircleColor="#ffffff"
                />

            </View>
        );
    }

    formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split('/');
    }
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ede3f2',
        padding: 100,
    },

});