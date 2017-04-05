/**
 * Created by AAB3605 on 05/04/2017.
 */
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setVisibilityFilter, removeVisibilityFilter} from '../actionCreators/visibilityFilter'
import Toggle from './../components/events/toggle'

const mapStateToProps = (state, ownProps) => ({
    filter: ownProps.filter
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            onSelect: setVisibilityFilter,
            onUnselect: removeVisibilityFilter,
        },
        dispatch)
}

const VisibilityToggle = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toggle)

export default VisibilityToggle