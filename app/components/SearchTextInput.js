/**
 * Created by AAB3605 on 15/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Image
} from 'react-native';

class SearchTextInput extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TextInput
                style={[styles.input,this.props.style]}
                placeholder={this.props.placeholder}
                onChangeText={this.props.onChangeText}
                underlineColorAndroid='rgba(0,0,0,0)'
            />
        );
    }
}

SearchTextInput.displayName = 'SearchTextInput'

export default SearchTextInput;

const styles = StyleSheet.create({
    input: {
        flex: 1,
        fontSize: 15,
        backgroundColor: 'transparent',
        textAlign: 'center',
        padding: 0,
    }
});