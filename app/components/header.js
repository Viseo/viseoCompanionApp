/**
 * Created by LMA3606 on 16/03/2017.
 */
import React, {Component} from "react";
import {View, StyleSheet, Platform, Dimensions, Image, Text, Button} from "react-native";
import AppText from "./appText";
import colors from './events/colors';
import strings from "../util/localizedStrings";

class Header extends Component {

    static defaultProps = {
        isModificationAllowed: false,
        isInModificationMode: false,
        isInCreationMode: false,
        cannotSave: false
    }

    constructor(props) {
        super(props);
        this.state = {
            isModificationAllowed: this.props.isModificationAllowed,
            isInModificationMode: this.props.isInModificationMode,
            isInCreationMode: this.props.isInCreationMode
        };
    }

    render() {
        if(this.state.isModificationAllowed){
            return(
                <View style={styles.topbar}>
                    <View style={{flex:3, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <AppText style={styles.topBarText}>{strings.profileEditionLabel}</AppText>
                    </View>
                    <View style={{flex:2, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            {this.state.isInModificationMode ? this.renderSaveButton() : this.renderEditButton()}
                            <Button title={strings.delete} style={{flex:1, marginLeft:5}} onPress={() => {this.props.delete()}}/>
                        </View>

                    </View>
                </View>
            );
        }
        else{
            return(
                <View style={styles.topbar}>
                    <AppText style={styles.viseocompanion}>VISEO COMPANION</AppText>
                </View>
            );
        }
    }

    renderSaveButton(){
        return(
            <Button disabled={this.props.cannotSave} title={strings.save} style={{flex:1, marginLeft:5}}
                    onPress={() => {this.props.save();}}/>
        );
    }

    renderEditButton(){
        return(
            <Button title={strings.edit} style={{flex:1, margin:1}}
                    onPress={() => {
                            this.setState({isInModificationMode: true});
                            this.props.edit();}}/>
        );
    }
}

export default Header;

var {
    height: deviceHeight,
} = Dimensions.get('window');

const styles = StyleSheet.create({
    topbar: {
        alignItems: 'center',
        flexDirection: 'row',
        height: (1 / 16) * deviceHeight,
        backgroundColor: colors.blue,
        marginTop:(Platform.OS === 'ios') ? 20 : 0,
    },

    topBarText: {
        paddingHorizontal:10,
        fontSize: 20,
        color: 'white',
    },

    burgerMenu: {
        flex:0,
        width: 25,
        height: 25,
        margin:10,
    },
    viseocompanion: {
        textAlign: 'center',
        flex:1,
        fontSize: 20,
        color: 'white',
    },
});