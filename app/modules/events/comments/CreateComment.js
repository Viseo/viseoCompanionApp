import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button} from "react-native";
import AppTextInput from "../../global/AppTextInput";
import {addComment} from "../../global/db";
import moment from "moment";
import PropTypes from "prop-types";

export default class CreateComment extends Component {

    state = {
        comment: '',
    };

    constructor(props) {
        super(props);
    }

    render() {
        const submitButton =
            (<Button
                style={{width: 200, height: 100}}
                title="Envoyer"
                onPress={() => {
                    this._sendComment();
                }}
            />);
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                <AppTextInput
                    label="Votre commentaire"
                    validator={(text) => this._isNonEmpty(text)}
                    value={this.state.comment}
                    onChangeText={(comment) => this.setState({comment})}
                    onSubmitEditing={ () => {
                        this._sendComment();
                    }}
                />
                {submitButton}
            </ScrollView>
        );
    }

    _isNonEmpty(text) {
        return text.length > 0;
    }

    async _sendComment() {
        const comment = {
            content: this.state.comment,
            datetime: moment().valueOf(),
            writer: {
                id: this.props.user.id,
            },
            eventId: this.props.eventId,
            publish: true,
        };
        await addComment(comment);
        this.props.navigator.pop();
        this.props.refresh(this.props.eventId);
    }
}

CreateComment.propTypes = {
    user: PropTypes.object.isRequired,
    eventId: PropTypes.number.isRequired,
    refresh: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
    },
});