import React, {Component} from 'react';
import {Picker, ScrollView, View, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import AppTextInput from '../global/components/AppTextInput';
import AppText from '../global/components/AppText';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import ImagePicker from '../global/components/ImagePicker';
import {addEvent} from '../global/db';
import colors from '../global/colors';
import {showInvalidFormPopup} from '../global/navigationUtil';

class CreateEvent extends Component {

    // todo handle image upload
    // todo auto refresh after addEvent
    // todo dispatch addEvent into redux store

    dateFormat = 'YYYY/MM/DD HH:mm';
    state = {
        category: 1,
        description: '',
        location: '',
        locationError: 'field not filled',
        name: '',
        nameError: 'field not filled',
        datetime: moment().format(this.dateFormat),
        imageUri: null,
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
        const nameField = this._renderNameField();
        const descriptionField = this._renderDescriptionField();
        const locationField = this._renderLocationField();
        const categoryPicker = this._renderCategoryPicker();
        const datePicker = this._renderDatePicker();
        const imagePicker = this._renderImagePicker();
        return (
            <ScrollView contentContainerStyle={styles.pageStyle}>
                {nameField}
                {descriptionField}
                {locationField}
                {categoryPicker}
                {datePicker}
                {imagePicker}
            </ScrollView>
        );
    }

    _getLocationError(location) {
        if (location.length < 2) {
            return 'Le lieu doit contenir au moins deux caractères.';
        } else {
            const regexLocation = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s\-']*$/;
            if (!regexLocation.test(location)) {
                return 'Le lieu doit seulement contenir des caractères alphanumériques, tiret ou apostrophe.';
            }
        }
        return null;
    }

    _getNameError(name) {
        if (name.length < 2 || name.length > 31) {
            return 'Le nom doit contenir entre 2 et 30 caractères.';
        } else {
            const regexTitle = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\s\-,'?!"/+*#]*$/;
            if (!regexTitle.test(name)) {
                return 'Le nom doit seulement contenir des caractères alphanumériques et ., -, \', ", /, +, *, #, ?, !';
            }
        }
        return null;
    }

    _isNonEmpty(text) {
        return text.length > 0;
    }

    _renderCategoryPicker() {
        return (
            <View style={styles.categoryContainer}>
                <AppText style={styles.categoryLabel}>Category : </AppText>
                <Picker
                    style={styles.categoryPicker}
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
            <View style={styles.dateContainer}>
                <AppText style={styles.dateLabel}>Date : </AppText>
                <DatePicker
                    style={styles.datePicker}
                    date={selectedDate}
                    mode="datetime"
                    format={this.dateFormat}
                    minDate={currentDate}
                    placeholder='Sélectionnez une date..'
                    confirmBtnText="OK"
                    cancelBtnText="Annuler"
                    onDateChange={datetime => this.setState({datetime})}
                />
            </View>
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
                onSubmitEditing={ () => {
                    this.refs.location.focus();
                }}
            />
        );
    }

    _renderImagePicker() {
        const defaultPicture = require('../../images/events/defaultEventImage.jpeg');
        return (
            <View>
                <AppText style={styles.imageLabel}>Image : </AppText>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <AppText styles={styles.imagePickerCaption}>Cliquez pour changer d'image</AppText>
                </View>
                <ImagePicker
                    defaultPicture={defaultPicture}
                    style={styles.image}
                    onSelected={imageUri => this.setState({imageUri})}
                />
            </View>
        );
    }

    _renderLocationField() {
        return (
            <AppTextInput
                ref="location"
                label="Lieu"
                validator={(location) => !this._getLocationError(location)}
                invalidTextMessage={this.state.locationError}
                value={this.state.location}
                onChangeText={location => {
                    this.setState({
                        location,
                        locationError: this._getLocationError(location),
                    });
                }}
            />
        );
    }

    _renderNameField() {
        return (
            <AppTextInput
                label="Nom"
                validator={(name) => !this._getNameError(name)}
                invalidTextMessage={this.state.nameError}
                value={this.state.name}
                onChangeText={name => {
                    this.setState({
                        name,
                        nameError: this._getNameError(name),
                    });
                }}
                onSubmitEditing={ () => {
                    this.refs.description.focus();
                }}
            />
        );
    }

    async _saveEvent() {
        const isFormValid = !this.state.nameError && !this.state.locationError;
        if(isFormValid) {
            await addEvent({
                name: this.state.name,
                description: this.state.description,
                datetime: moment(this.state.datetime, this.dateFormat).valueOf(),
                category: this.state.category,
                location: this.state.location,
            }, this.props.user.id);
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

export default connect(
    mapStateToProps,
)(CreateEvent);

const {height, width} = Dimensions.get('window');
const spaceBetweenFields = 10;
const styles = StyleSheet.create({
    categoryContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: spaceBetweenFields,
    },
    categoryLabel: {
        flex: 1,
        fontWeight: 'bold',
    },
    categoryPicker: {
        flex: 2,
    },
    dateContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: spaceBetweenFields,
    },
    dateLabel: {
        flex: 1,
        fontWeight: 'bold',
    },
    datePicker: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    errorInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic',
    },
    image: {
        width,
        height: height / 3,
    },
    imageLabel: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    imagePickerCaption: {
        fontStyle: 'italic',
    },
    pageStyle: {
        paddingHorizontal: 15,
    },
});