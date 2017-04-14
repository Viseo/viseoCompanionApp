/**
 * Created by LMA3606 on 13/02/2017.
 */
import React, {Component} from "react";
import {
    ActivityIndicator,
    Animated,
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    Navigator,
    NavMenu,
    ScrollView,
    View,
    ListView,
    Dimensions,
    RefreshControl,
    Platform,
    TextInput,
    Button,
    Keyboard
} from "react-native";
import Header from "./../components/header";
import VisibleEventList from './../containers/VisibleEvents';
import SearchBar from './../components/SearchBar'
import ItemSpacer from './../components/ItemSpacer'
import colors from '../components/colors'
import {dispatch} from 'redux'
import PushController from '../components/PushController';
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

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
                        passProps: {
                            event: {
                                name: '',
                                date: '',
                                category: 0,
                                description: '',
                                location: '',
                                keywords:'',
                            }
                        }
                    });
                }}
            >
                <Icon
                    name="md-create"
                    style={{
                                fontSize: 24,
                                height: 22,
                                color: 'white',
                            }}
                />
            </ActionButton.Item>
        )
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
                <VisibleEventList style={{flex:15}} navigator={this.props.navigator}/>
                <ActionButton buttonColor={colors.blue}>
                    {createNewEventButton}
                </ActionButton>
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
    },
    body: {
        flex: 0,
        flexDirection: 'column',
        paddingBottom: 10
    },
    searchBar: {
        flex: 0,
        flexDirection: 'row'
    }
});