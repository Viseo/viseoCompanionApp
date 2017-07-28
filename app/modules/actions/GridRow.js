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
            means: [],
            quantity:"0"
        };

    }

    render() {
        const {means,mean} = this.state;
        return (
            <View style={{flexDirection: "row", alignItems: "center", height: 50, width: 350}} >
                <View style={{flex: 2, paddingLeft: 3, alignItems: "center"}}>
                    <AppText>{this.state.mean.name}</AppText>
                </View>
                <View style={{flex: 2, alignItems: "center"}}>
                    <AppText>{this.state.mean.vizzsPerMean}</AppText>
                </View>
                <View style={{flex: 2, flexDirection: "row", alignItems: "center"}}>
                    <Icon.Button name="minus" backgroundColor="transparent"
                                 style={{width: 40, height: 10, borderRadius: 0, paddingBottom: 30}}
                                 onPress={() => {
                                     this.setState({
                                         quantity: parseInt(this.state.quantity)-1
                                     });
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
                            paddingLeft: 10,
                            paddingRight: 5,
                            color: "dimgrey",

                        }}
                        label=""
                        value={this.state.quantity}
                        onChangeText={quantity => {
                            quantity.push(mean);
                            this.setState({
                                mean,
                                means: means,
                            });
                        }}
                    >

                    </AppTextInput>
                    <Icon.Button name="plus" backgroundColor="transparent"
                                 style={{width: 50, height: 10, borderRadius: 0, paddingBottom: 30}}
                                 onPress={() => {
                                     this.setState({
                                       quantity: parseInt(this.state.quantity)+1
                                     });
                                 }}
                    />
                </View>

            </View>
        );
    }

};