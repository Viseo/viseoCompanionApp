import React, {Component} from "react";
import {ListView,  View} from "react-native";
import ChildCommentsCards from "./childCommentsCard";
import AppText from "./appText";
import moment from "moment";
import colors from "./colors";

export default class ChildCommentList extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {

                for (let key in r1) {
                    if (!r2.hasOwnProperty(key))
                        return true;
                    if (r1[key] !== r2[key])
                        return true
                }
                return false
            }
        });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.childComment)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.childComment)
        });
    }

    formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split('/');
    }

    render() {
        const childCommentsList = (
            <ListView

                scrollEventThrottle={200}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderChildCommentCard}
            />
        );

        return (
            <View style={[{flex: 1, flexDirection: 'column'}, this.props.style]}>
                {
                    childCommentsList
                }
            </View>
        )
    }
    formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split('/');
    }

    renderChildCommentCard = (childComment) => {
        let [day, time] = this.formatDate(childComment.datetime);

        return (
            <ChildCommentsCards
                id={childComment.id}
                content={childComment.content}
                day={day}
                time={time}
                writer={childComment.writer}
                eventId={childComment.eventId}
                nbLik={childComment.nbLike}
                navigator={this.props.navigator}
            />
        )
    }
}

ChildCommentList.displayName = 'ChildCommentList';