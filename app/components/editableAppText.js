/**
 * Created by VBO3596 on 05/04/2017.
 */
import React, {Component} from "react";
import {View, TextInput, TouchableOpacity} from "react-native";
import AppText from "./appText";

class EditableAppText extends Component {

    static defaultProps = {
        inInModificationMode: false,
        multiline: false,
        autoCorrect: true,
        returnKeyType: "done",
        onValidate: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.content
        };
    }

    render() {
        return this.props.isInModificationMode ? this.renderTextInput() : this.renderEditableTextValue();
    }

    renderTextInput(){
        return(
            <View style={{flexDirection:'row', flex: 1}}>
                    <TextInput
                        style={[this.props.style, {flex:10, paddingTop:0, paddingBottom: 5}]}
                        underlineColorAndroid={"lightgray"}
                        defaultValue={this.props.content}
                        autoCorrect={this.props.autoCorrect}
                        multiline={this.props.multiline}
                        numberOfLines={this.props.numberOfLines}
                        returnKeyType={this.props.returnKeyType}
                        onChangeText={(newValue) => this.setState({text: newValue})}
                        onSubmitEditing={() => this.props.onValidate(this.state.text)}/>
            </View>
        );
    }

    renderEditableTextValue(){
        return(
            <View style={{flexDirection: 'row', flex: 1}}>
                <AppText style={[this.props.style, {flex:10}]}>{this.props.content}</AppText>
            </View>
        );
    }
}

export default EditableAppText;