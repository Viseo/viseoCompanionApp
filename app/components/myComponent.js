/**
 * Created by LMA3606 on 24/02/2017.
 */

import React, {
    StyleSheet,
    PropTypes,
    View,
    Text,
} from 'react-native';

export default class MyComponent extends React.Component {
    render() {
        return (
            <View>
                <Text test="ok"></Text>
                <Text test="ok">>I wonder if there will be any problems...</Text>
                <Text>I wonder if there will be any problems...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
});