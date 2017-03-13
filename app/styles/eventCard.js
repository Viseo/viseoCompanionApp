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
        backgroundColor: 'white',
        height: 90,
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
        fontSize: 13,
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
    },
    eventType: {
        width: 2,
        height: 90,
        backgroundColor: '#ef4f42',
        marginLeft: 2,
    }
});