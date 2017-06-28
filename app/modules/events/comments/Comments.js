import React, {Component} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import colors from "../../global/colors";
import {bindActionCreators} from "redux";
import {defaultNavBarStyle} from "../../global/navigatorStyle";
import {getComments} from "./comments.actions";
import {connect} from "react-redux";
import AppText from "../../global/components/AppText";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import PropTypes from "prop-types";
import CommentCard from "./CommentCard";
import * as db from "../../global/db";

class Comments extends Component {

    state = {
        rating: 0,
        countReviews:0
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    componentWillMount() {
       this.props.refresh(this.props.eventId);
       this._getRatingAverage();
    }

    render() {
        const commentsList = (
            <FlatList
                data={this.props.comments}
                keyExtractor={(comment, index) => comment.id}
                renderItem={({item}) => this._renderCommentCard(item)}
                onRefresh={() => this.props.refresh(this.props.eventId)}
                ListEmptyComponent={() => {
                    return this._renderEmptyCommentCard();
                }}
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
        if (event.id === "addComment") {
            this._goToAddComment();
        }
    }

    _formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split("/");
    }

    _goToAddComment() {
        this.props.navigator.push({
            screen: "CreateComment",
            title: "Ajouter un commentaire",
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                eventId: this.props.eventId,
                refresh: this.props.refresh,
                user: this.props.user,
            },
        });
    }

    async _getRatingAverage() {

        let ratingCountReviews = await db.events.getRatingAverage(this.props.eventId);
        const [countReviews,rating]=ratingCountReviews;
        this.setState({countReviews:parseInt(countReviews)});
        this.setState({rating: rating});
    }

    _renderAvis() {
        const {rating,countReviews} = this.state;
        return (
            <View style={{flexDirection: "row", flex: 3}}>
                <Text style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: 16,
                    color: "white",
                }}>
                    {rating} %
                </Text>
                <Icon name="star" style={{
                    backgroundColor: "transparent",
                    textAlign: "left",
                }} size={20}
                      color={this._getColor(parseInt(rating))} />
                <Text style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: 16,
                    color: "white",
                }}>
                      ( {countReviews} Avis )
                </Text>
            </View>
        );
    }
    _getColor(val) {
        let hsl = require('hsl-to-hex');
        let hue = this._percentageToHsl(val / 100, 0, 120);
        let saturation = 100;
        let luminosity = 50;
        return hsl(hue, saturation, luminosity);
    }

    _percentageToHsl(percentage, hue0, hue1) {
        const hue = (percentage * (hue1 - hue0)) + hue0;
        return hue;
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
                    fullSize={false}
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
                        textAlign: "center",
                        color: colors.mediumGray,
                        backgroundColor: "white",
                        height: 50,
                        borderRadius: 4,
                        textAlignVertical: "center",
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
            <View style={{flexDirection: "row", flex: 0.05, alignItems: "stretch"}}>
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
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: 20,

                    color: "white",
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
        flexDirection: "column",
        backgroundColor: colors.blue,
        paddingHorizontal: 15,
    },
});