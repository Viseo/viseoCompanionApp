import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import AppText from '../global/components/AppText';
export default class NotationThanks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textContent: ""
        }
    }
    render() {
        return (

            <View style={styles.container}>
                {<AppText>{this.props.textContent}</AppText>}
            </View>
        )}

};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ede3f2',
        padding: 100,
        alignItems: 'center',
    },
});

