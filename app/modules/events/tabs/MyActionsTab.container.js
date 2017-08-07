import {connect} from 'react-redux';
import MyActionsTab from './MyActionsTab';
import {bindActionCreators} from 'redux';

const mapStateToProps = ({actions}, ownProps) => ({
    actions,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({},
        dispatch,
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(MyActionsTab);