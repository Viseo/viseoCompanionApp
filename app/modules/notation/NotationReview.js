import React, {Component} from 'react';
import TextField from 'react-native-md-textinput';
import colors from '../global/colors';
import {Button, View, StyleSheet, Dimensions, Image} from 'react-native';
export default class NotationReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            remarque: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 20, flexDirection: 'column',alignItems:"center"}}>
                    <Image source={require('./../../images/sad.png')} style={{width:50,height:50}} />
                </View>
                <View style={{flex: 40, flexDirection: 'column'}}>
                    <TextField
                        ref="textInput"
                        label="Dites nous ce qu'il faut améliorer"
                        value={this.state.remarque.toString()}
                        multiline={true}
                        style={
                            {
                                color: colors.mediumGray,
                                borderColor: '#d0d0d0',
                                borderWidth: 1,
                                borderRadius: 2,
                                backgroundColor: '#fff',
                                height: 100,
                            }
                        }
                        onChangeText={(text) => this.setState({remarque: text})}/>
                </View>
                <View style={{flex: 40, flexDirection: 'column'}}>
                    <Button title="Envoyer" onPress={() => {this.redirect();}} />
                </View>
            </View>        );
    }
    redirect(){

        this.props.navigator.dismissLightBox({
            animationType: 'slide-down',
        });
        this.props.navigator.showLightBox({
            screen: 'notation.NotationThanks',
            title: 'Merci',
            passProps: {textContent: 'Merci de vos remarques !', emotion: 'done'},
            animationType: 'slide-up',
        });
    }

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ede3f2',
        padding: 10,
        width: '100%',
        height: '60%',
        marginTop: 10,
        flex:1,
        flexDirection:"column"
    },
});


