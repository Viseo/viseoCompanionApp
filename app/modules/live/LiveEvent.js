import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import ChatInput from "./components/ChatInput";
import ChatView from "./ChatView";
import {addChatMessage} from "./live.actions";
import {bindActionCreators} from "redux";
import settings from "../global/settings";
import moment from "moment";
import colors from "../global/colors";
import Icon from "react-native-vector-icons/Ionicons";
import AppText from "../global/components/AppText";
import PropTypes from "prop-types";

export class LiveEvent extends Component {

    state = {
        connected: false,
        participantsNumber: "",
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._initConnection();
    }

    componentWillUnmount() {
        this.ws.close();
    }

    render() {
        let lostConnexionModal = !this.state.connected ? this.renderLostConnexionModal() : null;
        let participantsCounter = this.renderParticipantsNumber();
        return (
            <View style={{flex: 1,flexDirection:"column",backgroundColor:"white"}}>
                <View style={{flex: 8}}>{lostConnexionModal}
                <ChatView/>
                </View>
                <View style={{flex: 1,flexDirection: "row"}}>
                    <ChatInput  style={{flex:9,marginLeft:20,width:'100%'}} navigator={this.props.navigator} sendMessage={this.sendMessage}/>
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
            this._addConnectedMessage();
        };
        this.ws.onmessage = (wsMessage) => {
            this._onReceivedMessage(wsMessage.data);
        };
        this.ws.onerror = () => {
            this.setState({connected: false});
            this._initConnection();
        };
        this.ws.onclose = () => {
            this._addDisconnectedMessage();
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
        let liveAction = JSON.parse(message);
        switch (liveAction.type) {
            case 2:
                let chatMessage = liveAction.payload;
                let messageType = chatMessage.writerId === this.props.user.id ? "sent" : "received";
                this._addMessageToChat(chatMessage, messageType);
                break;
            case 3:
                this._setParticipantsNumber(liveAction.payload);
                break;
            default:
                break;
        }

    };

    _addMessageToChat = (chatMessage, type) => {
        this.props.addChatMessage({
            type: type,
            message: chatMessage.content,
            datetime: chatMessage.datetime,
            writerId: chatMessage.writerId,
            writer: chatMessage.writer,
        });
    };

    sendMessage = (messageContent) => {
        let contentEscaped = "\"" + messageContent.replace(/"/g, "\\\"") + "\"";
        const message = {
            type: "2",
            payload: {
                content: contentEscaped,
                datetime: moment().valueOf(),
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
                    textAlign: "center",
                    fontSize: 17,
                }}>
                    Erreur de connexion
                </AppText>
            </View>
        );
    }

    renderParticipantsNumber() {
        return (
            <View style={{flex: 1,alignItems: "center",marginTop:18}}>
                <Icon name="ios-people" size={30}/>
                <AppText>{this.state.participantsNumber}</AppText>
            </View>
        );
    }

    _addDisconnectedMessage() {
        const message = {
            content: "Vous avez été déconnecté du live.",
            datetime: moment().valueOf(),
        };
        this._addMessageToChat(message, "status");
    }

    _addConnectedMessage() {
        const message = {
            content: "Vous avez rejoint le live.",
            datetime: moment().valueOf(),
        };
        this._addMessageToChat(message, "status");
    }

    _setParticipantsNumber(participantsNumber) {
        this.setState({participantsNumber});
    }
}

LiveEvent.propTypes = {
    user: PropTypes.object.isRequired,
    lastUpdate: PropTypes.number.isRequired,
    navigator: PropTypes.object.isRequired,
};

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