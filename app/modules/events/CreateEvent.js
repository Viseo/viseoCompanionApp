import React, {Component} from 'react';
import {Picker, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import AppTextInput from '../global/AppTextInput';
import AppText from '../global/AppText';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

class CreateEvent extends Component {

    state = {
        category: 1,
        description: '',
        name: '',
        datetime: '',
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.id === 'save') {
            console.warn('perform save event here');
        }
    }

    render() {
        const nameField = this._renderNameField();
        const descriptionField = this._renderDescriptionField();
        const categoryPicker = this._renderCategoryPicker();
        const datePicker = this._renderDatePicker();
        return (
            <ScrollView>
                {nameField}
                {descriptionField}
                {categoryPicker}
                {datePicker}
            </ScrollView>
        );
    }

    _isNonEmpty(text) {
        return text.length > 0;
    }

    _renderCategoryPicker() {
        return (
            <View>
                <AppText>Category: </AppText>
                <Picker
                    selectedValue={this.state.category}
                    onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
                    <Picker.Item label="important" value="0"/>
                    <Picker.Item label="informatif" value="1"/>
                    <Picker.Item label="divertissement" value="2"/>
                </Picker>
            </View>
        );
    }

    _renderDatePicker() {
        const currentDate = moment().toDate();
        const selectedDate = this.state.datetime.length > 0 ?
            this.state.datetime :
            currentDate;
        return (
            <DatePicker
                date={selectedDate}
                mode="datetime"
                format="YYYY/MM/DD HH:mm"
                minDate={currentDate}
                placeholder='Sélectionnez une date..'
                confirmBtnText="OK"
                cancelBtnText="Annuler"
                onDateChange={datetime => this.setState({datetime})}
            />
        );
    }

    _renderDescriptionField() {
        return (
            <AppTextInput
                ref="description"
                label="Description"
                validator={(text) => this._isNonEmpty(text)}
                value={this.state.description}
                onChangeText={description => {
                    this.setState({
                        description,
                    });
                }}
            />
        );
    }

    _renderNameField() {
        return (
            <AppTextInput
                label="Nom"
                validator={(text) => this._isNonEmpty(text)}
                value={this.state.name}
                onChangeText={name => {
                    this.setState({
                        name,
                    });
                }}
                onSubmitEditing={ () => {
                    this.refs.description.focus();
                }}
            />
        );
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

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
});

export default connect(
    mapStateToProps,
)(CreateEvent);