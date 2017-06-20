/**
 * Created by AAB3605 on 05/04/2017.
 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {removeVisibilityFilter, setVisibilityFilter} from '../actionCreators/visibilityFilter';
import Toggle from '../components/FilterToggle';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            onSelect: setVisibilityFilter,
            onUnselect: removeVisibilityFilter,
        },
        dispatch);
};

const VisibilityToggle = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Toggle);

VisibilityToggle.displayName = 'VisibilityToggle';

export default VisibilityToggle;