/**
 * Created by AAB3605 on 15/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import SearchBar from './searchBar';
import FilterBar from './filterBar';
import strings from "../../util/localizedStrings";
import colors from './colors';
import * as util from "../../util/util";

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filtersVisible: false
        }
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
                displayText: strings.goingFilter,
                filterType: 'circle',
                selectedColor: colors.blue,
                retain: {
                    property: 'participating',
                    value: true
                },
                intersect: true
            },
            {
                name: 'important',
                displayText: strings.categoriesNames[0],
                selectedColor: util.getCategoryColor(0),
                retain: {
                    property: 'category',
                    value: 0
                }
            },
            {
                name: 'informative',
                displayText: strings.categoriesNames[1],
                selectedColor: util.getCategoryColor(1),
                retain: {
                    property: 'category',
                    value: 1
                }
            },
            {
                name: 'entertaining',
                displayText: strings.categoriesNames[2],
                selectedColor: util.getCategoryColor(2),
                retain: {
                    property: 'category',
                    value: 2
                }
            },
        ];
        let filterBar = this.state.filtersVisible ? this.renderFilterBar(filters) : null;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBar}>
                        <SearchBar
                            specialSearchCriteria={specialSearchCriteria}
                            {...this.props.searchBar}
                            filtersVisible={this.state.filtersVisible}
                        />
                    </View>
                    {this.renderFilterToggle()}
                </View>
                {filterBar}
            </View>
        );
    }

    renderFilterBar = filters => {
        return (
            <FilterBar
                dataSource={this.props.dataSource}
                filters={filters}
                onFilter={this.props.onFilter}
            />
        );
    }

    renderFilterToggle() {
        return this.state.filtersVisible ?
            (
                <View style={styles.filterToggle}>
                    <TouchableOpacity
                        onPress={this.toggleFilters}
                    >
                        <Image
                            source={require('./../../images/upArrow.png')}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
            ) :
            (
                <View style={styles.filterToggle}>
                    <TouchableOpacity
                        onPress={this.toggleFilters}
                    >
                        <Image
                            source={require('./../../images/filter.png')}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
            );
    }

    toggleFilters = () => {
        this.setState({
            filtersVisible: !this.state.filtersVisible
        })
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.lightGray
    },
    searchBarContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    searchBar: {
        flex: 10,
    },
    filterToggle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        padding: 10
    },
});