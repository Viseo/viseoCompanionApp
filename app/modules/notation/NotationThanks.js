import React, {Component} from 'react';
import {View, StyleSheet, Image,Button} from 'react-native';
import AppText from '../global/components/AppText';
export default class NotationThanks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textContent: '',
        };
    }

    render() {
        return (

            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'column',alignItems:"center"}}>
                <Image source={this.props.emotion==="happy"?
                    require('./../../images/happy.png') :
                    require('./../../images/check.png')
                } style={{width:50,height:50}} />
                    <AppText style={{fontSize:16,fontWeight:"bold"}} >{this.props.textContent}</AppText>
                </View>
                <View style={{flex: 1, flexDirection: 'column', marginTop:100}}>
                    <Button title="Fermer" onPress={() => {
                        this.dismiss();
                    }}/>
                </View>
            </View>
        );
    }

    dismiss() {

        this.props.navigator.dismissLightBox({
            animationType: 'slide-down',
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

