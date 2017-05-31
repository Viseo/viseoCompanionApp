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

    _onPress() {
        const messageToSend = {
            type: 'sent',
            message: 'new message sent'
        };
        this.props.addChatMessage(messageToSend);
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