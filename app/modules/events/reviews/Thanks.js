import React, {Component} from 'react';
import {View, StyleSheet, Image, Button} from 'react-native';
import AppText from '../../global/components/AppText';
import {dismissLightBox} from '../../global/navigationUtil';

export default class Thanks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textContent: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                    <Image
                        source={this.props.emotion === 'happy' ?
                            require('./../../../images/happy.png') :
                            require('./../../../images/check.png')
                        }
                        style={{width: 50, height: 50}}/>
                    <AppText
                        style={{fontSize: 16, fontWeight: 'bold', marginTop: 30}}>
                        {this.props.textContent}
                    </AppText>
                </View>
                <View style={{flex: 1, flexDirection: 'column', marginTop: 50}}>
                    <Button
                        title="Fermer"
                        onPress={() => dismissLightBox()}/>
                </View>
            </View>
        );
    }
};

// todo set propTypes

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ede3f2',
        padding: 10,
        width: '100%',
        height: '60%',
        marginTop: 100,
    },
});

