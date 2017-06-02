/**
 * Created by HEL3666 on 22/05/2017.
 */
/**
 * Created by LMA3606 on 13/02/2017.
 */
import React, {Component} from "react";
import {NavMenu, Platform, StyleSheet, View} from "react-native";
import colors from "../modules/global/colors";
import {dispatch} from "redux";
import CommentsList from "../containers/CommentsList";
import {defaultNavBarStyle} from "../modules/global/navigatorStyle";

export default class Comments extends Component {

    static defaultProps = {
        event: {id: 2}
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }


    render() {

        return (
            <View style={styles.mainContainer}>
                <CommentsList
                    style={{flex: 22}}
                    eventId={this.props.eventId}
                    navigator={this.props.navigator}
                />
            </View>
        );
    }

    onNavigatorEvent(event) {
        if(event.id === 'addComment') {
            this._goToAddComment();
        }
    }

    _goToAddComment() {
        this.props.navigator.push({
            screen:'CreateComment',
            title:'Ajouter un commentaire',
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                eventId: this.props.eventId,
            }
        });
    }
}

Comments.navigatorButtons = {
    rightButtons: [
        {
            icon: require('../images/navigation/add.png'),
            id: 'addComment'
        },
    ],
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.blue,
        padding: 8,
        paddingBottom: 0,
        paddingTop: 20,
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