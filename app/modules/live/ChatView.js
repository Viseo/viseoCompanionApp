import React, {Component} from 'react';
import {ListView, StyleSheet} from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import SentChatCard from './components/SentChatCard';
import ReceivedChatCard from './components/ReceivedChatCard';
import {connect} from 'react-redux';
import StatusChatCard from './components/StatusChatCard';
import PropTypes from 'prop-types';

export class ChatView extends Component {

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
        return first.datetime !== second.datetime;
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
            return a.datetime - b.datetime;
        });
        const rowIds = chatMessages.map((message, index) => index).reverse();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(chatMessages, rowIds),
        });
    }
}

ChatView.propTypes = {
    chatMessages: PropTypes.array.isRequired,
};

const mapStateToProps = ({live}, ownProps) => ({
    chatMessages: live.chatMessages,
    ...ownProps,
});

export default connect(
    mapStateToProps,
)(ChatView);

const styles = StyleSheet.create({
    container: {
        flex: 8,
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