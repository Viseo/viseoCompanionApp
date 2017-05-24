import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button} from "react-native";
import AppTextInput from "../global/AppTextInput";
import {addComment} from "../../util/db";
import moment from "moment";

export default class CreateComment extends Component {

    state = {
        comment: '',
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                <AppTextInput
                    label="Votre commentaire"
                    validator={(text) => this.isNonEmpty(text)}
                    value={this.props.lastName}
                    onChangeText={(comment) => this.setState({comment})}
                />
                <Button
                    style={{width: 200, height: 100}}
                    title="Envoyer"
                    onPress={() => this.sendComment()}
                />
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
            eventId: this.props.eventId,
        };
        addComment(comment);
        this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 15,
    },
});