import React, {Component} from 'react';
import SearchBar from './SearchBar';
import {TouchableOpacity, View} from 'react-native';
import SearchResults from './SearchResults.container';
import colors from '../../global/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';

export default class SearchEvents extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={{flexDirection: 'row', backgroundColor: colors.lightGreen}}>
                    <TouchableOpacity
                        style={{flex: 1, alignItems: 'center', marginTop: 12}}
                        onPress={() => {
                            Navigation.dismissModal();
                        }}>
                        <Icon name="ios-arrow-back" size={36} color="#FFFFFF"/>
                    </TouchableOpacity>
                    <SearchBar style={{flex: 5}}/>
                </View>
                <SearchResults navigator={this.props.navigator}/>
            </View>
        );
    }
}