import React, {Component} from "react";
import {View, StyleSheet, Platform, Dimensions, Image, Text} from "react-native";
import AppText from "./appText";

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.topbar}>
                <AppText style={styles.viseocompanion}>VISEO COMPANION</AppText>
            </View>
        );
    }
}

Header.displayName = 'Header'

export default Header;

var {
    height: deviceHeight,
} = Dimensions.get('window');

const styles = StyleSheet.create({
    topbar: {
        flex: 0,
        height: 25,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    viseocompanion: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
    },
});