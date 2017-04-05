/**
 * Created by VBO3596 on 05/04/2017.
 */
import React, {Component} from "react";
import {View, TextInput, TouchableOpacity, StyleSheet, Image} from "react-native";
import AppText from "./appText";

class EditableAppText extends Component {

    static defaultProps = {
        editable: false,
        multiline: false,
        autoCorrect: true,
        returnKeyType: "done",
        onValidate: (newText) => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            editable: this.props.editable,
            text: this.props.content
        };
    }

    render() {
        if(this.state.editable){
            return(
                <View>
                    {this.renderTextInput()}
                </View>
            );
        }
        else{
            return(
                <View>
                    {this.renderTextValue()}
                </View>
            );
        }
    }

    renderTextInput(){
        return(
            <View style={{flexDirection:'row', flex: 1, paddingHorizontal:15}}>
                    <TextInput
                        refs="input"
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

    renderTextValue(){
        return(
            <View style={{flexDirection: 'row', flex: 1, paddingHorizontal:15}}>
                    <AppText style={[this.props.style, {flex:10}]}>{this.props.content}</AppText>
                    <TouchableOpacity style={{flex:1}} onPress={this.switchMode}>
                        <Image source={require('./../images/edit.png')}/>
                    </TouchableOpacity>
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