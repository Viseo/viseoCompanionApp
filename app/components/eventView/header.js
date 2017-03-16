/**
 * Created by AAB3605 on 15/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import SearchBar from './searchBar';
import FilterBar from './filterBar';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <SearchBar {...this.props.searchBar}/>
                <FilterBar {...this.props.filters}/>
            </View>
        );
    }
}

export default Header;