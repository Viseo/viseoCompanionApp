import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button} from "react-native";
import AppTextInput from "../global/AppTextInput";
import {addComment, updateComment} from "../../util/db";
import moment from "moment";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getComments} from "../../actionCreators/comments";

class CreateComment extends Component {

    state = {
        comment: this.props.comment.content,
    };

    constructor(props) {
        super(props);
    }

    render() {

        const renderButtons =


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



}

