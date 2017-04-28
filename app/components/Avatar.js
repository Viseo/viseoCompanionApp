import React, {Component} from "react";
import {View, StyleSheet, Dimensions} from "react-native";
import AppText from "./appText";
import colors from "./colors";

export default class Avatar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const lastNameInitial = (this.props.lastName ? this.props.lastName[0] : '').toUpperCase()
        const firstNameInitial = (this.props.firstName ? this.props.firstName[0] : '').toUpperCase()
        return (
            <View style={[{justifyContent: 'center', alignItems: 'center'}, this.props.style]}>
                <AppText style={styles.avatar}>
                    {firstNameInitial + lastNameInitial}
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