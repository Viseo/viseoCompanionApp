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
    TouchableHighlight,
} from "react-native";
import CheckBox from 'react-native-check-box'
import * as util from './../util.js';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            rememberUser: false
        };

        this.onPressRememberMe = this.onPressRememberMe.bind(this);
        this.onPressRecoverPassword = this.onPressRecoverPassword.bind(this);
        this.onPressSignIn = this.onPressSignIn.bind(this);
        this.onPressSignUp = this.onPressSignUp.bind(this);
    }

    onPressRememberMe() {
        this.setState({
           rememberUser: !this.state.rememberUser
        });
    }

    onPressRecoverPassword() {
        this.props.navigator.push({
            title: 'RecoverPassword'
        });
    }

    async onPressSignIn() {
        if (util.hasEmptyElement(this.state.email, this.state.password, this.state.passwordVerification)) {
            this.setState({errorMessage: 'Please fill all the fields.'});
        } else if (!util.isEmailValid(this.state.email)) {
            this.setState({errorMessage: 'This is not a valid email.'});
        }
    }

    onPressSignUp() {
        this.props.navigator.push({
            title: 'SignUp'
        });
    }

    render() {
        return (
            <View style={{flex:1, justifyContent: 'center', marginBottom:100}}>
                <ScrollView>
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
                                secureTextEntry={true}
                                underlineColorAndroid={"white"}
                                minLength={6}
                            />
                        </View>

                        <View style={{flexDirection: 'row', flex:1}}>
                            {/* Remember user if this checkbox is checked */}
                            <CheckBox
                                style={{flex: 1, padding: 10}}
                                onClick={this.onPressRememberMe}
                                isChecked={false}
                                rightText={"Remember me"}
                            />

                            <View style={{flex:1, alignItems: 'flex-end'}}>
                                {/* Recover password */}
                                <TouchableHighlight onPress={this.onPressRecoverPassword}>
                                    <Text
                                        style={{textAlign: 'right', fontSize: 12, color: 'brown', fontStyle: 'italic'}}>
                                        Forgot password?
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>

                        {/* SIGN IN button */}
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30}}>
                            <View style={{flex:1, padding:5}}>
                                <Button
                                    onPress={this.onPressSignIn}
                                    title="Sign in"
                                    color="#841584"
                                />
                            </View>
                        </View>

                        {/* SIGN UP link */}
                        <TouchableHighlight onPress={this.onPressSignUp}>
                            <Text
                                style={{textAlign: 'center', fontSize: 12, color: 'blue', fontStyle: 'italic', marginTop:15}}>
                                First time? Create an account
                            </Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        )
    }
}