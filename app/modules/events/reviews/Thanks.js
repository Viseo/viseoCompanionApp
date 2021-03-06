import React, {Component} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import AppText from '../../global/components/AppText';

export default class Thanks extends Component {
    constructor(props) {
        super( props );
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
                            require( './../../../images/happy.png' ) :
                            require( './../../../images/check.png' )
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
                        onPress={this.props.onOk}/>
                </View>
            </View>
        );
    }
};

// todo set propTypes

const styles = StyleSheet.create( {
    container: {
        backgroundColor: '#ede3f2',
        padding: 20,
        width: '100%',
        height: '60%',
        marginTop: 100,
    },
} );

