/**
 * Created by HEL3666 on 22/05/2017.
 */
import React, {Component} from "react";
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Swipeout from "react-native-swipe-out";
import colors from "./colors";
import  Icon from "react-native-vector-icons/FontAwesome";
import Avatar from "./Avatar";

class CommentsCard extends Component {

    static defaultProps = {
        comment: {comment: "ceehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhehh"},
        user: {id: 1, lastName: "he", firstName: "miu"},
        event: {id: 1, title: "Event1"},
        date: '18/05/2020',

    }

    constructor(props) {
        super(props);

        event:{id:1}
        let {comments} = this.props
    }


    componentWillMount() {
        if (this.props.event.id)
            this.props.refresh(this.props.event.id)
    }
    renderIcon = () => {

        let lName = this.props.user.id ? this.props.user.lastName : "N";
        let fName = this.props.user.id ? this.props.user.firstName : "N";
        return (
            <View style={{flex: 0.25}}>
                <Avatar lastName={lName}
                        firstName={fName}
                        style={{paddingTop: 10, paddingLeft: 5}}
                        size={8}
                />
            </View>
        )
    };

    render() {

        return (

            <View>
                {this.renderEventInfo()}
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
                            <View style={{flex: .75,justifyContent:'space-around'}}>

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
                flexDirection: 'row', alignSelf: 'flex-end',marginRight:5,marginTop:5
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
            <Icon.Button name="reply" style={styles.icon} size={20} color={colors.green}/>
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
                    <Text style={{color: 'blue', fontSize: 14}}>
                        {this.props.user.lastName + this.props.user.lastName}
                    </Text>
                </View>

                {this.renderDate()}

            </View>
        );
    }

    renderEventInfo() {
        return (
            <View>
                {this.renderSpacer()}
                <View style={styles.firstRow}>
                    {this.renderTitle()}

                </View>

            </View>
        );
    }

    renderTitle() {
        return (
            <View >
                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>{this.props.event.title}</Text>
            </View>
        )
    }

    renderComment() {
        return (
            <View style={{marginTop: -20, marginRight: 5, flexWrap: 'wrap'}}>
                <Text>{this.props.comment.comment}</Text>
            </View>
        );
    }

    renderDate() {
        return (
            <View style={{flex: .5}}>
                <Text style={{alignSelf: 'flex-end', marginRight: 5}}>{this.props.date}</Text>
            </View>
        );
    }
}

CommentsCard.displayName = 'commentsCard'

export default CommentsCard;

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
    },
    firstRow: {
        paddingBottom: 10,

    },
    icon: {
        backgroundColor: 'rgb(255,255,255)'
    }


});


const styleFont = StyleSheet.create({
    textFont: {
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    }
});
