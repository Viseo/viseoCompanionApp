/**
 * Created by AAB3605 on 15/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Filter from './filter';

class FilterBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredData: {}
        }
    }

    mergeAllFilteredData() {
        let {filteredData} = this.state;
        let allFilteredData = [];
        for(let key in filteredData) {
            allFilteredData = allFilteredData.concat(filteredData[key]);
        }
        return this.removeDuplicates(allFilteredData, 'id');
    }

    onFilter = (filterName, data) => {
        let {filteredData} = this.state;
        filteredData[filterName] = data;
        this.setState({
            filteredData
        });
        let allFilteredData = this.mergeAllFilteredData();
        this.props.onFilter(allFilteredData);
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
                    onFilter={filteredData => {this.onFilter(filter.name, filteredData)}}
                />
            );
        });
        return (
            <View style={{flexDirection: 'row', justifyContent:'center'}}>
                {filters}
            </View>
        );
    }
}

export default FilterBar;

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginRight: 0,
        marginLeft: 40
    }
});
