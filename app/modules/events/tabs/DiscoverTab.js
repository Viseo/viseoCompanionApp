import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import EventList from './../EventList.container';
import SearchBar from './../../../components/SearchBar';
import ItemSpacer from '../../global/components/ItemSpacer';
import colors from '../../../modules/global/colors';
import PushController from '../../global/pushController';

export default class DiscoverTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <PushController/>
                <View style={styles.body}>
                    <View style={styles.searchBar}>
                        <ItemSpacer/>
                        <SearchBar style={{flex: 22}}/>
                        <ItemSpacer/>
                    </View>
                </View>
                <EventList style={{flex: 22}} navigator={this.props.navigator}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.blue,
        padding: 8,
        paddingBottom: 0,
        paddingTop: 0,
    },
    body: {
        flex: 0,
        flexDirection: 'column',
        paddingBottom: 10,
        marginTop: 20,
    },
    searchBar: {
        flex: 0,
        flexDirection: 'row',
    },
    icon: {
        fontSize: 24,
        height: 22,
        color: 'white',
    },
});