/**
 * Created by VBO3596 on 17/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    TextInput,
} from 'react-native';
import styles from './../styles/form';
import strings from '../util/localizedStrings';

class PasswordInput extends Component {

    static defaultProps = {
        placeholder: strings.password,
        style: styles.textInput,
        underlineColorAndroid: "white",
        minLength:6,
        returnKeyType: "done",
        onSubmitEditing: () => {},
        onChangeText:(password) => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            password: null
        };
    }

    editPassword = (password) => {
        this.setState({
            password: password
        })
        this.props.onChangeText(password);
    }

    focus(){
        this.refs.password.focus();
    }

    render() {
        return (
            <View>
                <TextInput
                    style={this.props.style}
                    onChangeText={this.editPassword}
                    placeholder= {this.props.placeholder}
                    ref="password"
                    password={true}
                    autoCorrect={false}
                    selectTextOnFocus={true}
                    secureTextEntry={true}
                    underlineColorAndroid={this.props.underlineColorAndroid}
                    minLength={this.props.minLength}
                    returnKeyType={this.props.returnKeyType}
                    keyboardType={this.props.keyboardType}
                    onSubmitEditing= {this.props.onSubmitEditing}
                />
            </View>
        );
    }
}

export default PasswordInput;