import React, {Component} from 'react';
import AppTextInput from '../global/components/AppTextInput';
import AppText from '../global/components/AppText';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import ImagePicker from '../global/components/ImagePicker';
import PropTypes from 'prop-types';
import {Dimensions, Picker, ScrollView, StyleSheet, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import colors from '../global/colors';
const Permissions = require('react-native-permissions');

export default class EventForm extends Component {

    dateFormat = 'DD/MM/YYYY [à] HH:mm';
    state = {
        category: this.props.category.toString(),
        description: this.props.description,
        location: this.props.location,
        locationError: 'field not filled',
        name: this.props.name,
        nameError: 'field not filled',
        formattedDate: moment(this.props.datetime).format(this.dateFormat),
        imageUrl: null,
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._setDefaultValues();
        console.disableYellowBox = true;
    }

    render() {

        const nameField = this._renderNameField();
        const descriptionField = this._renderDescriptionField();
        const locationField = this._renderLocationField();
        const categoryPicker = this._renderCategoryPicker();
        const datePicker = this._renderDatePicker();
        const imagePicker = this._renderImagePicker();
        return (
            <ScrollView contentContainerStyle={styles.pageStyle} style={{backgroundColor: 'white'}}>
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

    _renderCategoryPicker() {
        return (
            <View style={styles.categoryContainer}>
                <AppText style={styles.categoryLabel}>Category : </AppText>
                <Picker
                    style={styles.categoryPicker}
                    selectedValue={this.state.category}
                    onValueChange={(itemValue, itemIndex) => {
                        this.props.setCategory(itemValue);
                        this.setState({category: itemValue});
                    }}>
                    <Picker.Item label="important" value="0"/>
                    <Picker.Item label="informatif" value="1"/>
                    <Picker.Item label="divertissement" value="2"/>
                </Picker>
            </View>
        );
    }

    _renderDatePicker() {
        const currentDate = moment().toDate();
        const selectedDate = this.state.formattedDate.length > 0 ?
            this.state.formattedDate :
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
                    onDateChange={formattedDate => {
                        this.setState({formattedDate});
                        const datetime = moment(formattedDate, this.dateFormat).valueOf();
                        this.props.setDate(datetime);
                    }}
                />
            </View>
        );
    }

    _renderDescriptionField() {
        return (
            <AppTextInput
                ref="description"
                label="Description"
                value={this.state.description}
                onChangeText={description => this.props.setDescription(description)}
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
                    onSelected={imageUrl => this.props.setImage(imageUrl)}
                />
            </View>
        );
    }

    _renderLocationField() {
        return (

            <GooglePlacesAutocomplete
                placeholder='Location'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'location'}
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={(row) => row.description} // custom description render
                onPress={(text) =>   this.props.setLocation(text.description)}
                getDefaultValue={() => {
                    return '';
                }}
                query={{
                    key: 'AIzaSyAh7zH3Wh2O7DFysEETBw0mh7xbkxf6X18',
                    language: 'fr',
                    types: 'establishment',
                }}
                styles={{
                    textInputContainer: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                    },
                    textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.lightGray,

                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },

                }}
                currentLocation={false}
                debounce={200}
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
                    const nameError = this._getNameError(name);
                    this.setState({
                        name,
                        nameError,
                    });
                    this.props.setName(nameError ? null : name);
                }}
                onSubmitEditing={ () => {
                    this.refs.description.focus();
                }}
            />
        );
    }

    _setDefaultValues() {
        //console.warn(this.state.location);
        this.props.setLocation(this.state.location);
        this.props.setDate(this.state.datetime);
        this.props.setCategory(this.state.category);
        this.props.setImage(this.state.imageUrl);
        this.props.setDescription(this.state.description);
        this.props.setName(this.state.name);
    }
};

EventForm.defaultProps = {
    category: 1,
    description: '',
    location: '',
    name: '',
    datetime: moment().valueOf(),
    formattedDate: '',
    imageUrl: null,
};

EventForm.propTypes = {
    category: PropTypes.number,
    description: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    formattedDate: PropTypes.string,
    datetime: PropTypes.number,
    imageUrl: PropTypes.string,
    setName: PropTypes.func.isRequired,
    setDescription: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    setDate: PropTypes.func.isRequired,
    setImage: PropTypes.func.isRequired,
};

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