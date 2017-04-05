/**
 * Created by VBO3596 on 05/04/2017.
 */
import React, {Component} from "react";
import {View, TextInput, TouchableOpacity, StyleSheet, Image} from "react-native";
import AppText from "./appText";

class EditableAppText extends Component {

    static defaultProps = {
        inInModificationMode: false,
        editable: false,
        multiline: false,
        autoCorrect: true,
        returnKeyType: "done",
        onValidate: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            editable: this.props.editable,
            text: this.props.content
        };
    }

    render() {
        if(this.props.isInModificationMode){
            return this.state.editable ? this.renderTextInput() : this.renderEditableTextValue();
        }
        else{
            return this.renderNonEditableTextValue();
        }
    }

    renderTextInput(){
        return(
            <View style={{flexDirection:'row', flex: 1}}>
                    <TextInput
                        style={[this.props.style, {flex:10}]}
                        defaultValue={this.props.content}
                        autoCorrect={this.props.autoCorrect}
                        multiline={this.props.multiline}
                        returnKeyType={this.props.returnKeyType}
                        onChangeText={(newValue) => this.setState({text: newValue})}
                        onSubmitEditing={this.validate}/>
                    <TouchableOpacity style={{flex:1}} onPress={this.switchMode}>
                        <Image source={require('./../images/cancel.png')}/>
                    </TouchableOpacity>
            </View>
        );
    }

    renderEditableTextValue(){
        return(
            <View style={{flexDirection: 'row', flex: 1}}>
                    <AppText style={[this.props.style, {flex:10}]}>{this.props.content}</AppText>
                    <TouchableOpacity style={{flex:1}} onPress={this.switchMode}>
                        <Image source={require('./../images/edit.png')}/>
                    </TouchableOpacity>
            </View>
        );
    }

    renderNonEditableTextValue(){
        return(
            <View style={{flexDirection: 'row', flex: 1}}>
                <AppText style={[this.props.style, {flex:10}]}>{this.props.content}</AppText>
            </View>
        );
    }

    switchMode = () => {
        this.setState({editable: !this.state.editable});
    }

    validate = () => {
        this.props.onValidate(this.state.text);
        this.switchMode();
    }
}

export default EditableAppText;

const style = StyleSheet.create({
});