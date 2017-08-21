import {connect} from 'react-redux';
import MyActionsTab from './MyActionsTab';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {noActionsForThisCategory} from './util';
import {fetchActions} from '../../actions/actions.actions';

function filterActionsByUser(actions, userId) {
    let hostedActions = actions.myItems.filter((action) => {
        return action.user.id === userId;
    });
    if (hostedActions.length === 0) {
        hostedActions.push(noActionsForThisCategory);
    }
    return hostedActions.sort((action1, action2) => {
        return moment(action1.dateStart) - moment(action2.dateStart);
    });
}

const mapStateToProps = ({actions, user}, ownProps) => ({
    actions: filterActionsByUser(actions, user.id),
    user,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            refresh: fetchActions,
        },
        dispatch,
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(MyActionsTab);