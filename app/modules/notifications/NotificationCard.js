import React, {Component} from "react";
import {Dimensions, Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import colors from "../../modules/global/colors";
import AppText from "../global/components/AppText";
import Icon from "react-native-vector-icons/FontAwesome";

export default class NotificationCard extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={styles.card}
                >
                    {this.renderEventInfo()}
                </TouchableOpacity>
            </View>
        );
    }

    renderEventInfo() {
        return (
            <View style={styles.eventInfo}>

                <View style={styles.firstRow}>
                    {this.renderTitle()}
                    {this.renderDate()}
                </View>
                <View style={styles.secondRow}>
                    {this.renderLocation()}
                </View>
                <View style={{alignItems: "center"}}>
                    <Icon.Button
                        name="star"
                        backgroundColor="#3b5998"
                        onPress={this._showNotationPopup}>
                        Note
                    </Icon.Button>

                </View>
            </View>
        );
    }

    renderTitle() {
        return (
            <View style={styles.name}>
                <AppText>{this.props.name}</AppText>
            </View>
        );
    }

    renderDate() {
        return (
            <View style={styles.date}>
                <AppText>{this.props.day}</AppText>
            </View>
        );
    }

    renderLocation() {
        return (
            <View style={styles.location}>
                <View style={{flex: 3}}>
                    <AppText>{this.props.location}</AppText>
                </View>
                <View style={{flex: 1}}>
                    <AppText>à {this.props.time}</AppText>
                </View>
            </View>
        );
    }

    _showNotationPopup=()=> {
       const date=this.props.day+ " à "+this.props.time;
        this.props.navigator.showLightBox({
            screen: "notation.popup",
            title: "Multi popup",
            style: {
                backgroundBlur: "dark",
                backgroundColor: "#135caa70",
            },
            passProps: {
                eventName: this.props.name,
                location: this.props.location,
                date:date,
                eventId:this.props.eventId,
                userId:this.props.userId,
                navigator: this.props.navigator,
            },
        });
    }
};

let {
    height: deviceHeight,
    width: deviceWidth,
} = Dimensions.get("window");

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "white",
        height: 100,
        borderBottomWidth: 0.5,
        borderColor: colors.blue,
        marginTop: 10,
    },
    eventInfo: {
        flex: 100,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingLeft: 10,

    },
    firstRow: {
        flex: 3,
        flexDirection: "row",
        paddingRight: 10,
    },
    secondRow: {
        flex: 6,
        flexDirection: "column",
        paddingRight: 10,
    },
    name: {
        flex: 6,
        justifyContent: "flex-end",
    },
    nameText: {
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 16,
        color: "black",
    },
    date: {
        flex: 3,
        justifyContent: "flex-end",
    },
    dateText: {
        textAlign: "right",
        fontWeight: "100",
        color: colors.mediumGray,
        fontSize: 14,
    },
    description: {
        flex: 1,
        justifyContent: "center",
        paddingRight: 5,
    },
    descriptionText: {
        textAlign: "left",
        fontWeight: "100",
        fontSize: 14,
        overflow: "hidden",
        color: colors.mediumGray,
    },
    location: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    locationText: {
        textAlign: "left",
        fontWeight: "300",
        color: "#8c8c8c",
        fontSize: 14,
    },
    dotContainer: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    firstColumn: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    secondColumn: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
    },
    eventType: {
        width: 3,
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: "#ef4954",
    },

    highlightStyle: {
        backgroundColor: colors.highlight,
    },
});

const styleFont = StyleSheet.create({
    textFont: {
        fontFamily: (Platform.OS === "ios") ? "Avenir" : "Roboto",
    },
});

