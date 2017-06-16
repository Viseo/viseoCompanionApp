import React, {Component} from 'react';
import {Button, View, Dimensions, StyleSheet} from 'react-native';
import AppText from './AppText';
import colors from '../colors';
import {Navigation} from 'react-native-navigation';

export default class InvalidFormPopup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 8}}>
                    <AppText style={styles.title}>{'Formulaire incomplet'}</AppText>
                    <AppText style={styles.content}>{"Veuillez remplir correctement tous les champs requis."}</AppText>
                </View>
                <View style={styles.buttonBar}>
                    <Button
                        style={styles.button}
                        title={'OK'}
                        onPress={() => Navigation.dismissLightBox()}
                        color={colors.blue}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
    },
    buttonBar: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    container: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.3,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 16,
    },
    content: {
        marginTop: 8,
        textAlign: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
    },
});