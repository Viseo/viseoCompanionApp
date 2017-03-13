/**
 * Created by AAB3605 on 20/02/2017.
 */
import {
    StyleSheet
} from "react-native";

export default cardStyle = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignItems:'stretch'
        backgroundColor: 'white',
        height: 90,
        borderBottomWidth: 0.5,
        borderBottomColor: '#999999'
    },
    name: {
        flex: 2,
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 17,
        color: 'black'
    },
    description: {
        flex: 1,
        textAlign: 'left',
        fontSize: 14,
    },
    location: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'right',
        fontSize: 13
    },
    textInput: {
        fontSize: 18,
        textAlign: 'center'
    },
    participationDot: {
        width: 10,
        height: 10,
        backgroundColor: '#6492ef',
        borderRadius: 50,
    }
});