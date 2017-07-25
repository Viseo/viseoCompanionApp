import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg from 'react-native-svg/elements/Svg';
import {Image} from 'react-native-svg';
import colors from '../global/colors';
import AppText from '../global/components/AppText';

export default class CreateAction extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                {this._renderHeadband()}
                {this._renderCreateAction()}
            </View>
        );
    }

    _renderHeadband() {
        return (
            <Svg width="550" height="150">
                <Image width="550" height="150" href={require('../../images/NIVEAUX_BANDEAU_1.jpg')}/>
            </Svg>
        );
    }

    _renderCreateAction() {
        return (
            <View style={styles.createAction}>
                <AppText style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    height: 40,
                    color: colors.orange,
                    marginLeft: 25,
                    marginTop: 10,
                    marginBottom: 10,
                }}>
                    Créer une action
                </AppText>
                <View style={{backgroundColor: colors.orange, height: 5}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    createAction: {
        backgroundColor: colors.white,
        alignContent: 'center',
        marginTop: -30,
        marginRight: 20,
        marginLeft: 20,
    },
});