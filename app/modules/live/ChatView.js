import React, {Component} from 'react';
import {ListView, StyleSheet} from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import SentChatCard from './components/SentChatCard';
import ReceivedChatCard from './components/ReceivedChatCard';
import {connect} from 'react-redux';
import StatusChatCard from './components/StatusChatCard';

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
                renderRow={(chatData) => this._renderChatCard(chatData)}
                style={styles.container}
                enableEmptySections={true}
            />
        );
    }

    _compareChatCardsById(first, second) {
        return first.formattedDate !== second.formattedDate;
    }

    _renderChatCard(chatData) {
        switch (chatData.type) {
            case 'sent' :
                return <SentChatCard chatData={chatData}/>;
            case 'received' :
                return <ReceivedChatCard chatData={chatData}/>;
            case 'status' :
                return <StatusChatCard chatData={chatData}/>;
            default:
                return null;

        }
    }

    _refresh(chatMessages) {
        chatMessages.sort(function (a, b) {
            return a.formattedDate - b.formattedDate;
        });
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

export default connect(
    mapStateToProps,
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