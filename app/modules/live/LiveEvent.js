import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import ChatInput from "./components/ChatInput";
import ChatView from "./ChatView";
import {addChatMessage, flushChatMessage} from "./live.actions";
import {bindActionCreators} from "redux";
import settings from "../global/settings";
import moment from "moment";

class LiveEvent extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._initConnection();
    }

    componentWillUnmount() {
        this.ws.close();
        this.props.flushChatMessage();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 10}}>
                    <ChatView/>
                </View>
                <ChatInput navigator={this.props.navigator} sendMessage={this.sendMessage}/>
            </View>
        );
    }

    _initConnection = () => {
        this.ws = new WebSocket(settings.api.liveEvent);
        this.ws.onopen = () => {
            //todo link with the eventId
            this._joinChatRoom(2)
        };
        this.ws.onmessage = (wsMessage) => {
            this._onReceivedMessage(wsMessage.data)
        };
        this.ws.onerror = (e) => {
            console.warn("Lost Connexion");
        };
        this.ws.onclose = (e) => {
        };
    }

    _joinChatRoom = (eventId) => {
        const message = {
            type: 1,
            payload: {
                //todo handle the last updated
                lastUpdated: 0,
                eventId: eventId
            }
        }
        const jsonMessage = JSON.stringify(message);
        this.ws.send(jsonMessage);
    }

    _onReceivedMessage = (message) => {
        let chatMessage = JSON.parse(message);
        let messageType = chatMessage.writerId === this.props.user.id ? 'sent' : 'received'
        this._addMessageToChat(chatMessage, messageType);
    }

    _addMessageToChat = (chatMessage, type) => {
        this.props.addChatMessage({
            type: type,
            message: chatMessage.content,
            dateTime: chatMessage.dateTime,
            writerId: chatMessage.writerId,
        })
    }

    sendMessage = (messageContent) => {
        let contentEscaped = "\"" + messageContent.replace(/"/g, '\\"') + "\"";
        const message = {
            type: "2",
            payload: {
                //todo link with writer and event id
                content: contentEscaped,
                datetime: moment().valueOf(),
                writerId: this.props.user.id,
                eventId: 2,
            }
        };
        const jsonMessage = JSON.stringify(message);
        this.ws.send(jsonMessage);
    }
}

const mapStateToProps = ({user}, ownProps) => {
    return {
        user,
        ...ownProps,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            addChatMessage,
            flushChatMessage
        },
        dispatch)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LiveEvent);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    chatView: {
        flex: 10,
    },
});