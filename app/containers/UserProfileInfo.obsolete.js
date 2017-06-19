/**
 * Created by VBO3596 on 18/04/2017.
 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUser} from './../actionCreators/user';
import UserProfileInfo from '../components/UserProfileInfo.obsolete';

const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    ...ownProps
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            updateUser,
        },
        dispatch);
};

const ProfileInfo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserProfileInfo);

export default ProfileInfo;