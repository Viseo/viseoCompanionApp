/**
 * Created by HEL3666 on 18/05/2017.
 */
import React, {Component} from "react";
import {Button, Dimensions, Platform, StyleSheet, TextInput, View} from "react-native";
const {height} = Dimensions.get('window');
import Header from "./../components/header";
import AppText from "../components/appText";

export default class Comment extends Component {
    onPressSendNewComment = async () => {
        this.setState({
            errorType: ''
        });
        // if (this.isFormCorrect()) {
            await this.props.db.addComment({

            });
            this.setState({modalVisible: true});
        // }
    };

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{height, marginTop: (Platform.OS === 'ios') ? 20 : 0}}>
                <View >
                    <AppText>commentaire</AppText>
                </View>

                <TextInput
                    onChangeText={(text)=>this.setState({text})}
                    //value={this.state.text}
                    // navigator={this.props.navigator}
                    // id={this.props.id}
                />
                <Button
                    title="envoyer"
                    onPress={() => {
                        console.warn("envoyer")
                        {this.onPressSendNewComment}
                    }}
                />
                <Button
                    title="annuler"
                    onPress={() => {
                        console.warn("annuler")
                    }}
                />
            </View>
        )
    }
}