import React, {Component} from 'react';
import SearchBar from './SearchBar';
import {TouchableOpacity, View} from 'react-native';
import SearchResults from './SearchResults.container';
import colors from '../../global/colors';

export default class SearchEvents extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={{flexDirection: 'row', backgroundColor: colors.lightBlue}}>
                    <TouchableOpacity
                        style={{flex: 1, alignItems: 'center'}}
                        onPress={() => {
                            this.props.navigator.pop();
                        }}>
                    </TouchableOpacity>
                    <SearchBar style={{flex: 5}}/>
                </View>
                <SearchResults navigator={this.props.navigator}/>
            </View>
        );
    }
}