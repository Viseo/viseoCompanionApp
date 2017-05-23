/**
 * Created by IBO3693 on 23/05/2017.
 */
/**
 * Created by HEL3666 on 11/05/2017.
 */

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getComments} from "../actionCreators/comments";
import CommentsCard from "../components/commentsCard";

const mapStateToProps = (state, ownProps) => ({
    events:  state.comments.commentsItems,
        ...ownProps

})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        refresh: getComments

    }, dispatch)
}

const commentList = connect(
    mapStateToProps,
    mapDispatchToProps

)(CommentsCard)

export default commentList
