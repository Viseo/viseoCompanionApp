import {connect} from 'react-redux';
import MyActionsTab from './MyActionsTab';
import {bindActionCreators} from 'redux';
import * as db from '../../global/db';

function getActionsByUser(actions, user) {
    const hosted = db.actions.getActivities();
    console.warn(hosted);
    return hosted;
}

const mapStateToProps = ({actions, user}, ownProps) => ({
    actions: getActionsByUser(actions, user),
    user,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({},
        dispatch,
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(MyActionsTab);