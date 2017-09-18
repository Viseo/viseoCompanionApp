import React, {Component} from "react";
import {Button, View, Dimensions} from "react-native";
import AppText from "../global/components/AppText";
import * as db from "../global/db";

export default class DeleteAction extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#FFFFFF",
                padding: 10,
                width: Dimensions.get("window").width * 0.7,
                height: Dimensions.get("window").height * 0.2,
            }}>
                <View style={{flex: 1}}>
                    <AppText>Voulez-vous supprimer cette action ?
                      </AppText>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    height: 30,
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <View style={{flex: .5, alignSelf: "center", marginRight: 5}}>
                        <Button onPress={() => {
                            db.actions.delete(this.props.actionId);
                            this.props.navigator.dismissLightBox();
                        }}
                                title="Oui"/>
                    </View>
                    <View style={{flex: .5, alignSelf: "center"}}>
                        <Button onPress={() => {
                            this.props.navigator.dismissLightBox();
                        }}
                                title="Non"/>
                    </View>
                </View>
            </View>
        );
    }
};