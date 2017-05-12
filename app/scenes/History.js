/**
 * Created by HEL3666 on 11/05/2017.
 */

import React, {Component} from "react";
import {
    StyleSheet,
    NavMenu,
    View,
    Platform,
} from "react-native";
import Header from "./../components/header";
import VisibleEventListExp from "./../containers/VisibleEventsExp";
import SearchBar from "./../components/SearchBar";
import ItemSpacer from "./../components/ItemSpacer";
import colors from "../components/colors";
import {dispatch} from "redux";
import PushController from "../util/pushController";

import ActionButton from "./../components/actionButton/ActionButton";
import Icon from "react-native-vector-icons/Ionicons"; //https://infinitered.github.io/ionicons-version-3-search/

export default class Home extends Component {

    static defaultProps = {
        user: {id: 1}
    };

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.mainContainer}>
                <PushController/>
                <Header/>
                <View style={styles.body}>
                    <View style={styles.searchBar}>
                        <ItemSpacer/>
                        <SearchBar style={{flex:22}}/>
                        <ItemSpacer/>
                    </View>
                </View>
                <VisibleEventListExp style={{flex:22}} navigator={this.props.navigator}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.blue,
        padding: 8,
        paddingBottom: 0,
        paddingTop: 0,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    body: {
        flex: 0,
        flexDirection: 'column',
        paddingBottom: 10
    },
    searchBar: {
        flex: 0,
        flexDirection: 'row'
    },
    icon: {
        fontSize: 24,
        height: 22,
        color: 'white',
    }
});