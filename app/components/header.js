/**
 * Created by LMA3606 on 16/03/2017.
 */

/**
 * Created by LMA3606 on 16/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Dimensions,
    Image,
    Text
} from 'react-native';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.topbar}>
                <View style={styles.menu0}>
                    <Image source={require("../images/Menu.png")} style={styles.icon}/>
                </View>
                <Text style={styles.viseocompanion}>VISEO COMPANION</Text>
            </View>
        );
    }
}

export default Header;

var {
    height: deviceHeight,
} = Dimensions.get('window');

const styles = StyleSheet.create({
    screen: {
        height: (Platform.OS === 'ios') ? 200 : 100,
    },
    topbar: {
        height: (1 / 13) * deviceHeight,
        backgroundColor: '#103a71',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        marginTop:(Platform.OS === 'ios') ? 20 : 0,
    },
    menu: {
        width: (1 / 14) * deviceHeight,
        height: (1 / 14) * deviceHeight,
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'flex-start',
        margin: 5,
    },
    menu0: {
        width: 85,
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 5,
        marginTop: 5,
    },

    viseocompanion: {
        fontSize: 20,
        color: 'white',
    },
});