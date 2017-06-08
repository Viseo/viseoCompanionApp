import React, {Component} from "react";
import {Button, Dimensions, Platform, StyleSheet, TextInput, View} from "react-native";
const {height} = Dimensions.get('window');
import AppText from "../modules/global/AppText";
import * as comment from "./../util/db"
import BackButton from "./../components/BackButton";
import colors from "../modules/global/colors";
import ItemSpacer from "./../components/ItemSpacer";

let {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
export default class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            name: this.props.name
        }
    }

    render() {
        return (
            <View style={{height, marginTop: (Platform.OS === 'ios') ? 20 : 0, backgroundColor: colors.white}}>
                {this.renderHeader()}
                <View style={{padding: 25}}>
                    <AppText style={{marginVertical: 50, fontSize: 30}}>
                        {this.state.name}
                    </AppText>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <TextInput
                        style={{width: 360, height: 200, borderColor: 'gray', borderWidth: 1}}
                        defaultValue="Veuillez entrer votre commentaire ..."
                        onChangeText={(text) => this.setState({text})}
                        multiline={true}
                    />
                </View>
                <View style={{padding: 25}}>
                    <View style={{width: 200, height: 50}}/>
                    <Button
                        style={{width: 200, height: 100}}
                        title="envoyer"
                        onPress={ async () => {
                            let sendComment = await comment.addComment();
                        }}
                    />
                </View>
            </View>
        )
    }

    renderHeader() {
        let {editing} = this.state;
        const backButton = (
            <BackButton navigator={this.props.navigator}/>
        );
        const cancelButton = (
            <BackButton
                navigator={this.props.navigator}
                source={require("./../images/crossWhite.png")}
                style={{padding: 8}}
                onPress={() => this.setState({editing: false})}
            />
        );
        return (
            <View
                style={{flex: 0, height: 40, flexDirection: 'row', backgroundColor: colors.blue, alignItems: 'center'}}>
                {editing ? cancelButton :
                    backButton
                }
                <AppText style={{flex: 5, color: 'white', fontSize: 20}}>
                    {editing ? "Modification du commentaire" : "événement"}
                </AppText>
                <View style={{flex: 3, flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <ItemSpacer/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    avatar: {
        height: deviceWidth / 4,
        width: deviceWidth / 4,
        borderRadius: deviceWidth / 8,
        fontSize: 40,
        backgroundColor: colors.lightGray,
        textAlign: 'center',
        color: 'white',
    },
    topBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.blue,
        alignItems: 'center',
        height: (1 / 16) * deviceHeight,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    displayText: {
        fontSize: 18,
    },
    topBarText: {
        paddingHorizontal: 10,
        fontSize: 20,
        color: 'white',
    },

    container: {
        flex: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },

    organizatorPictureCircle: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },

    field: {
        justifyContent: 'center',
        fontSize: 16,
        color: colors.mediumGray,
        textAlign: 'center',
    },
    textFieldContainer: {
        marginTop: 20,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(186, 242, 255, 1)'
    }
});