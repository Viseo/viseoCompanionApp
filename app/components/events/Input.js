/**
 * Created by AAB3605 on 15/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Image
} from 'react-native';

class Input extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flex:5,
                }}>
                    <TextInput
                        style={styles.input}
                        placeholder={this.props.placeholder}
                        onChangeText={this.props.onChangeText}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                </View>
            </View>
        );
    }
}

export default Input;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white',
        borderRadius:3
    },
    input: {
        flex: 1,
        fontSize: 15,
        backgroundColor: 'white',
        textAlign: 'center',
        borderTopLeftRadius:3,
        borderBottomLeftRadius:3,
    },
    inputWhenFilterBarIsVisible: {
        borderBottomLeftRadius:0
    }
});