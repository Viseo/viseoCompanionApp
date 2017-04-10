/**
 * Created by AAB3605 on 07/04/2017.
 */
import React, {Component} from "react";
import {View} from "react-native";

export default class ItemSpacer extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const flex = parseInt(this.props.flex) || 1
        return (
            <View style={[
                {backgroundColor: 'transparent'},
                {flex},
            ]}>
            </View>
        )
    }
}