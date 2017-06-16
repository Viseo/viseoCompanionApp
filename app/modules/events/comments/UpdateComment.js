import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button} from "react-native";
import AppTextInput from "../../global/components/AppTextInput";
import {updateComment} from "../../global/db";
import moment from "moment";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getComments} from "./comments.actions";

class UpdateComment extends Component {

    state = {
        comment: this.props.comment.content,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const renderButtons =
            <Button
                style={{width: 200, height: 100}}
                title="Modifier"
                onPress={() => this.modifyComment()}
            />;
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

    modifyComment = async () => {
        const comment = {
            id: this.props.comment.id,
            content: this.state.comment,
            datetime: moment().valueOf(),
            version: this.props.comment.version,
        };
        await updateComment(comment);
        // TODO use getComment instead of getCommentsByEvent
        this.props.refresh(this.props.comment.eventId);
        this.props.navigator.pop();
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getComments
    }, dispatch)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateComment);

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 15,
    },
});
