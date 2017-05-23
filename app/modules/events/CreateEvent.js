import React, {Component} from 'react';
import {ScrollView} from "react-native";
import {connect} from "react-redux";

class CreateEvent extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        return (
            <ScrollView>

            </ScrollView>
        );
    }

    onNavigatorEvent(event) {
        if (event.id === 'save') {
            console.warn('perform save event here');
        }
    }
}

CreateEvent.navigatorButtons = {
    rightButtons: [
        {
            title:'Enregistrer',
            id: 'save'
        }
    ]
};

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
});

export default connect(
    mapStateToProps,
)(CreateEvent);