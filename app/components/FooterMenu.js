/**
 * Created by VBO3596 on 25/04/2017.
 */
import React, {Component} from "react";
import {View, StyleSheet, Platform, Image, Text, TouchableOpacity} from "react-native";
import AppText from "./appText";
import FlexImage from "./FlexImage";
import Icon from "react-native-vector-icons/Ionicons";
import strings from "../util/localizedStrings";

class FooterMenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.footerMenu}>

                <TouchableOpacity style={styles.itemStyle}>
                    <Icon name="md-timer" style={styles.itemImage}/>
                    <AppText style={styles.itemText}>{strings.history}</AppText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle}>
                    <Icon name="md-calendar" style={styles.itemImage}/>
                    <AppText style={[styles.itemText, {textAlign:'center'}]}>{strings.myEvents}</AppText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle}>
                    <Icon name="md-home" style={styles.itemImage}/>
                    <AppText style={styles.itemText}>{strings.home}</AppText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle}>
                    <Icon name="md-person" style={styles.itemImage}/>
                    <AppText style={styles.itemText}>{strings.profile}</AppText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemStyle}>
                    <Icon name="md-settings" style={styles.itemImage}/>
                    <AppText style={styles.itemText}>{strings.settings}</AppText>
                </TouchableOpacity>

            </View>
        );
    }
}

export default FooterMenu;

const styles = StyleSheet.create({
    footerMenu: {
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 3,
        alignItems:'center'
    },

    itemStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },

    itemText: {
        fontSize:10,
        flex:1,
        alignSelf:'center',
        color: 'white'
    },

    itemImage: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 20,
        height: 18,
        color: 'white',
    }
});