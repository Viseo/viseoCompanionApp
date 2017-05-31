import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button} from "react-native";
import AppTextInput from "../global/AppTextInput";
import {addComment,updateComment} from "../../util/db";
import moment from "moment";
import {} from "../../actionCreators/comments";

export default class CreateComment extends Component {

    state = {
        comment: this.props.comment.content,
    };

    constructor(props) {
        super(props);
    }

    render() {
        let editing = this.props.modifComment;
        const renderButtons = editing ?
            (<Button
                style={{width: 200, height: 100}}
                title="Modifier"
                onPress={() => this.ModifyComment()}
            />)
            :
            (<Button
                style={{width: 200, height: 100}}
                title="Envoyer"
                onPress={() => this.sendComment()}
            />);

        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                <AppTextInput
                    label="Votre commentaire"
                    validator={(text) => this.isNonEmpty(text)}
                    value={this.props.comment.content}
                    onChangeText={(comment) => this.setState({comment})}
                />
                {renderButtons}
            </ScrollView>
        );
    }



    isNonEmpty(text) {
        return text.length > 0;
    }



    async sendComment() {
        const comment = {
            content: this.state.comment,
            datetime: moment().valueOf(),
            writer: {
                id: 1,
            },
            eventId: 2,
        };
        addComment(comment);
        this.props.navigator.pop();
    }


    async ModifyComment(){

        const comment = {
            content: this.state.comment,
            datetime: moment().valueOf(),
            id: this.props.comment.id,
            version: this.props.comment.version,
            event_id: this.props.comment.eventId,
            user_id: this.props.comment.userId,
            children: this.props.comment.children,
            nbLike: this.props.comment.nbLike,
            likerIds: this.props.comment.likerIds,
            writer: this.props.comment.writer,
        };

        updateComment(comment);
        this.props.navigator.pop();


    }
}



const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 15,
    },
});