import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Button} from 'react-native';
import AppText from '../../global/AppText';
import colors from '../../global/colors';
import {startApp} from '../../global/navigationLoader';

export default class SignUpSuccessfulPopup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 8}}>
                    <AppText style={styles.title}>{'Compte créé avec succès'}</AppText>
                    <AppText style={styles.content}>{'Bienvenue sur Viseo Companion'}</AppText>
                </View>
                <View style={styles.buttonBar}>
                    <Button
                        style={styles.button}
                        title={'OK'}
                        onPress={() => this._navigateToHome()}
                        color={colors.blue}
                    />
                </View>
            </View>
        );
    }

    _navigateToHome() {
        startApp();
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