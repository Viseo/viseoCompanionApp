import React, {Component} from "react";
import {Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Swipeout from "react-native-swipe-out";
import colors from "../modules/global/colors";
import  Icon from "react-native-vector-icons/FontAwesome";
import Avatar from "./Avatar";
import AppText from "../modules/global/AppText";
import {addLike, dislike} from "../util/db";
import {defaultNavBarStyle} from "../modules/global/navigatorStyle";

export default class CommentsCard extends Component {

    static defaultProps = {
        user: {id: 1, lastName: "he", firstName: "miu"},
        event: {id: 1, title: "Event1"},
        date: '18/05/2020',
    };

    constructor(props) {
        super(props);
    }

    renderIcon = () => {
        let lName = this.props.writer.id ? this.props.writer.lastName : "N";
        let fName = this.props.writer.id ? this.props.writer.firstName : "N";
        return (
            <View style={{flex: 0.25}}>
                <Avatar lastName={lName}
                        firstName={fName}
                        style={{paddingTop: 10, paddingLeft: 5}}
                        size={4}
                />
            </View>
        )
    };

    render() {
        return (
            <View>
                <Swipeout
                    className="swipeout"
                    style={{backgroundColor: 'transparent'}}
                    autoClose={true}
                    overflow="hidden"
                    sensitivity={(Platform.OS === 'ios') ? 1 : 2}
                >
                    <TouchableOpacity style={styles.card}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            {this.renderIcon()}
                            {this.renderSpacer()}
                            <View style={{flex: .75, justifyContent: 'space-around'}}>
                                {this.renderParticipantDate()}
                                {this.renderComment()}
                                {this.renderActionComment()}
                                {this.renderLikeCount()}
                            </View>
                        </View>
                    </TouchableOpacity>
                </Swipeout>
            </View>
        );
    }

    renderActionComment() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row', alignSelf: 'flex-end', marginRight: 5, marginTop: 5
            }}>
                {this.renderReply()}
                {this.renderDelete()}
                {this.renderEdit()}
                {this.renderLike()}
            </View>
        );
    }

    renderLikeCount() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row', alignSelf: 'flex-end', marginRight: 30, marginTop: -30
            }}>
                <AppText>{this.props.nbLike}</AppText>
            </View>
        );
    }

    renderReply() {
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
                            userId:this.props.userId
                        }

                    })
                }}
            />
        );
        return (
            <View >
                {reply}
            </View>
        );

    }

    renderDelete() {
        const reply = (
            <Icon.Button
                style={styles.icon}
                name="trash" size={20}
                color={colors.red}
                onPress={this.deleteComment}
            />
        );
        return (
            <View>
                {reply}
            </View>
        );
    }

    filterUser = (element) => {
        return element.id == this.props.userId;
    };


    renderLike() {
        let liked = false;
        if (this.props.nbLike > 0) {
            liked = this.props.likers.filter(this.filterUser).length > 0 ? true : false;
        }

        const like = (
                <Icon.Button
                    style={styles.icon}
                    name="thumbs-o-up"
                    size={20}
                    color={colors.blue}
                    onPress={ () => {
                        liked ?
                            this.dislikeComment() : this.likeComment()
                    }}
                />
            )
        ;
        return (
            <View >
                {like}
            </View>
        );
    }

    updateComment = () => {
        if (this.props.userId == this.props.writer.id) {
            this.props.navigator.push({
                screen: 'UpdateComment',
                title: "Modification du commentaire",
                navigatorStyle: defaultNavBarStyle,
                passProps: {
                    comment: {
                        id: this.props.id,
                        content: this.props.content,
                        day: this.props.day,
                        time: this.props.time,
                        writer: this.props.writer,
                        version: this.props.version,
                        eventId: this.props.eventId,
                        userId: this.props.userId,
                        children: this.props.children,
                        likers: this.props.likers,
                    },
                    modifComment: true
                }
            });
        }
    };

    renderEdit() {
        const reply = (
            <Icon.Button
                name="edit"
                style={styles.icon}
                size={20}
                color={colors.mediumGray}
                onPress={this.updateComment}
            />
        );
        return (
            <View >
                {reply}
            </View>
        );
    }

    renderSpacer() {
        return (
            <View
                style={{
                    flex: 0.05,
                    alignSelf: 'stretch'
                }}
            >
            </View>
        );
    }

    renderParticipantDate() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch', marginTop: 10}}>
                <View style={{flex: .5}}>
                    <Text style={{color: colors.blue, fontSize: 14}}>
                        {this.props.writer.lastName + ' ' + this.props.writer.firstName}
                    </Text>
                </View>
                {this.renderDate()}
            </View>
        );
    }

    renderComment() {
        return (
            <View style={{marginTop: -20, marginRight: 5, flexWrap: 'wrap'}}>
                <Text>{this.props.content}</Text>
            </View>
        );
    }


    renderDate() {
        return (
            <View style={{flex: .5}}>
                <Text style={{alignSelf: 'flex-end', marginRight: 5}}>{this.props.day} à {this.props.time}</Text>
            </View>
        );
    }

    renderComment() {
        return (
            <View style={{marginTop: -20, marginRight: 5, flexWrap: 'wrap'}}>
                <Text>{this.props.content}</Text>
            </View>
        );
    }


    likeComment = async () => {
        await addLike(this.props.id, this.props.userId);
        this.props.refresh(this.props.eventId);
    };

    dislikeComment = async () => {
        await dislike(this.props.id, this.props.userId);
        this.props.refresh(this.props.eventId);
    };

    deleteComment = async () => {
        await deleteCommentDb(this.props.id);
        this.props.refresh(this.props.eventId);
    }
}

CommentsCard.displayName = 'commentsCard';

let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 8,
        height: 150,
        borderBottomWidth: 0.5,
        borderColor: colors.blue,
        marginTop: 10
    },
    icon: {
        backgroundColor: 'rgb(255,255,255)'
    }
});