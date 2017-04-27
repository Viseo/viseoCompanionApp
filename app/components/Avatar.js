import React, {Component} from "react";
import {View, StyleSheet, Dimensions} from "react-native";
import AppText from "./appText";
import colors from "./colors";

export default class Avatar extends Component {

    constructor(props) {
        super(props);
        this.state= {
            initials: (this.props.name[0] || '').toUpperCase() + (this.props.lastName[0] || '').toUpperCase()
        }
    }

    render() {
        return (
            <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                <AppText style={styles.avatar}>
                    {this.state.initials}
                </AppText>
            </View>
        );
    }
}

let {width: deviceWidth} = Dimensions.get('window');
const styles = StyleSheet.create({
    avatar: {
        height: deviceWidth / 4,
        width: deviceWidth / 4,
        borderRadius: deviceWidth / 8,
        fontSize: 40,
        backgroundColor: colors.lightGray,
        textAlign: 'center',
        color: 'white',
    }
});