import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import colors from '../../global/colors';
import {bindActionCreators} from 'redux';
import {defaultNavBarStyle} from '../../global/navigatorStyle';
import {getComments} from './comments.actions';
import {connect} from 'react-redux';
import AppText from '../../global/components/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import PropTypes from 'prop-types';
import CommentCard from './CommentCard';

class Comments extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentWillMount() {
        this.props.refresh(this.props.eventId);
    }

    render() {
        const commentsList = (
            <FlatList
                data={this.props.comments}
                keyExtractor={(comment, index) => comment.id}
                renderItem={({item}) => this._renderCommentCard(item)}
                onRefresh={() => this.props.refresh(this.props.eventId)}
                ListEmptyComponent={() => {return this._renderEmptyCommentCard()}}
                refreshing={this.props.refreshing}
            />
        );
        return (
            <View style={styles.mainContainer}>
                {this._renderEventInfo()}
                {commentsList}
            </View>
        );
    }

    onNavigatorEvent(event) {
        if (event.id === 'addComment' && this.props.participating) {
            this._goToAddComment();
        }
    }

    _formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split('/');
    }

    _goToAddComment() {
        this.props.navigator.push({
            screen: 'CreateComment',
            title: 'Ajouter un commentaire',
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                eventId: this.props.eventId,
                refresh: this.props.refresh,
                user: this.props.user,
            },
        });
    }

    _renderAvis() {
        return (
            <View style={{flexDirection: 'row', flex: 3}}>
                <Text style={{
                    fontWeight: 'bold',
                    textAlign: 'left',
                    fontSize: 16,
                    color: 'white',
                }}>
                    75%
                </Text>
                <Icon name="star" style={{
                    backgroundColor: 'transparent',
                    textAlign: 'left',
                }} size={20}
                      color={colors.green}/>
                <Text style={{
                    fontWeight: 'bold',
                    textAlign: 'left',
                    fontSize: 16,
                    color: 'white',
                }}>
                    (10 avis)
                </Text>
            </View>
        );
    }

    _renderCommentCard(comment) {
        const commentChildren = comment.childComments.map(childComment => {
            const [day, time] = this._formatDate(childComment.datetime);
            return (
                <CommentCard
                    key={childComment.id}
                    id={childComment.id}
                    content={childComment.content}
                    day={day}
                    time={time}
                    version={childComment.version}
                    writer={childComment.writer}
                    eventId={childComment.eventId}
                    nbLike={childComment.nbLike}
                    navigator={this.props.navigator}
                    userId={this.props.user.id}
                    refresh={this.props.refresh}
                    likers={childComment.likers}
                    style={styles.childComment}
                    allowReply={false}
                />
            );
        });
        const [day, time] = this._formatDate(comment.datetime);
        return (
            <View>
                <CommentCard
                    id={comment.id}
                    content={comment.content}
                    day={day}
                    time={time}
                    writer={comment.writer}
                    version={comment.version}
                    eventId={comment.eventId}
                    children={comment.children}
                    nbLike={comment.nbLike}
                    likers={comment.likers}
                    userId={this.props.user.id}
                    navigator={this.props.navigator}
                    refresh={this.props.refresh}
                />
                {commentChildren}
            </View>
        );
    }

    _renderEmptyCommentCard() {
        return (
            <View>
                <AppText
                    style={{
                        textAlign: 'center',
                        color: colors.mediumGray,
                        backgroundColor: 'white',
                        height: 50,
                        borderRadius: 4,
                        textAlignVertical: 'center',
                        fontSize: 18,
                        marginTop: 10,
                    }}
                >
                    Aucun commentaire.
                </AppText>
            </View>
        );
    }

    _renderEventInfo() {
        return (
            <View style={{flexDirection: 'row', flex: 0.05, alignItems: 'stretch'}}>
                {this._renderTitle()}
                {this._renderAvis()}
            </View>
        );
    }

    _renderTitle() {
        let event = this.props.event.name;
        return (
            <View style={{flex: 7}}>
                <Text style={{
                    fontWeight: 'bold',
                    textAlign: 'left',
                    fontSize: 20,

                    color: 'white',
                }}>
                    {event}
                </Text>
            </View>
        );
    }
}

Comments.propTypes = {
    eventId: PropTypes.number.isRequired,
};

const mapStateToProps = ({user, comments, events}, ownProps) => ({
    user,
    comments: comments.items,
    event: events.itemsExpired.find(event => event.id === ownProps.eventId),
    refreshing: comments.isFetching,
    ...ownProps
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        refresh: getComments,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Comments);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.blue,
        paddingHorizontal: 15,
    },
    childComment: {
        borderRadius: 8,
        height: 120,
        width: 380,
        borderBottomWidth: 0.5,
        borderColor: colors.blue,
        marginTop: 10,
        marginLeft: 15,
    },
});