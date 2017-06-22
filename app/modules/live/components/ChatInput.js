import React, {Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

export default class ChatInput extends Component {

    state = {
        text: '',
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.mainContainer, this.props.style]}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this._onChangeText(text)}
                    value={this.state.text}
                    onSubmitEditing={() => {
                        this._sendMessage();
                    }}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {
                        this._sendMessage();
                    }}
                >

                </TouchableOpacity>
            </View>
        );
    }

    _onChangeText(text) {
        this.setState({
            text,
        });
    }

    _sendMessage() {
        const {text} = this.state;
        if (text !== '') {
            this.props.sendMessage(this.state.text);
            this.setState({text: ''});
        }
    }
}

ChatInput.propTypes = {
    navigator: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        height: 50,
    },
    textInput: {
        flex: 5,
        height: 40,
    },
    sendButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});