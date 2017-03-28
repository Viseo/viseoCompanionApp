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
import DatePicker from 'react-native-datepicker'
import settings from '../../../Archive/VISEOCompanion_old/app/config/settings'


export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            datetime: '',
            keyWords: '',
            place: '',
            errorType:''
        };
        this.onPressSendNewEvent = this.onPressSendNewEvent.bind(this);
        this.isFormCorrect = this.isFormCorrect.bind(this);
        this.sendEvent = this.sendEvent.bind(this);
    }

    async onPressSendNewEvent(){
        if(this.isFormCorrect()){
            await this.sendEvent(
                this.state.name,
                this.state.datetime,
                this.state.keyWords,
                this.state.place,
                this.state.description
            );
            // let feedback = JSON.stringify(this.sendEvent());
            // this.setState({errorType:feedback});

        }
    }

    isFormCorrect() {
        if (this.state.name == '' || this.state.datetime == '' || this.state.place == ''){
            this.setState({errorType:'Veuillez entrer un nom, une date et un lieu.'});
            return false;
        } else {
            return true;
        }
    }

    async sendEvent(name, datetime, keyWords, place, description){
        try{
            console.warn('New Event:\n');
            console.warn(datetime);
            let date = new Date(datetime);
            console.warn(date);
            console.warn(place + '\n');
            console.warn('URL : ' + settings.ADDEVENT_API_URL);
            let response = await fetch(settings.ADDEVENT_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": name,
                    "datetime": datetime,
                    "description": description,
                    "keyWords": keyWords,
                    "place": place,
                })
            })
            console.warn(response.status);
            let responseJson = await response.json();

            if(responseJson)
                return true;
        } catch (error){
            console.warn(error);
        }
    }

    render() {
        return (
            <View style={{flexDirection: 'column', flex:1, marginBottom:100,justifyContent: 'space-between'}}>
                <ScrollView>
                    <View style={{padding:30}}>
                        {/* Scene title*/}
                        <Text style={{fontSize: 23, textAlign: 'center', paddingTop:10, paddingBottom:40}}>
                            Ajouter un évènement
                        </Text>

                        {/* Event name*/}
                        <View>
                            <TextInput
                                style={{textAlign: 'left'}}
                                placeholder="Nom de l'évènement"
                                autoCorrect={true}
                                returnKeyType="next"
                                underlineColorAndroid={"grey"}
                                onChangeText={(name) => this.setState({name})}
                            />
                        </View>

                        {/* Event place*/}
                        <View>
                            <TextInput
                                style={{textAlign: 'left'}}
                                placeholder="Lieu"
                                autoCorrect={true}
                                returnKeyType="next"
                                onChangeText={(place) => this.setState({place})}
                            />
                        </View>

                        {/* Event date*/}
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
                            {/*todo date picker*/}
                        </View>

                        {/* Event description*/}
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
                    </View>
                    <View style={styles.errorcontainer}>
                        <Text style={styles.errorText}>{this.state.errorType}</Text>
                    </View>
                    <View>
                        <Button
                            onPress={this.onPressSendNewEvent}
                            title="Créer l'évènement"
                            color="#4286f4"
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

var{
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

const styles = StyleSheet.create({

    topbar:{
        backgroundColor: 'grey',
        height:0.1*deviceHeight,
    },

    viseocompanion:
        {
            justifyContent:'center',
            textAlign: 'center',
            fontSize:20,
            color:'black',
        },

    container:
        {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
            flexDirection:'column',
            height:0.85*deviceHeight,
        },
    blankcontainer:
        {
            flexDirection:'row',
            height:0.02*deviceHeight
        },

    blankcontainer2:
        {
            flexDirection:'row',
            height:0.1*deviceHeight
        },
    blankcontainer3:
        {
            flexDirection:'row',
            height:0.05*deviceHeight
        },

    titlecontainer:
        {
            flexDirection:'row',
            alignItems:'center',
            justifyContent: 'center',
            height:0.05*deviceHeight
        },

    title:
        {
            fontSize:20,
            color:'black',
            justifyContent:'center',
            alignItems:'center',
        },

    emailcontainer:
        {
            flexDirection:'row',
            alignItems:'center',
            justifyContent: 'center',
            height:0.1*deviceHeight
        },

    passwordcontainer:
        {
            flexDirection:'row',
            alignItems:'center',
            justifyContent: 'center',
            height:0.1*deviceHeight
        },

    buttoncontainer:
        {
            flexDirection:'row',
            alignItems:'center',
            justifyContent: 'center',
            height:0.1*deviceHeight
        },

    passwordforgotcontainer:
        {
            flexDirection:'row',
            alignItems:'center',
            justifyContent: 'center',
            height:0.1*deviceHeight
        },

    errorcontainer:
        {
            flexDirection:'row',
            alignItems:'center',
            justifyContent: 'center',
            height:0.02*deviceHeight
        },

    createaccountcontainer:
        {
            flexDirection:'row',
            alignItems:'center',
            justifyContent: 'center',
            height:0.1*deviceHeight
        },

    emailInput:{
        alignItems:'center',
        width: 0.7*deviceWidth,
        textAlign:'center',
    },

    passwordInput:{
        alignItems:'center',
        width: 0.7*deviceWidth,
        textAlign:'center',
    },

    okButton:{
        width:0.25*deviceWidth,
        height:0.08*deviceHeight,
        borderColor:'black',
        borderWidth:2,
        justifyContent:'center',
        alignItems:'center',
    },

    okText:{
        fontSize:25,
        color:'black',
    },

    errorText:{
        fontSize:15,
        color:'red',
    },

    createText:{
        fontSize:15,
        color:'black',
    },

    forgotText:{
        fontSize:15,
        color:'brown',
        fontStyle:'italic',
        textDecorationLine:'underline',
        textDecorationStyle:'dotted'
    },

    scrollView:{
        height : deviceHeight,
    },

    error_message : {
        color : 'red',
    }
});