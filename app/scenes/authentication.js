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
    Dimensions
} from "react-native";

//const REQUEST_URL3 = 'http://10.33.179.112:8080/api/account/Authentification';
const REQUEST_URL3 = 'http://192.168.137.1:8080/api/account/Authentification';

export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorType: ''
        };
    }

    render() {
        return (
            <View>
                <View>
                    <View style={styles.topbar}>
                        <Text style={styles.viseocompanion}> VISEO COMPANION </Text>
                    </View>
                </View>
                <ScrollView
                    contentInset={{top : -50}}
                    style={styles.scrollView}>
                    <View style={styles.container}>
                        <View style={styles.blankcontainer}>
                        </View>
                        <View style={styles.titlecontainer}>
                            <Text style={styles.title}> Connexion </Text>
                        </View>
                        <View style={styles.blankcontainer2}>
                        </View>
                        <View style={styles.emailcontainer}>
                            <TextInput style={styles.emailInput}
                                       onChangeText={(_email) => this.setState({email})}
                                       placeholder="Email"
                                       keyboardType="email-address"
                                       autoCorrect={false}
                                       selectTextOnFocus={true}
                                       underlineColorAndroid={"white"}
                            />
                        </View>
                        <View style={styles.passwordcontainer}>
                            <TextInput style={styles.passwordInput}
                                       onChangeText={(_password) => this.setState({password})}
                                       placeholder="Mot de passe"
                                       ref={component=>this._textInput1=component}
                                       password={true}
                                       autoCorrect={false}
                                       selectTextOnFocus={true}
                                       underlineColorAndroid={"white"}
                                       minLength={5}
                            />
                        </View>
                        <View style={styles.blankcontainer3}>
                        </View>
                        <View style={styles.passwordforgotcontainer}>
                            <TouchableOpacity onPress={() =>{this.onPressPasswordForgot()}}>
                                <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttoncontainer}>
                            <TouchableOpacity onPress={() =>{this.onPressButtonPOST()}}>
                                <View style={styles.okButton}>
                                    <Text style={styles.okText}>OK</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.errorcontainer}>
                            <Text style={styles.errorText}>{this.state.errorType}</Text>
                        </View>
                        <View style={styles.createaccountcontainer}>
                            <TouchableOpacity onPress={() =>{this.onPressCreate()}}>
                                <Text style={styles.createText}>Créer un compte</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

var {
    height: deviceHeight,
    width : deviceWidth,
} = Dimensions.get('window');

var styles = StyleSheet.create({

    topbar: {
        backgroundColor: 'grey',
        height: 0.1 * deviceHeight,
    },

    viseocompanion: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
    },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
        height: 0.85 * deviceHeight,
    },
    blankcontainer: {
        flexDirection: 'row',
        height: 0.02 * deviceHeight
    },

    blankcontainer2: {
        flexDirection: 'row',
        height: 0.1 * deviceHeight
    },
    blankcontainer3: {
        flexDirection: 'row',
        height: 0.05 * deviceHeight
    },

    titlecontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.05 * deviceHeight
    },

    title: {
        fontSize: 20,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },

    emailcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.1 * deviceHeight
    },

    passwordcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.1 * deviceHeight
    },

    buttoncontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.1 * deviceHeight
    },

    passwordforgotcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.1 * deviceHeight
    },

    errorcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.02 * deviceHeight
    },

    createaccountcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.1 * deviceHeight
    },

    emailInput: {
        alignItems: 'center',
        width: 0.7 * deviceWidth,
        textAlign: 'center',
    },

    passwordInput: {
        alignItems: 'center',
        width: 0.7 * deviceWidth,
        textAlign: 'center',
    },

    okButton: {
        width: 0.25 * deviceWidth,
        height: 0.08 * deviceHeight,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    okText: {
        fontSize: 25,
        color: 'black',
    },

    errorText: {
        fontSize: 15,
        color: 'red',
    },

    createText: {
        fontSize: 15,
        color: 'black',
    },

    forgotText: {
        fontSize: 15,
        color: 'brown',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted'
    },

    scrollView: {
        height: deviceHeight,
    },

    error_message: {
        color: 'red',
    }
});