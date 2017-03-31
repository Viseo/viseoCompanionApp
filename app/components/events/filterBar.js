/**
 * Created by AAB3605 on 15/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Filter from './filter';
import colors from './colors';

class FilterBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredData: {},
            activeFilters: 0
        }
    }

    intersect(first, second, intersectProperty) {
        if (first.length === 0 || second.length === 0)
            return [];

        return second.filter(item => {
            let keep = false;
            first.forEach(leftItem => {
                for (let property in leftItem) {
                    if (property === intersectProperty && leftItem[property] === item[property]) {
                        keep = true;
                        break;
                    }
                }
            })
            return keep;
        });
    }

    mergeAllFilteredData() {
        let {filteredData} = this.state;
        let inclusiveFilteredData = [];
        for (let key in filteredData) {
            let data = filteredData[key];
            if (!data.intersect) {
                inclusiveFilteredData = inclusiveFilteredData.concat(filteredData[key]);
            }
        }
        let allFilteredData = this.removeDuplicates(inclusiveFilteredData, 'id');
        for (let key in filteredData) {
            if (filteredData[key].intersect && filteredData[key].length > 0) {
                let exclusiveData = filteredData[key];
                allFilteredData = allFilteredData.length > 0 ?
                    this.intersect(allFilteredData, exclusiveData, 'id') :
                    exclusiveData;
            }
        }
        return allFilteredData;
    }

    onFilter = (filterName, data, intersect) => {
        let {filteredData, activeFilters} = this.state;
        filteredData[filterName] = data || [];
        filteredData[filterName].intersect = intersect;
        activeFilters += data === null ? -1 : 1;
        this.setState({
            filteredData,
            activeFilters
        });
        let allFilteredData = this.mergeAllFilteredData();
        this.props.onFilter(allFilteredData, activeFilters);
    };

    removeDuplicates(data, key) {
        let values = {};
        return data.filter(item => {
            let val = item[key];
            let exists = values[val];
            values[val] = true;
            return !exists;
        });
    }

    render() {
        let {dataSource, filters} = this.props;
        filters = filters.map(filter => {
            return (
                <Filter
                    key={filter.name}
                    dataSource={dataSource}
                    filter={filter.retain}
                    className={filter.name}
                    selectedColor={filter.selectedColor}
                    text={filter.displayText}
                    sideText={filter.displaySideText}
                    onFilter={filteredData => {this.onFilter(filter.name, filteredData, !!filter.intersect)}}
                    filterType={filter.filterType}
                />
            );
        });
        return (
            <View style={styles.container}>
                <View style={{
                    backgroundColor:'white',
                    flex:1,
                    flexDirection:'row',
                    borderBottomLeftRadius:8,
                    borderBottomRightRadius:8,
                }}>
                    {filters}
                </View>
            </View>
        );
    }
}

export default FilterBar;

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor:colors.lightGray,
        borderTopWidth:0.5,
        borderColor: 'lightgray'
    }
});
