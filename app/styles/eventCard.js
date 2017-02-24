/**
 * Created by AAB3605 on 20/02/2017.
 */
import {
    StyleSheet
} from "react-native";

export default StyleSheet.create({
    card: {
        backgroundColor: 'white',
        //borderBottomWidth: 1,
        //flex:1,
        //height: 100,
        //marginBottom:3,
        alignItems:'stretch'
    },
    name: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 18
    },
    description: {
        flex: 1,
        textAlign: 'left',
        fontSize: 16
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'right',
        fontSize: 13
    },
    textInput: {
        fontSize: 18,
        textAlign: 'center'
    }
});