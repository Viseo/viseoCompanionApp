import React, {Component} from 'react';
import {connect} from 'react-redux';
import EventForm from './EventForm';
import {showInvalidFormPopup} from '../global/navigationUtil';
import moment from 'moment';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {fetchEvents, updateEvent} from './event.actions';

class EditEvent extends Component {

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
            this._updateEvent();
        }
    }

    render() {
        const {eventToEdit} = this.props;
        return (
            <EventForm
                category={eventToEdit.category}
                description={eventToEdit.description}
                location={eventToEdit.location}
                name={eventToEdit.name}
                datetime={eventToEdit.date}
                imageUrl={eventToEdit.imageUrl}
                setName={(name) => this.setState({name})}
                setDescription={(description) => this.setState({description})}
                setLocation={(location) => this.setState({location})}
                setCategory={(category) => this.setState({category})}
                setDate={(date) => this.setState({date})}
                setImage={(image) => this.setState({image})}
            />
        )
    }

    async _updateEvent() {
        const isFormValid = this.state.name && this.state.location;
        if (isFormValid) {
            const {id, version} = this.props;
            await this.props.updateEvent({
                name: this.state.name,
                description: this.state.description,
                datetime: moment(this.state.date, this.dateFormat).valueOf(),
                category: this.state.category,
                location: this.state.location,
                image: this.state.image,
                version,
                id,
            }, this.props.user.id);
            this.props.refresh();
            this.props.navigator.pop();
        } else {
            showInvalidFormPopup();
        }
    }
}

EditEvent.propTypes = {
    eventId: PropTypes.number.isRequired,
    eventToEdit: PropTypes.object.isRequired,
};

EditEvent.navigatorButtons = {
    rightButtons: [
        {
            title: 'Enregistrer',
            id: 'save',
        },
    ],
};

const mapStateToProps = ({user, events}, ownProps) => ({
    user,
    eventToEdit: events.items.find(event => event.id === ownProps.eventId),
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateEvent,
        refresh: fetchEvents,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditEvent);
