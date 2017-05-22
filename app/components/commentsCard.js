/**
 * Created by HEL3666 on 22/05/2017.
 */
import React, {Component} from "react";
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Swipeout from "react-native-swipe-out";
import colors from "./colors";
import  Icon from "react-native-vector-icons/FontAwesome";

class CommentsCard extends Component {

    static defaultProps = {
        comment: {comment: "ceehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhehh"},
        user: {id: 1, name: "user"},
        event: {id: 1, title: "Event1"},
        date: '18/05/1990',

    }

    constructor(props) {
        super(props);
    }

    renderIcon = () => {

        let icon = this.props.user.id ? require("../images/user.png") : require("../images/checkWhite.png");
        return (
            <View style={{flex:.5}}>
                <Image source={icon} style={{width: 33, height: 33}}/>
            </View>
        )
    };

    render() {

        return (

            <View>
                {this.renderEventInfo()}
                <Swipeout
                    className="swipeout"
                    style={{backgroundColor: 'white'}}
                    autoClose={true}
                    overflow="hidden"
                    sensitivity={(Platform.OS === 'ios') ? 1 : 2}
                >
                    <TouchableOpacity
                        style={styles.card}

                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'space-between',
                        }}>

                            {this.renderParticipantDate()}
                            {this.renderComment()}
                            {this.renderActionComment()}
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
                flexDirection: 'row',alignSelf:'flex-end'
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
            <Icon.Button  name="reply" style={styles.icon} size={30} color="#900" />
        );
        return (
            <View >
                {reply}
            </View>
        );

    }


    renderDelete() {
        const reply = (
            <Icon.Button style={styles.icon}  name="trash" size={30} color="#900" />
        );
        return (
            <View>
                {reply}
            </View>
        );

    }

    renderLike() {
        const reply = (
            <Icon.Button style={styles.icon}   name="thumbs-o-up" size={30} color="#900" />
        );
        return (
            <View >
                {reply}
            </View>
        );

    }

    renderEdit() {
        const reply = (
            <Icon.Button name="edit" style={styles.icon}  size={30} color="#900" />
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
                    flex: 1,
                    alignSelf: 'stretch'
                }}
            >
            </View>
        );
    }


    renderParticipantDate() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',alignItems:'stretch'}}>
                {this.renderIcon()}
                <View style={{flex:.5}} >
                <Text style={{color: 'blue', fontSize: 14}}>
                    {this.props.user.name}
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
                <Text style={{fontWeight:'bold',fontSize:20,color:'white'}}>{this.props.event.title}</Text>
            </View>
        )
    }

    renderComment() {
        return (
            <View style={{alignItems:"center"}}>
                <Text>{this.props.comment.comment}</Text>
            </View>
        );
    }

    renderDate() {
        return (
            <View style={{flex:.5}}>
                <Text>12/05/2233</Text>
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
        backgroundColor: 'white',
        height: 100,
        borderBottomWidth: 0.5,
        borderColor: colors.blue,
    },
    firstRow: {
        paddingBottom:10,

    },
    icon:{
        backgroundColor:'#fff'
    }


});


const styleFont = StyleSheet.create({
    textFont: {
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    }
});
