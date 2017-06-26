import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet} from 'react-native';
import AppTextInput from '../../global/components/AppTextInput';
import * as db from '../../global/db';
import moment from 'moment';
import PropTypes from 'prop-types';

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
            commentId: this.props.commentId,
        };
        await db.comments.addChild(childComment);
        this.props.navigator.pop();
        this.props.refresh(this.props.eventId);
    }
};

CreateChildComment.propTypes = {
    userId: PropTypes.number.isRequired,
    eventId: PropTypes.number.isRequired,
    commentId: PropTypes.number.isRequired,
    refresh: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
    },
});