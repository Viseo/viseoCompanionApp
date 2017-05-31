import React, {Component} from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from 'prop-types';
import {hideTabBar, showTabBar} from "../../global/navigationUtil";

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
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {}}
                >
                    <Icon name="paper-plane" style={{fontSize: 20}}/>
                </TouchableOpacity>
            </View>
        );
    }

    _onChangeText(text) {
        this.setState({
            text,
        })
    }
}

ChatInput.propTypes = {
    navigator: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        height:50,
    },
    textInput: {
        flex: 5,
        height:40,
    },
    sendButton: {
        flex: 1
    }
});