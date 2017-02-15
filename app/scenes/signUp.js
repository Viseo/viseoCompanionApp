/**
 * Created by AAB3605 on 14/02/2017.
 */
'use strict';
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
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

const localUrl = 'http://10.33.179.112:8080/api/';

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordVerification: '',
            errorMessage:''
        }

        this.onPressSignIn = this.onPressSignIn.bind(this);
        this.onPressSignUp = this.onPressSignUp.bind(this);
    }

    async addUser(email, password) {
        console.warn('Add user:');
        console.warn(this.state.email);
        console.warn(this.state.password);
        try {
            let response = await fetch(localUrl + 'account/addAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            });

            let responseJson = await response.json();

            if(responseJson)
                return true;
        } catch (error) {
            console.warn(error);
        }
    }

    async doesUserAlreadyExist(email) {
        try {
            let response = await fetch(localUrl + 'account/checkAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email
                })
            });

            let responseJson = await response.json();
            if(responseJson) {
                return false;
            }
        } catch (error) {
            console.warn(error);
        }

        return true;
    }

    hasEmptyField() {
        if (
            this.state.email == '' ||
            this.state.password == '' ||
            this.state.passwordVerification == '') {
            return true;
        }

        return false;
    }

    isEmailValid(email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };

    isPasswordValid(password) {
        return password.length >= 6 ? true : false;
    }

    onPressSignIn() {
        this.props.navigator.pop();
    }

    async onPressSignUp() {
        if (this.hasEmptyField()) {
            this.setState({errorMessage: 'Please fill all the fields.'});
        } else if (!this.isEmailValid(this.state.email)) {
            this.setState({errorMessage: 'This is not a valid email.'});
        } else if (!this.isPasswordValid(this.state.password)) {
            this.setState({errorMessage: 'The password must contain at least 6 characters.'});
        } else if (this.state.password !== this.state.passwordVerification) {
            this.setState({errorMessage: "The passwords don't match."});
        } else {
            try {
                let userAlreadyExists = await this.doesUserAlreadyExist(this.state.email);
                if(userAlreadyExists) {
                    this.setState({errorMessage: 'This email is already used.'});
                } else {
                    await this.addUser(this.state.email, this.state.password);
                }
            } catch (error) {
                console.warn("Couldn't sign up.");
            }
        }
    }

    render() {
        return (
        <View style={{flex:1, justifyContent: 'center', marginBottom:100}}><ScrollView>
            <View style={{flexDirection: 'column', justifyContent: 'center', padding:30}}>

                {/* VISEO or SIGN UP logo */}
                <View style={{alignItems: 'center', paddingBottom:50}}>
                    <Image
                        source={require('./../images/signUpLogo.png')}
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
                        onChangeText={(text) => this.setState({email: text})}
                    />
                </View>

                {/* User password input */}
                <View >
                    <TextInput
                        style={{textAlign: 'center'}}
                        placeholder="Password"
                        password={true}
                        autoCorrect={false}
                        selectTextOnFocus={true}
                        underlineColorAndroid={"white"}
                        minLength={5}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                </View>

                {/* User password verification input */}
                <View >
                    <TextInput
                        style={{textAlign: 'center'}}
                        placeholder="Verify password"
                        password={true}
                        autoCorrect={false}
                        selectTextOnFocus={true}
                        underlineColorAndroid={"white"}
                        minLength={5}
                        onChangeText={(text) => this.setState({passwordVerification: text})}
                    />
                </View>

                {/* Display error messages */}
                <View>
                    <Text style={{textAlign: 'center', fontSize: 12, color: 'brown', fontStyle: 'italic'}}>
                        {this.state.errorMessage}
                    </Text>
                </View>

                {/* SIGN IN and SIGN UP buttons */}
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30}}>
                    <View style={{flex:1, padding:5}}>
                        <Button
                            onPress={this.onPressSignIn}
                            title="Sign in"
                            color="#bdaebf"
                        />
                    </View>
                    <View style={{flex:1, padding:5}}>
                        <Button
                            onPress={this.onPressSignUp}
                            title="Sign up"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </View>
            </View></ScrollView>
        </View>
        );
    }
}