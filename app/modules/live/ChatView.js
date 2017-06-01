import React, {Component} from 'react';
import {
    ListView,
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import InvertibleScrollView from "react-native-invertible-scroll-view";
import SentChatCard from "./components/SentChatCard";
import ReceivedChatCard from "./components/ReceivedChatCard";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addChatMessage} from "./live.actions";

class ChatView extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: this._compareChatCardsById,
            }),
        };
    }

    componentWillMount() {
        this._initConnection();
        this._refresh(this.props.chatMessages);
    }

    componentWillReceiveProps({chatMessages}) {
        this._refresh(chatMessages);
    }

    render() {
        return (
            <ListView
                renderScrollComponent={props => <InvertibleScrollView {...props} inverted/>}
                dataSource={this.state.dataSource}
                renderHeader={() => this._renderHeader()}
                renderRow={(chatData) => this._renderChatCard(chatData)}
                style={styles.container}
            />
        );
    }

    _compareChatCardsById(first, second) {
        return first.id !== second.id;
    }

    _initConnection() {
        this.ws = new WebSocket('ws://10.33.171.57:8080/liveEvent');
        this.ws.onopen = () => {
        };
        this.ws.onmessage = (e) => {
        };
        this.ws.onerror = (e) => {
            console.warn(e.message);
        };
        this.ws.onclose = (e) => {
        };
    }

    _onPress() {
        const message = {
            content:"Depuis le tel ma gueule !",
            datetime:"1492116035",
            writer: {
                id:"1"
            },
            eventId:"2"
        };
        this.props.addChatMessage({
            type: 'sent',
            message: message.content
        });
        const jsonMessage = JSON.stringify(message);
        this.ws.send(jsonMessage);
    }

    _onReceivedMessage(message) {

    }

    _renderChatCard(chatData) {
        return chatData.type === 'sent' ?
            <SentChatCard message={chatData.message}/> :
            <ReceivedChatCard message={chatData.message}/>;
    }

    _renderHeader() {
        return (
            <TouchableHighlight
                onPress={() => this._onPress()}
                style={styles.button}>
                <Text>Add a row</Text>
            </TouchableHighlight>
        );
    }

    _refresh(chatMessages) {
        const rowIds = chatMessages.map((message, index) => index).reverse();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(chatMessages, rowIds),
        });
    }
}

const mapStateToProps = ({live}, ownProps) => ({
    chatMessages: live.chatMessages,
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            addChatMessage,
        },
        dispatch)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChatView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        padding: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
    },
    row: {
        padding: 4,
    },
});