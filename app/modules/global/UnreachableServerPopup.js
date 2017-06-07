import React, {Component} from 'react';
import {Button, View, Dimensions, StyleSheet} from 'react-native';
import AppText from './AppText';
import colors from './colors';
import {startAppLoader} from './navigationLoader';

export default class UnreachableServerPopup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 8}}>
                    <AppText style={styles.title}>{'Oops petit problème!'}</AppText>
                    <AppText style={styles.content}>{"La connexion avec le serveur a échoué, veuillez réessayer plus tard."}</AppText>
                </View>
                <View style={styles.buttonBar}>
                    <Button
                        style={styles.button}
                        title={'Réessayer'}
                        onPress={() => this._restartApp()}
                        color={colors.blue}
                    />
                </View>
            </View>
        );
    }

    _restartApp() {
        startAppLoader();
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