import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import TextField from "react-native-md-textinput";
import colors from "./colors";
import AppText from "./AppText";
import PropTypes from 'prop-types';

class AppTextInput extends Component {

    state = {
        isValid: true,
        value: this.props.value,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {value, isValid} = this.state;
        const {validColor, invalidColor, label, validator, onChangeText, secureTextEntry} = this.props;
        const errorMessage = this.renderErrorMessage();
        const highlightColor = isValid ? validColor : invalidColor;
        return (
            <View>
                <TextField
                    label={label}
                    highlightColor={highlightColor}
                    style={{color: colors.mediumGray}}
                    value={value}
                    onChangeText={value => {
                        const isValid = validator(value);
                        this.setState({value, isValid});
                        value = isValid ? value : '';
                        onChangeText(value);
                    }}
                    secureTextEntry={secureTextEntry}
                />
                {errorMessage}
            </View>
        );
    }

    renderErrorMessage() {
        return this.state.isValid ?
            null :
            <AppText style={styles.errorInfo}>{this.props.invalidTextMessage}</AppText>;
    }
}

AppTextInput.defaultProps = {
    passProps: {
    },
    validColor: '#00BCD4',
    invalidColor: '#d41a0e',
    label: '',
    validator: () => {return true;},
    onChangeText: () => {},
    invalidTextMessage: 'Veuillez remplir ce champ.',
    value: '',
    secureTextEntry: false,
};

AppTextInput.propTypes = {
    validator: PropTypes.func,
    onChangeText: PropTypes.func,
    invalidTextMessage: PropTypes.string,
    label: PropTypes.string,
    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    secureTextEntry: PropTypes.bool,
};

export default AppTextInput;

const styles = StyleSheet.create({
    errorInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic'
    },
});