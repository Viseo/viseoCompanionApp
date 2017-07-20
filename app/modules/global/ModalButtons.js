import React, {Component} from "react";
import {Button, View, Dimensions, StyleSheet} from "react-native";

import {Navigation} from "react-native-navigation";

export default class ModalButtons extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="HELLO"/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
    },
    buttonBar: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    container: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "transparent",
        borderRadius: 5,
        padding: 16,
    },

});