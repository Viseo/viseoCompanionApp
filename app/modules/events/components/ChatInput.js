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
                    onFocus={() => hideTabBar(this.props.navigator)}
                    onBlur={() => showTabBar(this.props.navigator)}
                    value={this.state.text}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {}}
                >
                    <Icon name="paper-plane"/>
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
        flex: 1,
        flexDirection: 'row',
    },
    textInput: {
        flex: 5,
    },
    sendButton: {
        flex: 1,
    }
});