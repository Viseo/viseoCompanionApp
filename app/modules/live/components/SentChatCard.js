import React, {Component} from "react";
import AppText from "../../global/components/AppText";
import PropTypes from "prop-types";
import {StyleSheet, View} from "react-native";
import colors from "../../global/colors";
import moment from "moment";

export default class SentChatCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let datetime = this.props.chatData.datetime ?
            moment(this.props.chatData.datetime, "x").format("HH[h]mm") :
            moment().format("HH[h]mm");
        const fullName= this.props.chatData.writer.firstName+' '+this.props.chatData.writer.lastName;
        return (
            <View style={styles.mainContainer}>
                <View style={{flex: 1}}/>
                <AppText style={styles.timeContainer}>{datetime}</AppText>
                <View style={{flex:7,flexDirection:"column"}}>
                <AppText style={{textAlign:"right"}}>
                    {fullName}
                </AppText>
                    <AppText style={styles.textContainer}>
                    {this.props.chatData.message}</AppText>
                </View>
            </View>
        );
    }
};

SentChatCard.propTypes = {
    chatData: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
    },
    textContainer: {
        flex: 1,
        textAlign: "right",
        backgroundColor: colors.green,
        padding: 6,
        margin: 5,
        borderRadius: 5,
        color: "black",
    },
    timeContainer: {
        flex: 1,
        fontSize: 10,
    },
});