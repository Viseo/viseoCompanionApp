/**
 * Created by AAB3605 on 05/04/2017.
 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addFilter, removeFilter} from '../actionCreators/filters';
import Toggle from '../components/FilterToggle';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            onSelect: addFilter,
            onUnselect: removeFilter,
        },
        dispatch);
};

const FilterToggle = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Toggle);

FilterToggle.displayName = 'FilterToggle';

export default FilterToggle;