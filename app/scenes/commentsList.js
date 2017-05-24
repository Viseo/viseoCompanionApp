/**
 * Created by HEL3666 on 22/05/2017.
 */
/**
 * Created by LMA3606 on 13/02/2017.
 */
import React, {Component} from "react";
import {NavMenu, Platform, StyleSheet, View} from "react-native";
import Header from "./../components/header";
import colors from "../components/colors";
import {dispatch} from "redux";
import CommentsList from "../containers/CommentsList";

export default class Comments extends Component {

    static defaultProps = {
        event: {id: 2}
    };

    constructor(props) {
        super(props);
    }


    render() {

        return (

            <View style={styles.mainContainer}>
                <Header/>

                <CommentsList style={{flex: 22}} eventId={this.props.event.id} />

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