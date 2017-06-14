import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Picker from 'react-native-image-picker';
import strings from '../localizedStrings';
import AppText from './AppText';
import PropTypes from 'prop-types';

export default class ImagePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPicture: this.props.defaultPicture,
        };
    }

    selectPhotoTapped = () => {
        const options = {
            title: strings.selectPictureDialog,
            cancelButtonTitle: strings.cancelButtonTitle,
            takePhotoButtonTitle: strings.takePhotoButtonTitle,
            chooseFromLibraryButtonTitle: strings.chooseFromLibraryButtonTitle,
            allowsEditing: true,
            mediaType: 'photo',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
        };

        Picker.showImagePicker(options, (response) => {
            if (!response.didCancel && !response.error) {
                let source = {uri: response.uri};
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    selectedPicture: source,
                });
                this.props.onSelected(response.uri);
            }
        });
    };

    render() {
        return (
            <TouchableOpacity
                style={{flex: 1}}
                onPress={this.selectPhotoTapped}
            >
                {
                    this.state.selectedPicture ?
                        <Image
                            source={this.state.selectedPicture}
                            style={this.props.style}
                        />
                        :
                        <AppText
                            className="placeholder"
                            style={styles.placeholder}
                        >
                            {strings.selectPicture}
                        </AppText>
                }
            </TouchableOpacity>
        );
    }
}

ImagePicker.propTypes = {
    onSelected: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    placeholder: {
        textAlign: 'center',
    },
});