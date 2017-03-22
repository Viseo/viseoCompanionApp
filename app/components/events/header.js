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
import strings from "../../util/localizedStrings";

export default class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let specialSearchCriteria = {
            'going': {
                participating: true,
            },
        }
        let filters = [
            {
                name: 'participating',
                displaySideText: strings.goingFilter,
                filterType:'circle',
                selectedColor: 'royalblue',
                retain: {
                    property: 'participating',
                    value: true
                },
                intersect: true
            },
            {
                name: 'important',
                displayText: strings.importantFilter,
                selectedColor: 'pink',
                retain: {
                    property: 'category',
                    value: 0
                }
            },
            {
                name: 'informative',
                displayText: strings.informativeFilter,
                selectedColor: 'orange',
                retain: {
                    property: 'category',
                    value: 1
                }
            },
            {
                name: 'entertaining',
                displayText: strings.entertainingFilter,
                selectedColor: 'lightgreen',
                retain: {
                    property: 'category',
                    value: 2
                }
            },
        ];
        return (
            <View>
                <SearchBar
                    specialSearchCriteria={specialSearchCriteria}
                    {...this.props.searchBar}
                />
                <FilterBar
                    dataSource={this.props.dataSource}
                    filters={filters}
                    onFilter={this.props.onFilter}
                />
            </View>
        );
    }
}