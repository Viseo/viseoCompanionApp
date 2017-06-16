import React, {Component} from 'react';
import {connect} from 'react-redux';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import ProfileDetails from './ProfileDetails';

class OthersProfile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ProfileDetails user={this.props.user}/>
        );
    }
}

OthersProfile.navigatorStyle = defaultNavBarStyle;

const mapStateToProps = ({user}, ownProps) => ({
    user,
    ...ownProps,
});

export default connect(
    mapStateToProps,
)(OthersProfile);