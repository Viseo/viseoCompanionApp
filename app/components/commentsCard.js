import React, {Component} from "react";
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Swipeout from "react-native-swipe-out";
import colors from "./colors";
import Icon from "react-native-vector-icons/FontAwesome";
import Avatar from "./Avatar";
import {defaultNavBarStyle} from "../modules/global/navigatorStyle";

export default class CommentsCard extends Component {

    static defaultProps = {
        user: {id: 1, lastName: "he", firstName: "miu"},
        event: {id: 1, title: "Event1"},
        date: '18/05/2020',

    }

    constructor(props) {
        super(props);

    }

    renderIcon = () => {
        let fName = this.props.writer.id ? this.props.writer.firstName : "N";
        let lName = this.props.writer.id ? this.props.writer.lastName : "N";
        return (
            <View style={{flex: 0.25}}>
                <Avatar
                    lastName={lName}
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
                                {this.renderComment()}
                                {this.renderActionComment()}
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
                            commentId: this.props.commentId,
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
            <Icon.Button style={styles.icon} name="trash" size={20} color={colors.red}/>
        );
        return (
            <View>
                {reply}
            </View>
        );

    }

    renderLike() {
        const reply = (
            <Icon.Button style={styles.icon} name="thumbs-o-up" size={20} color={colors.blue}/>
        );
        return (
            <View >
                {reply}
            </View>
        );

    }

    renderEdit() {
        const reply = (
            <Icon.Button name="edit" style={styles.icon} size={20} color={colors.mediumGray}/>
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
                        {this.props.writer.firstName + ' ' + this.props.writer.lastName}
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
}

CommentsCard.displayName = 'commentsCard'


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

// const styleFont = StyleSheet.create({
//     textFont: {
//         fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
//     }
// });
