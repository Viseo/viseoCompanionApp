import React, {Component} from "react";
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Swipeout from "react-native-swipe-out";
import colors from "../modules/global/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import Avatar from "./Avatar";
import {defaultNavBarStyle} from "../modules/global/navigatorStyle";
import {addLike, deleteCommentDb, dislike} from "../modules/global/db";
import moment from "moment";
import AppText from "../modules/global/AppText";

export default class ChildCommentsCard extends Component {

    static defaultProps = {
        user: {
            id: 1,
            lastName: "he",
            firstName: "miu"
        },
        event: {
            id: 1,
            title: "Event1"
        },
        date: '18/05/2020',

    };

    constructor(props) {
        super(props);

    }

    renderIcon = () => {
        let fName = this.props.writer.id ? this.props.writer.firstName : 'N';
        let lName = this.props.writer.id ? this.props.writer.lastName : 'N';
        return (
            <View style={{flex: 0.25}}>
                <Avatar
                    firstName={fName}
                    lastName={lName}
                    style={{paddingTop: 10, paddingLeft: 5}}
                    size={4}
                />
            </View>
        );
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
                    <TouchableOpacity
                        style={styles.card}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            {this.renderIcon()}
                            {this.renderSpacer()}
                            <View style={{flex: .75, justifyContent: 'space-around'}}>
                                {this.renderParticipantDate()}
                                {this.renderChildComment()}
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

    renderDelete() {
        const reply = (
            <Icon.Button
                style={styles.icon}
                name="trash"
                size={20}
                color={colors.red}
                onPress={this.deleteChildComment}
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
            liked = this.props.likers.filter((user) => this.filterUser(user)).length > 0;
        }
        const reply = (
            <Icon.Button
                style={styles.icon}
                name="thumbs-o-up"
                size={20}
                color={colors.blue}
                onPress={ () => {
                    liked ?
                        this.dislikeChildComment() : this.likeChildComment()
                }}
            />
        );
        return (
            <View >
                {reply}
            </View>
        );

    }

    renderEdit() {
        const reply = (
            <Icon.Button
                name="edit"
                style={styles.icon}
                size={20}
                color={colors.mediumGray}
                onPress={this.updateChildComment}
            />
        );
        return (
            <View >
                {reply}
            </View>
        );

    }

    updateChildComment = () => {
        if (this.props.userId == this.props.writer.id) {
            this.props.navigator.push({
                screen: 'UpdateComment',
                title: "Modification du commentaire",
                navigatorStyle: defaultNavBarStyle,
                passProps: {
                    comment: {
                        id: this.props.id,
                        content: this.props.content,
                        datetime: moment.valueOf(),
                        version: this.props.version,
                        eventId: this.props.eventId,
                    },
                    refresh:this.props.refresh,
                }
            });
        }
    };

    renderSpacer() {
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

    renderParticipantDate() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch', marginTop: 10}}>

                <View style={{flex: .5}}>
                    <Text style={{color: colors.blue, fontSize: 14}}>
                        {this.props.writer.firstName + ' ' + this.props.writer.lastName}
                    </Text>
                </View>

                {this.renderDate()}

            </View>
        );
    }

    renderDate() {
        return (
            <View style={{flex: .5}}>
                <Text style={{alignSelf: 'flex-end', marginRight: 5}}>{this.props.day} {this.props.time}</Text>
            </View>
        );
    }

    renderChildComment() {
        return (
            <View style={{marginTop: -20, marginRight: 5, flexWrap: 'wrap'}}>
                <Text>{this.props.content}</Text>
            </View>
        );
    }

    deleteChildComment = async () => {
        await deleteCommentDb(this.props.id);
        this.props.refresh(this.props.eventId);
    };


    likeChildComment = async () => {
        await addLike(this.props.id, this.props.userId);
        this.props.refresh(this.props.eventId);
    };

    dislikeChildComment = async () => {
        await dislike(this.props.id, this.props.userId);
        this.props.refresh(this.props.eventId);
    };
}

ChildCommentsCard.displayName = 'childCommentsCard'

let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 8,
        height: 120,
        width: 380,
        borderBottomWidth: 0.5,
        borderColor: colors.blue,
        marginTop: 10,
        marginLeft: 15
    },
    icon: {
        backgroundColor: 'rgb(255,255,255)'
    }
});
