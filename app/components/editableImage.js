/**
 * Created by LMA3606 on 04/04/2017.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Image,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import strings from './../util/localizedStrings';

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
            mediaType:'photo',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (!response.didCancel && !response.error) {
                let source = { uri: response.uri };

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
            <View style={styles.container}>
                <TouchableOpacity onPress={this.selectPhotoTapped}>
                    <View style={[styles.picture, styles.pictureContainer, {marginBottom: 20}]}>
                        { this.state.selectedPicture === null ? <Text className="placeholder" style={styles.placeholder}>{strings.selectPicture}</Text> :
                            <Image style={styles.picture} source={this.state.selectedPicture} className="image"/>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pictureContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    picture: {
        borderRadius: 75,
        width: 150,
        height: 150
    },
    placeholder: {
        textAlign: 'center'
    }
});