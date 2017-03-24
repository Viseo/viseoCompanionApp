/**
 * Created by LMA3606 on 16/03/2017.
 */
/**
 * Created by LMA3606 on 16/03/2017.
 */
import React, {Component} from "react";
import {View, StyleSheet, Platform, Dimensions, Image, Text} from "react-native";
import AppText from "./appText";

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.topbar}>
                {/*<View style={styles.titleContainer}>*/}
                    <Image source={require("../images/Menu-White.png")} style={styles.burgerMenu}/>
                    <AppText style={styles.viseocompanion}>VISEO COMPANION</AppText>
                {/*</View>*/}
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
        alignItems: 'center',
        flexDirection: 'row',
        height: (1 / 16) * deviceHeight,
        backgroundColor: 'royalblue',
        marginTop:(Platform.OS === 'ios') ? 20 : 0,
    },
    burgerMenu: {
        position: 'absolute',
        //top:0,
        bottom:0,
        width: 25,
        height: 25,
        margin:10,
    },
    titleContainer:{
        flexDirection: 'row',
    },
    viseocompanion: {
        textAlign: 'center',
        flex:1,
        fontSize: 20,
        color: 'white',
    },
});