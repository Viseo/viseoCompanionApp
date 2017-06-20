import React, {Component} from "react";
import TextField from "react-native-md-textinput";
import colors from "../global/colors";
import {Button, View, StyleSheet, Image, Dimensions} from "react-native";
import * as db from "../global/db";
import {Navigation} from "react-native-navigation";

export default class NotationRemark extends Component {

    constructor(props) {
        super(props);
        this.state = {
            review: "",
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
                    <Image source={require("./../../images/sad.png")} style={{width: 50, height: 50}}/>
                </View>
                <View style={{flex: 1, flexDirection: "column"}}>
                    <TextField
                        ref="textInput"
                        label="Dites nous ce qu'il faut améliorer"
                        value={this.state.review.toString()}
                        multiline={true}
                        style={
                            {
                                color: colors.mediumGray,
                                borderColor: "#d0d0d0",
                                borderWidth: 1,
                                borderRadius: 2,
                                backgroundColor: "#fff",
                                height: 100,
                            }
                        }
                        onChangeText={(text) => {
                            this.setState({
                                review: text,
                            });
                        }}/>
                </View>
                <View style={{flex: 1, flexDirection: "column", marginTop: 100}}>
                    <Button
                        title="Envoyer"
                        onPress={ async() => {
                            const notation = {
                                ...this.props.notation,
                                avis: this.state.review,
                            };
                            await db.sendReview(notation);
                            this.redirect();
                        }}
                    />
                </View>
            </View>        );
    }

    redirect = () => {

        Navigation.dismissLightBox({
            animationType: "slide-down",
        });
        Navigation.showLightBox({
            screen: "notation.NotationThanks",
            title: "Mercii",
            passProps: {
                textContent: "Merci pour vos remarques !",
                emotion: "done"
            },
            animationType: "slide-up",
        });
    }

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ede3f2",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.6,
    },
});
