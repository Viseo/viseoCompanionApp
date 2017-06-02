import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button} from "react-native";
import AppTextInput from "../global/AppTextInput";
import {updateComment} from "../../util/db";
import moment from "moment";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getComments} from "../../actionCreators/comments";

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
            event_id: this.props.comment.eventId,
            writer: this.props.comment.writer,
            version: this.props.comment.version,
            children: this.props.children,
            likers: this.props.comment.likers,
            nbLike: this.props.comment.nbLike,
        };
        await updateComment(comment);
        this.props.getComments(comment.event_id);
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