import React, {Component} from 'react';
import {Dimensions, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {defaultNavBarStyle} from './navigatorStyle';

export default class ModalButtons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        switch (event.id) {
            case "willAppear":
                this.setState({
                    show: true,
                });
                break;
            case "bottomTabReselected":
             this.setState({
                 show:true
             });
                break;
        }
    }

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.show}
                style={{

                }}
                onRequestClose={() => {
                    this.setState({
                        show: false,
                    });
                    this.props.navigator.switchToTab({
                        tabIndex: 0
                    });
                }}
            >
                <TouchableWithoutFeedback onPress={() => {
                    this.setState({show: false});
                    this.props.navigator.switchToTab({
                        tabIndex: 0
                    })
                }}>
                <View style={[styles.container, styles.buttonBar]}>
                    <View style={{flex: .5, marginBottom: 30, alignItems: "center"}}>
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
                                }}
                                onPress={() => {
                                    this.props.navigator.push({
                                        screen: 'actions.CreateAction',
                                        title: 'Créer action',
                                        navigatorStyle: defaultNavBarStyle,
                                    });
                                }}
                            >
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
                                }}

                                onPress={() => {
                                    {/*this.setState({show: false});*/}
                                    {/*this.props.navigator.switchToTab({*/}
                                        {/*tabIndex: 0*/}
                                    {/*});*/}
                                }}
                            >
                                <Icon
                                    name='calendar-plus-o'
                                    size={50}
                                    style={{color: "white", textAlign: "center", marginTop: 2}}
                                />
                            </TouchableOpacity>
                            <Text style={{color: "white", marginLeft: -10}}>Créer un évènement</Text>
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
                                }}
                                onPress={() => {
                                    {/*this.setState({show: false});*/}
                                    {/*this.props.navigator.switchToTab({*/}
                                        {/*tabIndex: 0*/}
                                    {/*});*/}
                                }}
                            >
                                <Icon
                                    name='list'
                                    size={50}
                                    style={{color: "white", textAlign: "center", marginTop: 2}}
                                />
                            </TouchableOpacity>
                            <Text style={{color: "white"}}>Voir mes actions</Text>
                        </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>
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
        height:Dimensions.get("window").height/2,
        padding: 16,
        backgroundColor: "rgb(0,0,0)",
        marginTop:50,
        marginBottom:50
    },

});