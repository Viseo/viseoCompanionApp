import React, {Component} from 'react';
import CircularSlider from 'react-native-circular-slider';
import {
    View,
    StyleSheet, Button,
} from 'react-native';
import AppText from '../global/components/AppText';
import moment from 'moment';

export default class NotationVote extends Component {
    state = {
        modalVisible: false,
        startAngle: '',
        angleLength: '',
        notation: 0,

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
                }}>{this.state.notation} %</AppText>
                <CircularSlider
                    startAngle={this.state.startAngle}
                    segments={5}
                    strokeWidth={ 20 }
                    radius={ 80 }
                    gradientColorFrom="#FF0000"
                    gradientColorTo="#FF9E13"
                    angleLength={this.state.angleLength}
                    onUpdate={({startAngle, angleLength}) => this.setState({
                        startAngle: this.state.startAngle,
                        angleLength,
                        notation: Math.round((angleLength * 100) / (2 * Math.PI)),

                    })}
                    bgCircleColor="#ffffff"
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between', marginTop: 10,
                }}>
                    <Button title="Plus tard"/>
                    <Button title="Envoyer" style={{marginRight: 10, backgroundColor: '#C41F06'}}
                    onPress={() => {this.redirect();}}/>

                </View>
            </View>

        );
    }

    redirect() {
        if (this.state.notation <= 50) {
            this.props.navigator.dismissLightBox({
                animationType: 'slide-down'
            });
            this.props.navigator.showLightBox({
                screen: 'notation.NotationReview',
                title: 'Avis',
                animationType: 'slide-up',
            });
        }
        else {
            this.props.navigator.dismissLightBox({
                animationType: 'slide-down'
            });
            this.props.navigator.showLightBox({
                screen: 'notation.NotationThanks',
                title: 'Merci',
                passProps: {textContent:"Merci de nous aider à nous améliorer !",emotion:"happy"},
                animationType: 'slide-up',
            });
        }
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
        backgroundColor: '#ede3f2',
        padding: 100,
        alignItems: 'center',
    },
});