/**
 * Created by LMA3606 on 04/04/2017.
 */

import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import ImagePicker from "react-native-image-picker";
import strings from "./../util/localizedStrings";
import FlexImage from "./../components/FlexImage";

export default class EditableImage extends Component {

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

        ImagePicker.showImagePicker(options, (response) => {
            if (!response.didCancel && !response.error) {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    selectedPicture: source
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
                        <FlexImage
                            resizeMode='stretch'
                            source={this.state.selectedPicture}
                            className="image"
                            style={this.props.style}
                        />
                        :
                        <Text
                            className="placeholder"
                            style={styles.placeholder}
                        >
                            {strings.selectPicture}
                        </Text>
                }
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    placeholder: {
        textAlign: 'center'
    }
});