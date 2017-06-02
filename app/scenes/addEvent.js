'use strict';
import React, {Component} from "react";
import {
    Button,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import DatePicker from "react-native-datepicker";
import Header from "./../components/header";
import AppText from "../modules/global/AppText";
import EditableImage from "./../components/editableImage";
import colors from "../modules/global/colors";

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
            errorType: '',
            modalVisible: false,
            hostId: this.props.hostId
        };
    }

    onPressSendNewEvent = async () => {
        this.setState({
            errorType: ''
        });
        if (this.isFormCorrect()) {
            let formattedDate = moment(this.state.datetime).valueOf();
            await this.props.db.addEvent({
                name: this.state.name,
                datetime: formattedDate,
                keyWords: this.state.keyWords,
                location: this.state.place,
                description: this.state.description
            });
            this.setState({modalVisible: true});
        }
    };

    isFormCorrect = () => {
        if (this.state.name == '' || this.state.datetime == '' || this.state.place == '') {
            this.setState({errorType: 'Veuillez entrer un nom, une date et un lieu.'});
            return false;
        } else {
            return true;
        }
    };

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'white',
                marginTop: (Platform.OS === 'ios') ? 20 : 0
            }}>
                <Header/>
                <ScrollView>
                    <View style={styles.mainContainer}>
                        {this.renderTitle()}
                        <EditableImage/>
                        <KeyboardAvoidingView behavior='position'>
                            {this.renderHostInput()}
                            {this.renderNameInput()}
                            {this.renderLocationInput()}
                            {this.renderDateInput()}
                            {this.renderDescriptionInput()}
                        </KeyboardAvoidingView>
                        {this.renderNotifySuccess()}
                        <View style={styles.errorcontainer}>
                            <Text style={styles.errorText}>{this.state.errorType}</Text>
                        </View>
                        <View style={styles.addButton}>
                            <Button
                                onPress={this.onPressSendNewEvent}
                                title="Créer l'évènement"
                                color={colors.blue}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    renderTitle() {
        return (
            <View style={{flex: 1}}>
                <AppText style={styles.titleText}>
                    Ajouter un évènement (beta)
                </AppText>
            </View>
        );
    }

    renderNameInput() {
        return (
            <TextInput
                style={{textAlign: 'left', flex: 1}}
                placeholder="Nom de l'évènement"
                autoCorrect={true}
                returnKeyType="next"
                underlineColorAndroid={"lightgray"}
                onChangeText={(name) => this.setState({name})}
            />
        );
    }

    renderHostInput() {
        return (
            <TextInput
                value={this.state.hostId}
            />
        );
    }

    renderLocationInput() {
        return (
            <TextInput
                style={{textAlign: 'left', flex: 1}}
                placeholder="Lieu"
                autoCorrect={true}
                returnKeyType="next"
                onChangeText={(place) => this.setState({place})}
            />
        );
    }

    renderDateInput() {
        return (
            <DatePicker
                date={this.state.datetime}
                mode="datetime"
                format="YYYY/MM/DD HH:mm"
                confirmBtnText="OK"
                cancelBtnText="Annuler"
                onDateChange={(datetime) => {
                    this.setState({datetime: datetime});
                }}
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
        );
    }

    renderDescriptionInput() {
        return (
            <TextInput
                style={{textAlign: 'left'}}
                multiline={true}
                placeholder="Description"
                autoCorrect={true}
                returnKeyType="next"
                onChangeText={(description) => this.setState({description})}
            />
        );
    }

    renderNotifySuccess() {
        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.props.navigator.resetTo({
                            title: 'Home'
                        });
                    }}
                >
                    <View style={{flex: 2, backgroundColor: 'rgba(227, 254, 255, 0.5)'}}></View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(186, 242, 255, 1)'
                        }}
                    >
                        <View>
                            <AppText style={{textAlign: 'center'}}>
                                {"Evènement créé avec succès!"}
                            </AppText>
                            <Button
                                onPress={() => {
                                    this.props.navigator.resetTo({
                                        title: 'Home'
                                    });
                                }}
                                title="OK"
                                color="#6ABEFF"
                            />
                        </View>
                    </View>
                    <View style={{flex: 2, backgroundColor: 'rgba(227, 254, 255, 0.5)'}}></View>
                </Modal>
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
        flexDirection: 'column',
        flex: 1,
        padding: 20,
        justifyContent: 'space-between'
    },
    title: {
        flex: 1,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 18
    },
    addButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
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