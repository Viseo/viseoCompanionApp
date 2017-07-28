import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg from 'react-native-svg/elements/Svg';
import {Image} from 'react-native-svg';
import colors from '../global/colors';
import AppText from '../global/components/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as db from '../global/db';
import GridRow from './GridRow';
import Action from './Action';

export default class CreateAction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            meanOptions: [],
            showTable: false,
            means: [],
            sold: '980',
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentWillMount() {
        this._getMeans();
    }

    onNavigatorEvent(event) {
        if (event.id === 'vizz') {
            this._goToVizzManagement();
        }
    }

    _goToVizzManagement() {
        this.props.navigator.push({
            screen: 'VizzManagement',
            title: 'VizzManagement',
        });
    }

    render() {
        return (
            <View>
                {this._renderHeadband()}
                {this._renderCreateAction()}
                <View style={{flexDirection: "column"}}>
                    {this._renderAction()}
                    {this._renderMeanButton()}
                    { this.state.showTable ?
                        this._renderMeans()
                        : null
                    }
                </View>
            </View>
        );
    }

    _renderAction() {
        return (
            <View style={{justifyContent: "space-between",}}>
                <AppText style={{padding: 30}}>Action</AppText>
                <Action/>
            </View>
        );
    }

    _renderMeanButton() {
        const show = this.state.showTable;
        return (
            <View style={{flexDirection: "row", marginTop: 50, marginLeft: 30}}>
                <Icon.Button name="angle-down" backgroundColor="#00BFB3"
                             style={{width: 350, height: 50, borderRadius: 0}}
                             onPress={() => {
                                 this.setState({
                                     showTable: !show,
                                 });
                             }}
                >
                    <Text style={{fontSize: 15, color: "#fff"}}>Acheter un moyen</Text>
                </Icon.Button>
            </View>
        );
    }

    _renderMeans() {

        return (
            <View style={{
                flexDirection: "column",
                backgroundColor: "rgb(221, 239, 239)",
                width: 350,
                marginLeft: 30,
                marginRight: 20,
            }}>
                <View style={{flexDirection: "row", justifyContent: "space-between", height: 50, width: 200}}>
                    <AppText style={{paddingRight: 30, paddingLeft: 30}}>Moyen</AppText>
                    <AppText style={{paddingRight: 50, paddingLeft: 50}}>Prix</AppText>
                    <AppText style={{paddingRight: 10, paddingLeft: 10}}>Quantité</AppText>
                </View>
                {
                    this.state.meanOptions.map((mean, i) =>
                    <GridRow mean={mean} key={i}></GridRow>
                    )
                }
            </View>
        );
    }

    _isNonEmpty(text) {
        return text.length > 0;
    }

    _getMeans = async () => {
        this.setState({
            meanOptions: await db.actions.getMeans(),
        });

    };

    _renderHeadband() {
        return (
            <Svg width="550" height="150">
                <Image width="550" height="150" href={require("../../images/NIVEAUX_BANDEAU_1.jpg")}/>
            </Svg>
        );
    }

    _renderCreateAction() {
        return (
            <View style={styles.createAction}>
                <AppText style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    height: 40,
                    color: colors.orange,
                    marginLeft: 25,
                    marginTop: 10,
                    marginBottom: 10,
                }}>
                    Créer une action
                </AppText>
                <View style={{backgroundColor: colors.orange, height: 5}}/>
            </View>
        );
    }
};

CreateAction.navigatorButtons = {
    rightButtons: [
        {
            icon: require('../../images/events/vizz_logo.png'),
            id: 'vizz',
            disabled: 'true',
        },
        {
            title: '980',
            id: 'vizz',
            disabled: 'true',
        },
    ],
};

const styles = StyleSheet.create({
    createAction: {
        backgroundColor: colors.white,
        alignContent: "center",
        marginTop: -30,
        marginRight: 20,
        marginLeft: 20,

    },
    componentContainer: {
        flex: 1,
        flexDirection: "column",
    },
    head: {height: 40},
    title: {flex: 1},
    row: {height: 30},
    text: {textAlign: "center", color: "dimgrey"},
});