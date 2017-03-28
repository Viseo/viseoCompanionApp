/**
 * Created by LMA3606 on 14/02/2017.
 */

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
import DatePicker from 'react-native-datepicker';
import settings from './../config/settings';
import Header from "./../components/header";
import AppText from './../components/appText';

export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            datetime: '',
            keyWords: '',
            place: '',
            category: 0,
            errorType: ''
        };
        this.onPressSendNewEvent = this.onPressSendNewEvent.bind(this);
        this.isFormCorrect = this.isFormCorrect.bind(this);
    }

    onPressSendNewEvent = async() => {
        this.setState({
            errorType:''
        });
        if (this.isFormCorrect()) {
            await this.props.db.addEvent({
                name: this.state.name,
                datetime: this.state.datetime,
                keyWords: this.state.keyWords,
                location: this.state.place,
                description: this.state.description
            });
        }
    }

    isFormCorrect() {
        if (this.state.name === '' || this.state.datetime == '' || this.state.place === '') {
            this.setState({errorType: 'Veuillez entrer un nom, une date et un lieu.'});
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <View>
                <Header/>
                <ScrollView>
                    <View style={styles.mainContainer}>
                        {this.renderTitle()}
                        {this.renderNameInput()}
                        {this.renderLocationInput()}
                        {this.renderDateInput()}
                        {this.renderDescriptionInput()}
                        <View style={styles.errorcontainer}>
                            <Text style={styles.errorText}>{this.state.errorType}</Text>
                        </View>
                        <View style={styles.addButton}>
                            <Button
                                onPress={this.onPressSendNewEvent}
                                title="Créer l'évènement"
                                color="#4286f4"
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    renderTitle() {
        return (
            <View style={{
                padding:30}}>
                <AppText style={styles.titleText}>
                    Ajouter un évènement
                </AppText>
            </View>
        );
    }

    renderNameInput() {
        return (
            <View>
                <TextInput
                    style={{textAlign: 'left'}}
                    placeholder="Nom de l'évènement"
                    autoCorrect={true}
                    returnKeyType="next"
                    underlineColorAndroid={"lightgray"}
                    onChangeText={(name) => this.setState({name})}
                />
            </View>
        );
    }

    renderLocationInput() {
        return (
            <View>
                <TextInput
                    style={{textAlign: 'left'}}
                    placeholder="Lieu"
                    autoCorrect={true}
                    returnKeyType="next"
                    onChangeText={(place) => this.setState({place})}
                />
            </View>
        );
    }

    renderDateInput() {
        return (
            <View>
                <DatePicker
                    style={{width: 200, paddingTop:20}}
                    date={this.state.datetime}
                    mode="datetime"
                    format="YYYY-MM-DD[T]HH:mm"
                    confirmBtnText="OK"
                    cancelBtnText="Annuler"
                    onDateChange={(datetime) => {this.setState({datetime: datetime});}}
                    customStyles={{
                                    dateIcon: {
                                      position: 'absolute',
                                      left: 0,
                                      top: 4,
                                      marginLeft: 0
                                    },
                                    dateInput: {
                                      marginLeft: 36
                                    }
                                  }}
                />
            </View>
        );
    }

    renderDescriptionInput() {
        return (
            <View>
                <TextInput
                    style={{textAlign: 'left'}}
                    multiline={true}
                    placeholder="Description"
                    autoCorrect={true}
                    returnKeyType="next"
                    onChangeText={(description) => this.setState({description})}
                />
            </View>
        );
    }
}

var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        padding:20
    },
    title: {
        flex: 1,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 18
    },
    addButton: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
    },
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