/**
 * Created by LMA3606 on 16/03/2017.
 */
/**
 * Created by LMA3606 on 16/03/2017.
 */
import React, {Component} from "react";
import {View, StyleSheet, Platform, Dimensions, Image, Text} from "react-native";
import AppText from "./appText";
import colors from './events/colors'

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.topbar}>
                    {/*<Image source={require("../images/Menu-White.png")} style={styles.burgerMenu}/>*/}
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
        height: (1 / 16) * deviceHeight,
        marginTop:(Platform.OS === 'ios') ? 20 : 0,
    },
    burgerMenu: {
        flex:0,
        width: 25,
        height: 25,
        margin:10,
    },
    viseocompanion: {
        textAlign: 'center',
        flex:1,
        fontSize: 20,
        color: 'white',
    },
});