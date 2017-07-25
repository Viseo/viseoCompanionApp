import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Action extends Component {

    constructor(props) {
        super(props);
        this.props.navigator(this.bind(this));
    }

    render() {
        return (
            null
        );
    }
}

const mapStateToProps = ({user}, ownProps) => ({
    user,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Action);