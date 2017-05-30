import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from "react-native";
import {connect} from "react-redux";
import ReceivedChatCard from "./components/ReceivedChatCard";
import SentChatCard from "./components/SentChatCard";
import ChatInput from "./components/ChatInput";

class LiveEvent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.chatView}>
                    <ScrollView style={{flex: 1}}>
                        <ReceivedChatCard message="I am a received chat message"/>
                        <SentChatCard message="I am a sent chat message"/>
                        <ReceivedChatCard message="I am a received chat message"/>
                    </ScrollView>
                </View>
                <ChatInput style={styles.footer} navigator={this.props.navigator}/>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    }
};

export default connect(
    mapStateToProps
)(LiveEvent);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    chatView: {
        flex: 10,
    },
    footer: {
        flex: 1,
    }
});