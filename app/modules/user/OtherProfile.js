import React, {Component} from 'react';
import {connect} from 'react-redux';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import ProfileDetails from './ProfileDetails';
import {bindActionCreators} from 'redux';
import {getUser} from './user.actions';
import PropTypes from 'prop-types';
import AppText from '../global/components/AppText';

class OtherProfile extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getUser(this.props.otherProfileId);
    }

    render() {
        return !this.props.isFetching ?
            <ProfileDetails user={this.props.otherProfile}/>
            :
            <AppText>
                Chargement ...
            </AppText>;
    }
}

OtherProfile.navigatorStyle = defaultNavBarStyle;

OtherProfile.propTypes = {
    otherProfileId: PropTypes.number.isRequired,
};

const mapStateToProps = ({user}, ownProps) => ({
    otherProfile: user.otherProfile,
    isFetching: user.isFetching,
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUser,
    }, dispatch);
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OtherProfile);