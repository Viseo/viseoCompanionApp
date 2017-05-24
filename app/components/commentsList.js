/**
 * Created by IBO3693 on 23/05/2017.
 */


import React, {Component} from "react";
import {ListView, RefreshControl, Text, View} from "react-native";
import CommentsCard from "./commentsCard";
import AppText from "./appText";
import moment from "moment";
import colors from "./colors";
import  Icon from "react-native-vector-icons/FontAwesome";
export default class CommentList extends Component {

    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {

                for (let key in r1) {
                    if (!r2.hasOwnProperty(key))
                        return true
                    if (r1[key] !== r2[key])
                        return true
                }
                return false
            }
        })
        this.state = {
            dataSource: ds.cloneWithRows(this.props.comments),


        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.comments)
        });
    }

    componentWillMount() {
        this.props.refresh(this.props.eventId)
    }

    formatDate(date) {

        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split('/');
    }

    render() {
        // console.warn(this.props.comments.length);
        const commentsList = (
            <ListView
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.refreshing}
                        onRefresh={() => {
                            this.props.refresh(this.props.eventId)
                        }}
                    />
                }
                scrollEventThrottle={200}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderEventCard}
            />
        )
        const nothingToShow = (
            <AppText
                style={{
                    textAlign: 'center',
                    color: colors.mediumGray,
                    backgroundColor: 'white',
                    height: 50,
                    borderRadius: 4,
                    textAlignVertical: 'center',
                    fontSize: 18,
                }}
            >
                Aucun commentaire.
            </AppText>
        )
        return (
            <View style={[{flex: 1, flexDirection: 'column'}, this.props.style]}>
                {this.renderEventInfo()}
                {
                    this.state.dataSource.getRowCount() > 0 || this.props.refreshing ?
                        commentsList :
                        nothingToShow
                }
            </View>
        )
    }

    renderEventInfo() {
        return (
                <View style={{flexDirection:'row',flex:0.05,alignItems:'stretch'}}>
                    {this.renderTitle()}
                    {this.renderAvis()}
                </View>
        );
    }

    renderTitle() {
        let event = this.props.comments.length > 0 ? "Event " + this.props.comments[0].eventId : ""
        return (
            <View style={{flex:7}}>
                <Text style={{
                    fontWeight: 'bold',
                    textAlign: 'left',
                    fontSize: 20,

                    color: 'white'
                }}>
                    {event}
                </Text>
            </View>
        )
    }

    renderAvis() {

        return (
            <View style={{flexDirection:'row',flex:3}}>
                <Text style={{
                    fontWeight: 'bold',
                    textAlign: 'left',
                    fontSize: 16,
                    color: 'white'
                }}>
                    75%
                </Text>
                <Icon name="star" style={{backgroundColor:'transparent',textAlign:'left'}} size={20} color={colors.green}/>
                <Text style={{
                    fontWeight: 'bold',
                    textAlign: 'left',
                    fontSize: 16,
                    color: 'white'
                }}>
                    (10 avis)
                </Text>
            </View>
        )
    }

    renderEventCard = (comment) => {
        let [day, time] = this.formatDate(comment.date);
        return (
            <CommentsCard
                id={comment.id}
                content={comment.content}
                day={day}
                time={time}
                writer={comment.writer}
                eventId={comment.eventId}
                children={comment.childComments}
                nbLik={comment.nbLike}
                likerIds={comment.likers}

            />
        )
            ;
    }
}

CommentList.displayName = 'CommentList'