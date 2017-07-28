import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import AppText from "../global/components/AppText";
import Icon from "react-native-vector-icons/FontAwesome";
import AppTextInput from "../global/components/AppTextInput";

export default  class GridRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mean: this.props.mean,
            quantity: 0,
        };

    }

    render() {
        const {mean} = this.state;
        return (
            <View style={{flexDirection: "row", alignItems: "center", height: 50, width: 350}}>
                <View style={{flex: 3,marginLeft:5,flexWrap:"nowrap"}}>
                    <AppText >{mean.name}</AppText>
                </View>
                <View style={{flex: 2, alignItems: "center"}}>
                    <AppText>{mean.vizzsPerMean}</AppText>
                </View>
                <View style={{flex: 2, flexDirection: "row", alignItems: "center"}}>
                    <Icon.Button name="minus" backgroundColor="rgb(221, 239, 239)"
                                 style={{width: 40, borderRadius: 0}}
                                 onPress={() => {
                                     if (this.state.quantity > 0) {
                                         this.setState({
                                             quantity: this.state.quantity - 1,
                                         });
                                     }
                                 }}
                    />
                    <AppTextInput
                        style={{
                            borderColor: "dimgrey",
                            borderWidth: 1,
                            height: 30,
                            width: 30,
                            backgroundColor: "#fff",
                            fontSize: 15,
                            marginTop: -20,
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 8,
                            paddingRight: 0,
                            marginTop: -10,
                            color: "dimgrey",

                        }}
                        label=""
                        value={this.state.quantity.toString()}
                        onChangeText={quantity => {
                            this.setState({
                                quantity: parseInt(quantity),
                            });
                        }}
                    >

                    </AppTextInput>
                    <Icon.Button name="plus" backgroundColor="rgb(221, 239, 239)"
                                 style={{width: 50, borderRadius: 0}}
                                 onPress={() => {
                                     this.setState({
                                         quantity: this.state.quantity + 1,
                                     });
                                 }}
                    />
                </View>

            </View>
        );
    }

};