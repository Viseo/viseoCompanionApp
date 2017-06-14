import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import ChatInput from './components/ChatInput';
import ChatView from './ChatView';
import {addChatMessage, flushChatMessage} from './live.actions';
import {bindActionCreators} from 'redux';
import settings from '../global/settings';
import moment from 'moment';
import colors from '../global/colors';
import AppText from '../global/AppText';
import Icon from 'react-native-vector-icons/Ionicons';

class LiveEvent extends Component {

    state = {
        connected: false,
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._initConnection();
    }

    componentWillUnmount() {
        this.ws.close();
        // this.props.flushChatMessage();
    }

    render() {
        let lostConnexionModal = !this.state.connected ? this.renderLostConnexionModal() : null;
        let participantsCounter = this.renderParticipantsCounter();
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 10}}>
                    {lostConnexionModal}
                    <ChatView/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ChatInput style={{flex: 9}} navigator={this.props.navigator} sendMessage={this.sendMessage}/>
                    {participantsCounter}
                </View>
            </View>
        );
    }

    _initConnection = () => {
        this.ws = new WebSocket(settings.api.liveEvent);
        this.ws.onopen = () => {
            this._joinChatRoom(this.props.eventId);
            this.setState({connected: true});
        };
        this.ws.onmessage = (wsMessage) => {
            this._onReceivedMessage(wsMessage.data);
        };
        this.ws.onerror = (e) => {
            this.setState({connected: false});
            this.addDisconnectedMessage();
        };
        this.ws.onclose = (e) => {
        };
    };

    _joinChatRoom = (eventId) => {
        const message = {
            type: 1,
            payload: {
                lastUpdated: this.props.lastUpdate,
                eventId: eventId,
            },
        };
        const jsonMessage = JSON.stringify(message);
        this.ws.send(jsonMessage);
    };

    _onReceivedMessage = (message) => {
        let chatMessage = JSON.parse(message);
        let messageType = chatMessage.writerId === this.props.user.id ? 'sent' : 'received';
        this._addMessageToChat(chatMessage, messageType);
    };

    _addMessageToChat = (chatMessage, type) => {
        this.props.addChatMessage({
            type: type,
            message: chatMessage.content,
            dateTime: chatMessage.dateTime,
            writerId: chatMessage.writerId,
        });
    };

    sendMessage = (messageContent) => {
        let contentEscaped = '"' + messageContent.replace(/"/g, '\\"') + '"';
        const message = {
            type: '2',
            payload: {
                content: contentEscaped,
                dateTime: moment().valueOf(),
                writerId: this.props.user.id,
                eventId: this.props.eventId,
            },
        };
        const jsonMessage = JSON.stringify(message);
        this.ws.send(jsonMessage);
    };

    renderLostConnexionModal() {
        return (
            <View style={{backgroundColor: colors.red}}>
                <AppText style={{
                    color: colors.lightGray,
                    textAlign: 'center',
                    fontSize: 17,
                }}>
                    Erreur de connexion
                </AppText>
            </View>
        );
    }

    renderParticipantsCounter() {
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                <Icon name="ios-people" size={30}/>
                <AppText>{this.props.numberOfParticipants}</AppText>
            </View>
        );
    }

    addDisconnectedMessage() {
        const message = {
            content: 'Vous avez été déconnecté du live.',
            dateTime: moment().valueOf(),
            writerId: 0,
            eventId: this.props.eventId,
        };
        this._addMessageToChat(message, 'received');
    }
}

const mapStateToProps = ({user, live}, ownProps) => {
    return {
        user,
        lastUpdate: live.lastUpdate,
        ...ownProps,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            addChatMessage,
            flushChatMessage,
        },
        dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LiveEvent);

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
    },
    chatView: {
        flex: 10,
    },
});