import React, {Component} from 'react';
import TextField from 'react-native-md-textinput';
import {Button, View, StyleSheet, Image, Dimensions} from 'react-native';
import colors from '../../global/colors';

export default class NotationRemark extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',marginTop:10}}>
                    <Image source={require('./../../../images/sad.png')} style={{width: 50, height: 50}}/>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <TextField
                        ref="textInput"
                        label="Dites nous ce qu'il faut améliorer"
                        value={this.state.comment.toString()}
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
                        onChangeText={(text) => {
                            this.setState({
                                comment: text,
                            });
                        }}/>
                </View>
                <View style={{flex: 1, flexDirection: 'column', marginTop: 50}}>
                    <Button
                        title="Envoyer"
                        onPress={() => this.props.sendComment(this.state.comment)}
                    />
                </View>
            </View>
        );
    }
};

// todo set propTypes

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ede3f2',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.6,
    },
});
