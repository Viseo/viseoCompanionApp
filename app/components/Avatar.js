import React, {Component} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import AppText from "../modules/global/AppText";
import colors from "../modules/global/colors";

export default class Avatar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const lastNameInitial = (this.props.lastName ? this.props.lastName[0] : '').toUpperCase();
        const firstNameInitial = (this.props.firstName ? this.props.firstName[0] : '').toUpperCase();
        const avatarSize = this._getSize();
        return (
            <View style={[{justifyContent: 'center'}, this.props.style]}>
                <AppText
                    style={[
                        styles.avatar,
                        avatarSize,
                    ]}
                >
                    {firstNameInitial + lastNameInitial}
                </AppText>
            </View>
        );
    }

    _getSize() {
        const {size} = this.props;
        return {
            height: deviceWidth / size,
            width: deviceWidth / size,
            borderRadius: deviceWidth / (size * 2),
            fontSize: size * 10,
        }

    }
}

Avatar.defaultProps = {
    size: 4,
};

let {width: deviceWidth} = Dimensions.get('window');
const styles = StyleSheet.create({
    avatar: {
        height: deviceWidth / 4,
        width: deviceWidth / 4,
        borderRadius: deviceWidth / 8,
        backgroundColor: colors.lightGray,
        textAlign: 'center',
        color: 'white',
    }
});