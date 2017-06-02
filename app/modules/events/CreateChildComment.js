import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button} from "react-native";
import AppTextInput from "../global/AppTextInput";
import {addChildComment} from "../global/db";
import moment from "moment";

export default class CreateChildComment extends Component {

    state = {
        childComment: '',
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                <AppTextInput
                    label="Votre réponse au commentaire"
                    validator={(text) => this.isNonEmpty(text)}
                    value={this.props.lastName}
                    onChangeText={(childComment) => this.setState({childComment})}
                />
                <Button
                    style={{width: 200, height: 100}}
                    title="Repondre"
                    onPress={() => this.sendChildComment()}
                />
            </ScrollView>
        );
    }

    isNonEmpty(text) {
        return text.length > 0;
    }

    async sendChildComment() {
        const childComment = {
            content: this.state.childComment,
            datetime: moment().valueOf(),
            writer:{
                id: 1
            },
            eventId: 25,
        };

        addChildComment(childComment);
        this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 15,
    },
});