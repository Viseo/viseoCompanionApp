import React, {Component} from 'react';
import AppText from '../global/components/AppText';
import TextField from 'react-native-md-textinput';
import colors from '../global/colors';
import {Button, View,StyleSheet,Dimensions} from 'react-native';
export default class NotationReview extends Component {

    render() {
        return (
            <View style={styles.container}>
              <AppText>Dites nous ce qu'il faut améliorer</AppText>

                <TextField
                    ref="textInput"
                    label="Remarque"
                    style={{color: colors.mediumGray,border:"1px solid #d0d0d0",backgroundColor:"#fff"}} />
                 <Button title="Envoyer" />
            </View>        );
    }

};
const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ede3f2',
        padding: 10,
        width:"100%",
        height:height,
    },
});


