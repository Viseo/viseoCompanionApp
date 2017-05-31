/**
 * Created by IBO3693 on 23/05/2017.
 */


import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getComments} from "../actionCreators/comments";
import CommentList from "../components/commentsList";

const mapStateToProps = (state, ownProps) => ({
    comments:  state.comments.commentsItems,
    event: state.events.itemsExpired.find(event => event.id === ownProps.eventId),
    refreshing: state.comments.isFetching,
    userId:state.user.id,
        ...ownProps

})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        refresh: getComments

    }, dispatch)
}

const CommentsList = connect(
    mapStateToProps,
    mapDispatchToProps


)(CommentList)

export default CommentsList
