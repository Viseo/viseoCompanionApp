/**
 * Created by IBO3693 on 23/05/2017.
 */
/**
 * Created by HEL3666 on 11/05/2017.
 */

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getComments} from "../actionCreators/comments";
import CommentList from "../components/commentsList";

const mapStateToProps = (state, ownProps) => ({
    comments:  state.comments.commentsItems,
    refreshing: state.comments.isFetching,
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
