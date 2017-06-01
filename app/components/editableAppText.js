/**
 * Created by VBO3596 on 05/04/2017.
 */
import React, {Component} from "react";
import {TextInput, View} from "react-native";
import AppText from "./appText";
import strings from "../util/localizedStrings";

class EditableAppText extends Component {

    static defaultProps = {
        inInModificationMode: false,
        multiline: false,
        autoCorrect: true,
        returnKeyType: "done",
        mandatory: false,
        onValidate: () => {
        },
        fieldName: strings.field,
    };

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.content,
            placeholder: '',
            isValid: true
        };
    }

    render() {
        return this.props.isInModificationMode ? this.renderTextInput() : this.renderEditableTextValue();
    }

    renderTextInput() {
        return (
            <View style={{flexDirection: 'row', flex: 1}}>
                <TextInput
                    fieldName={this.props.fieldName}
                    style={[this.props.style, {flex: 1, textAlign: 'center',}]}
                    underlineColorAndroid={this.state.isValid ? 'lightgray' : 'red'}
                    defaultValue={this.props.content}
                    placeholder={(this.props.mandatory)
                        ? this.props.fieldName + ' ' + strings.mandatory
                        : ''}
                    autoCorrect={this.props.autoCorrect}
                    multiline={this.props.multiline}
                    numberOfLines={this.props.numberOfLines}
                    returnKeyType={this.props.returnKeyType}
                    onChangeText={(text) => this.validate(text)}/>
            </View>
        );
    }

    validate(value) {
        let valid = !(this.props.mandatory && value == '');
        this.setState({isValid: valid});
        this.props.onValidate(value);
    }

    renderEditableTextValue() {
        return (
            <View style={{flexDirection: 'row', flex: 1}}>
                <AppText style={[this.props.style]}>{this.props.content}</AppText>
            </View>
        );
    }
}

export default EditableAppText;