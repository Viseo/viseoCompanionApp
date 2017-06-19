import React, {Component} from 'react';
import TextField from 'react-native-md-textinput';
import colors from '../global/colors';
import {Button, View, StyleSheet, Image} from 'react-native';
import * as db from '../global/db';

export default class NotationRemark extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        review: '',
        notation: this.props.notation,
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                    <Image source={require('./../../images/sad.png')} style={{width: 50, height: 50}}/>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <TextField
                        ref="textInput"
                        label="Dites nous ce qu'il faut améliorer"
                        value={this.state.review.toString()}
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
                        onChangeText={(text) => () => {
                            this.setState({
                                review: text,
                            });
                            this.state.notation.avis = text;

                        }}/>
                </View>
                <View style={{flex: 1, flexDirection: 'column', marginTop: 100}}>
                    <Button title="Envoyer" onPress={() => {
                        db.sendReview(this.state.notation);
                        this.redirect();
                    }}/>
                </View>
            </View>        );
    }

    redirect() {

        this.props.navigator.dismissLightBox({
            animationType: 'slide-down',
        });
        this.props.navigator.showLightBox({
            screen: 'notation.NotationThanks',
            title: 'Merci',
            navigator: this.props.navigator,
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
        marginTop: 100,
    },
});
