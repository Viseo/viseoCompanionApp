import React, {Component} from "react";
import {NavMenu, Platform, StyleSheet, View} from "react-native";
import Header from "./../components/header";
import VisibleEventList from "../modules/newsFeed/containers/VisibleEvents";
import SearchBar from "./../components/SearchBar";
import ItemSpacer from "./../components/ItemSpacer";
import colors from "../modules/global/colors";
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
        const createNewEventButton = (
            <ActionButton.Item
                buttonColor="#9b59b6"
                title="Nouvel évènement"
                onPress={() => {
                    this.props.navigator.push({
                        title: 'AddEvent',
                    });
                }}
            >
                <Icon name="md-create" style={styles.icon}/>
            </ActionButton.Item>
        );
        const editProfileButton = (
            <ActionButton.Item
                buttonColor="#9b59b6"
                title="Editer mon profil"
                onPress={() => {
                    this.props.navigator.push({
                        title: 'Profile',
                    });
                }}
            >
                <Icon name="ios-person" style={styles.icon}/>
            </ActionButton.Item>
        );
        const HistoryButton = (
            <ActionButton.Item
                buttonColor="#9b59b6"
                title="Historique"
                onPress={() => {
                    this.props.navigator.push({
                        title: 'History',
                    });
                }}
            >
                <Icon name="ios-timer" style={styles.icon}/>
            </ActionButton.Item>
        );
        return (
            <View style={styles.mainContainer}>
                <PushController/>
                <View style={styles.body}>
                    <View style={styles.searchBar}>
                        <ItemSpacer/>
                        <SearchBar style={{flex: 22}}/>
                        <ItemSpacer/>
                    </View>
                </View>
                <VisibleEventList style={{flex: 22}} navigator={this.props.navigator}/>
                <ActionButton buttonColor='#5A61FF'>
                    {editProfileButton}
                    {createNewEventButton}
                    {HistoryButton}
                </ActionButton>
            </View>
        );
    }
}

Home.navigatorStyle = {
    navBarHidden: false,
    title: 'Actualités'
};

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