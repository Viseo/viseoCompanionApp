/**
 * Created by LMA3606 on 04/04/2017.
 */

import React from 'react';
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

export default class EditableImage extends React.Component {

    state = {
        selectedPicture: null,
    };

    selectPhotoTapped = () => {
        const options = {
            mediaType:'photo',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.warn('User cancelled photo picker');
            }
            else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.warn('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    selectedPicture: source
                });
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.selectPhotoTapped}>
                    <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                        { this.state.selectedPicture === null ? <Text>Select a Photo</Text> :
                            <Image style={styles.avatar} source={this.state.selectedPicture} />
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
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
    }
});