import React, {Component} from 'react';
import CircularSlider from 'react-native-circular-slider';
import {Button, StyleSheet, View} from 'react-native';
import moment from 'moment';
import AppText from '../../global/components/AppText';
import {dismissLightBox} from '../../global/navigationUtil';
import {Circle} from 'react-native-svg';
import {dismissReviewPopup} from './review.action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Rating extends Component {

    defaultRating = 50;
    defaultRatingAngle = this.defaultRating * 2 * Math.PI / 100;
    state = {
        startAngle: 0,
        angleLength: this.defaultRatingAngle,
        rating: this.defaultRating,
        notation: {},
        color: this._getColor(this.defaultRating),
    };

    render() {

        return (
            <View style={styles.container}>
                <View style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}>
                    <AppText style={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}> Donnez votre avis</AppText>
                    <AppText style={{marginBottom: 10, alignSelf: "center"}}>{this.props.eventName}</AppText>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    display: "flex", alignItems: "stretch",
                }}>
                    <View style={{
                        alignSelf: "flex-start",
                    }}>
                        <AppText>{this.props.location + ' '}</AppText>
                    </View>
                    <View style={{alignSelf: "flex-end"}}><AppText>{this.props.date}</AppText></View>

                </View>
                <AppText style={{
                    top: 110,
                    fontWeight: "bold",
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
                    startIcon={
                        <Circle
                            r={10}
                            fill={this._getColor(this.state.rating)}
                            stroke={this._getColor(this.state.rating)}
                            strokeWidth="0"
                        />
                    }
                    stopIcon={
                        <Circle
                            r={10}
                            fill={"transparent"}
                            stroke={"gray"}
                            strokeWidth="2"
                        />
                    }
                />
                <View style={{
                    flexDirection: "row", marginTop: 10,
                    justifyContent: "space-between",
                    display: "flex",
                }}>
                    <Button
                        title="Plus tard"
                        onPress={() => {
                            this.props.dismissReviewPopup();
                            dismissLightBox();

                        }
                        }
                    />
                    <View style={{width: 100}}/>
                    <Button
                        title="Envoyer"
                        style={{backgroundColor: "#C41F06"}}
                        onPress={() => this.props.sendReview(this.state.rating)}
                    />
                </View>
            </View>

        );
    }

    _formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split("/");
    }

    _getColor(val) {
        let hsl = require("hsl-to-hex");
        let hue = this._percentageToHsl(val / 100, 0, 120);
        let saturation = 100;
        let luminosity = 50;
        return hsl(hue, saturation, luminosity);
    }

    _percentageToHsl(percentage, hue0, hue1) {
        const hue = (percentage * (hue1 - hue0)) + hue0;
        return hue;
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        dismissReviewPopup,
    }, dispatch);
};

export  default connect(
    null,
    mapDispatchToProps,
)(Rating);

// todo set propTypes

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ede3f2",
        padding: 100,
        alignItems: "center",
    },
});