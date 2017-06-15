import React, {Component} from 'react';
import {connect} from 'react-redux';
import EventForm from './EventForm';
import {showInvalidFormPopup} from '../global/navigationUtil';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {addEvent, fetchEvents} from './event.actions';

class CreateEvent extends Component {

    state = {
        name: null,
        description: null,
        location: null,
        category: null,
        date: null,
        image: null,
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.id === 'save') {
            this._saveEvent();
        }
    }

    render() {
        return (
            <EventForm
                setName={(name) => this.setState({name})}
                setDescription={(description) => this.setState({description})}
                setLocation={(location) => this.setState({location})}
                setCategory={(category) => this.setState({category})}
                setDate={(date) => this.setState({date})}
                setImage={(image) => this.setState({image})}
            />
        )
    }

    async _saveEvent() {
        const isFormValid = this.state.name && this.state.location;
        if(isFormValid) {
            await this.props.addEvent({
                name: this.state.name,
                description: this.state.description,
                datetime: moment(this.state.date, this.dateFormat).valueOf(),
                category: this.state.category,
                location: this.state.location,
                image: this.state.image,
            }, this.props.user.id);
            this.props.refresh();
            this.props.navigator.pop();
        } else {
            showInvalidFormPopup();
        }
    }
}

CreateEvent.navigatorButtons = {
    rightButtons: [
        {
            title: 'Enregistrer',
            id: 'save',
        },
    ],
};

const mapStateToProps = ({user}, ownProps) => ({
    user,
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addEvent,
        refresh: fetchEvents,
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateEvent);
