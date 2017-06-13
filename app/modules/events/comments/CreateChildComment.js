import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button} from 'react-native';
import AppTextInput from '../../global/AppTextInput';
import {addChildComment} from '../../global/db';
import moment from 'moment';
import PropTypes from "prop-types";

export default class CreateChildComment extends Component {

    state = {
        childComment: '',
    };

    constructor(props) {
        super(props);
    }

    render() {
        const submitButton =
            (<Button
                style={{width: 200, height: 100}}
                title="Répondre"
                onPress={() => {
                    this._sendChildComment();
                }}
            />);
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                <AppTextInput
                    label="Votre réponse au commentaire"
                    validator={(text) => this._isNonEmpty(text)}
                    value={this.props.lastName}
                    onChangeText={(childComment) => this.setState({childComment})}
                    onSubmitEditing={ () => {
                        this._sendChildComment();
                    }}
                />
                {submitButton}
            </ScrollView>
        );
    }

    _isNonEmpty(text) {
        return text.length > 0;
    }

    async _sendChildComment() {
        const childComment = {
            content: this.state.childComment,
            datetime: moment().valueOf(),
            writer: {
                id: this.props.userId,
            },
            eventId: this.props.eventId,
            commentId: this.props.commentId
        };
        await addChildComment(childComment);
        this.props.navigator.pop();
        this.props.refresh(this.props.eventId);
    }
};

CreateChildComment.propTypes = {
    userId: PropTypes.string.isRequired,
    eventId: PropTypes.string.isRequired,
    commentId: PropTypes.string.isRequired,
    refresh: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
    },
});