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

class EmailInput extends Component {

    static defaultProps = {
        placeholder: strings.email,
        style: styles.textInput,
        keyboardType: "email-address",
        underlineColorAndroid: "white",
        onSubmitEditing: () => {},
        onChangeText:(email) => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            email: null
        };
    }

    editEmail = (email) => {
        this.setState({
            email: email
        })
        this.props.onChangeText(email);
    }

    focus(){
        this.refs.email.focus();
    }

    render() {
        return (
            <View>
                <TextInput
                    style={this.props.style}
                    onChangeText={this.editEmail}
                    placeholder= {this.props.placeholder}
                    ref="email"
                    keyboardType={this.props.keyboardType}
                    autoCorrect={false}
                    selectTextOnFocus={true}
                    underlineColorAndroid={this.props.underlineColorAndroid}
                    returnKeyType="next"
                    autoCapitalize="none"
                    onSubmitEditing= {this.props.onSubmitEditing}
                    value= {this.props.value}
                />
            </View>
        );
    }
}

export default EmailInput;