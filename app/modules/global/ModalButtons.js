import React, {Component} from "react";
import {View,Modal, Dimensions, StyleSheet, TouchableOpacity, Text} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Navigation} from "react-native-navigation";
export default class ModalButtons extends Component {

    constructor(props) {
        super(props);
        this.state={
            show:false
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent(event) {
        switch(event.id) {
            case 'willAppear':
                this.setState({
                    show:true
                })
                break;
            case 'didAppear':

                break;
            case 'willDisappear':
                break;
            case 'didDisappear':
                break;
        }
    }

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.show}
                onRequestClose={() => { this.setState({
                    show:false
                })
                    this.props.navigator.pop();
                }}
            >
            <View style={[styles.container, styles.buttonBar]}>
                <View style={{flex: .5, marginBottom:30, alignItems: "center"}}>
                    <View style={{flexDirection: "column"}}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: "rgba(0,0,0,0.2)",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 100,
                                height: 100,
                                backgroundColor: "#f5a242",
                                borderRadius: 100,
                            }}>
                            <Icon
                                name='cog'
                                size={50}
                                style={{color: "white", textAlign: "center", marginTop: 2}}
                            />
                        </TouchableOpacity>
                        <Text style={{color: "white"}}>Créer une action</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around",}}>
                    <View style={{flexDirection: "column"}}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: "rgba(0,0,0,0.2)",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 100,
                                height: 100,
                                backgroundColor: "#b11592",

                                borderRadius: 100,
                            }}>
                            <Icon
                                name='calendar-plus-o'
                                size={50}
                                style={{color: "white", textAlign: "center", marginTop: 2}}
                            />
                        </TouchableOpacity>
                        <Text style={{color: "white",marginLeft:-10}}>Créer un évènement</Text>
                    </View>
                    <View style={{flexDirection: "column"}}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: "rgba(0,0,0,0.2)",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 100,
                                height: 100,
                                backgroundColor: "#ed6645",
                                borderRadius: 100,
                            }}>
                            <Icon
                                name='list'
                                size={50}
                                style={{color: "white", textAlign: "center", marginTop: 2}}
                            />
                        </TouchableOpacity>
                        <Text style={{color: "white"}} >Voir mes actions</Text>
                    </View>
                </View>

            </View>
            </Modal>
        );
    }
};

const styles = StyleSheet.create({
    buttonBar: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        paddingTop: 320,
    },
    container: {
        width: Dimensions.get("window").width,
        padding: 16,
        backgroundColor:"rgba(0,0,0,0.7)"
    },

});