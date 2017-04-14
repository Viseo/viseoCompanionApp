import React, {Component} from "react";
import {View, StyleSheet, Platform, Dimensions, Image, Text} from "react-native";
import AppText from "./appText";
import colors from './colors'
import ItemSpacer from './ItemSpacer'

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

export default Header;

var {
    height: deviceHeight,
} = Dimensions.get('window');

const styles = StyleSheet.create({
    topbar: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    viseocompanion: {
        textAlign: 'center',
        flex: 1,
        fontSize: 20,
        color: 'white',
    },
});