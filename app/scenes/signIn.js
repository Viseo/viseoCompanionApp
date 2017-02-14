/**
 * Created by AAB3605 on 13/02/2017.
 */
'use strict';
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Navigator,
    Image,
    NavMenu,
    ScrollView,
    View,
    TouchableOpacity,
    ListView,
    Dimensions,
    Button,
    Alert,
    TouchableHighlight
} from "react-native";

export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorType: ''
        };
    }

    onPressLearnMore() {
        Alert.alert('Button has been pressed!');
    }

    onPressSignUp() {
        this.props.navigator.push({
           title: 'signUp'
        });
    }

    render() {
        return (
            <View style={{flex:1, justifyContent: 'center', marginBottom:100}}>
                <View style={{flexDirection: 'column', justifyContent: 'center', padding:30}}>

                    {/* VISEO or AUTHENTICATION logo */}
                    <View style={{alignItems: 'center', paddingBottom:50}}>
                        <Image
                            source={require('./../images/loginLogo.png')}
                            style={{width: 110, height: 110}}
                        />
                    </View>

                    {/* User email input */}
                    <View>
                        <TextInput
                            style={{textAlign: 'center'}}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCorrect={false}
                            selectTextOnFocus={true}
                            underlineColorAndroid={"white"}
                        />
                    </View>

                    {/* User password input */}
                    <View >
                        <TextInput
                            style={{textAlign: 'center'}}
                            placeholder="Password"
                            ref={component=>this._textInput1=component}
                            password={true}
                            autoCorrect={false}
                            selectTextOnFocus={true}
                            underlineColorAndroid={"white"}
                            minLength={5}
                        />
                    </View>

                    {/* Recover password */}
                    <TouchableHighlight onPress={this.props.onForward}>
                        <Text style={{textAlign: 'right', fontSize: 12, color: 'brown', fontStyle: 'italic'}}>
                            Forgot password?
                        </Text>
                    </TouchableHighlight>

                    {/* SIGN IN and SIGN UP buttons */}
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30}}>
                        <View style={{flex:1, padding:5}}>
                            <Button
                                onPress={this.onPressLearnMore}
                                title="Sign in"
                                color="#841584"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        </View>
                        <View style={{flex:1, padding:5}}>
                            <Button
                                onPress={this.onPressLearnMore}
                                title="Sign up"
                                color="#bdaebf"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}