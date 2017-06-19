import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../global/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Avatar from '../../global/components/Avatar';
import AppText from '../../global/components/AppText';
import {addLike, deleteCommentDb, dislike} from '../../global/db';
import {defaultNavBarStyle} from '../../global/navigatorStyle';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class CommentCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={[styles.card, this.props.style]}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        {this._renderUserAvatar()}
                        {this._renderSpacer()}
                        <View style={{flex: .75, justifyContent: 'space-around'}}>
                            {this._renderParticipantDate()}
                            {this._renderComment()}
                            {this._renderActions()}
                            {this._renderLikeCount()}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _goToUserProfile() {
        this.props.navigator.push({
            screen: 'user.othersProfile',
            title: 'Profil détaillé',
            passProps: {
                user: this.props.writer,
            },
        });
    }

    _renderParticipantDate() {
        const date =
            <View style={{flex: .5}}>
                <Text style={{textAlign: 'right', alignSelf: 'flex-end', marginRight: 5}}>{this.props.day}
                    à {this.props.time}</Text>
            </View>;
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch', marginTop: 10, marginRight: 10}}>
                <View style={{flex: .5}}>
                    <Text style={{color: colors.blue, fontSize: 14}}>
                        {this.props.writer.firstName + ' ' + this.props.writer.lastName}
                    </Text>
                </View>
                {date}
            </View>
        );
    }

    _renderUserAvatar() {
        const {writer} = this.props;
        return (
            <View style={{flex: 0.32}}>
                <Avatar
                    lastName={writer.lastName}
                    firstName={writer.firstName}
                    style={{paddingTop: 10, paddingLeft: 5}}
                    navigator={this.props.navigator}
                    otherProfileId={writer.id}
                />
            </View>
        );
    }

    _renderSpacer() {
        return (
            <View
                style={{
                    flex: 0.05,
                    alignSelf: 'stretch',
                }}
            >
            </View>
        );
    }

    _renderActions() {
        const replyButton = this.props.allowReply ? this._renderReply() : null;
        const canEdit = this.props.userId === this.props.writer.id;
        const deleteButton = canEdit ? this._renderDelete() : null;
        const editButton = canEdit ? this._renderEdit() : null;
        const likeButton = this._renderLike();
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row', alignSelf: 'flex-end', marginRight: 5, marginTop: 5,
            }}>
                {replyButton}
                {deleteButton}
                {editButton}
                {likeButton}
            </View>
        );
    }

    _renderLikeCount() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row', alignSelf: 'flex-end', marginRight: 30, marginTop: -30,
            }}>
                <AppText>{this.props.nbLike}</AppText>
            </View>
        );
    }

    _renderReply() {
        const reply = (
            <Icon.Button
                name="reply"
                style={styles.icon}
                size={20}
                color={colors.green}
                onPress={() => {
                    this.props.navigator.push({
                        screen: 'CreateChildComment',
                        title: 'Ajouter une réponse au commentaire',
                        navigatorStyle: defaultNavBarStyle,
                        passProps: {
                            eventId: this.props.eventId,
                            commentId: this.props.id,
                            userId: this.props.userId,
                            refresh: this.props.refresh,
                        },

                    });
                }}
            />
        );
        return (
            <View >
                {reply}
            </View>
        );

    }

    _renderDelete() {
        const reply = (
            <Icon.Button
                style={styles.icon}
                name="trash" size={20}
                color={colors.red}
                onPress={() => this._deleteComment()}
            />
        );
        return (
            <View>
                {reply}
            </View>
        );
    }

    _filterUser(user) {
        return user.id == this.props.userId;
    }

    _renderLike() {
        let liked = false;
        if (this.props.nbLike > 0) {
            liked = this.props.likers.filter((user) => this._filterUser(user)).length > 0;
        }

        const likeButton = (
                <Icon.Button
                    style={styles.icon}
                    name="thumbs-o-up"
                    size={20}
                    color={colors.blue}
                    onPress={ () => {
                        liked ?
                            this._dislikeComment() : this._likeComment();
                    }}
                />
            )
        ;
        return (
            <View >
                {likeButton}
            </View>
        );
    }

    _updateComment() {
        if (this.props.userId == this.props.writer.id) {
            this.props.navigator.push({
                screen: 'UpdateComment',
                title: 'Modification du commentaire',
                navigatorStyle: defaultNavBarStyle,
                passProps: {
                    comment: {
                        id: this.props.id,
                        content: this.props.content,
                        datetime: moment.valueOf(),
                        version: this.props.version,
                        eventId: this.props.eventId,
                        publish: true,
                    },
                    refresh: this.props.refresh,
                },
            });
        }
    };

    _renderEdit() {
        const reply = (
            <Icon.Button
                name="edit"
                style={styles.icon}
                size={20}
                color={colors.mediumGray}
                onPress={() => this._updateComment()}
            />
        );
        return (
            <View >
                {reply}
            </View>
        );
    }

    _renderComment() {
        return (
            <View style={{marginTop: -20, marginRight: 5, flexWrap: 'wrap'}}>
                <Text>{this.props.content}</Text>
            </View>
        );
    }

    async _likeComment() {
        await addLike(this.props.id, this.props.userId);
        this.props.refresh(this.props.eventId);
    }

    async _dislikeComment() {
        await dislike(this.props.id, this.props.userId);
        this.props.refresh(this.props.eventId);
    }

    async _deleteComment() {
        await deleteCommentDb(this.props.id);
        this.props.refresh(this.props.eventId);
    }
}

CommentCard.defaultProps = {
    style: {},
    allowReply: true,
};

CommentCard.propTypes = {
    content: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    writer: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 8,
        height: 150,
        borderBottomWidth: 0.5,
        borderColor: colors.blue,
        marginTop: 10,
    },
    icon: {
        backgroundColor: 'rgb(255,255,255)',
    },
});