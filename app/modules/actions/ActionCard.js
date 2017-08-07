import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class ActionCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (null);
    }
}

ActionCard.propTypes = {
    actionId: PropTypes.number.isRequired,
    action: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
};

const mapStateToProps = ({actions, user, searchWords}, ownProps) => ({
    action: actions.items.find(action => parseInt(action.id) === ownProps.actionId),
    searchWords,
    user,
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActionCard);