import React, {Component} from 'react';
import {View, StyleSheet, ListView} from "react-native";
import {connect} from "react-redux";
import ReceivedChatCard from "./components/ReceivedChatCard";
import SentChatCard from "./components/SentChatCard";
import ChatInput from "./components/ChatInput";

const testData = [
    {id: 0, type: 'received', message: 'I am a received message'},
    {id: 1, type: 'sent', message: 'I am a sent message'},
    {id: 2, type: 'received', message: 'I am a received message'},
];

class LiveEvent extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: this._compareChatCardsById
        });
        this.state = {
            dataSource: ds.cloneWithRows(testData),
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(chatData) => this.renderChatCard(chatData)}
                    renderFooter={() => this.renderFooter()}
                />
            </View>
        );
    }

    renderChatCard(chatData) {
        return chatData.type === 'sent' ?
            <SentChatCard message={chatData.message}/> :
            <ReceivedChatCard message={chatData.message}/>;
    }

    renderFooter() {
        const chatInput = <ChatInput styles={styles.footer} navigator={this.props.navigator}/>;
        return (
            <View style={{flex:1}}>
                {chatInput}
            </View>
        );
    }

    _compareChatCardsById(first, second) {
        return first.id !== second.id;
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
        height: 40,
    }
});