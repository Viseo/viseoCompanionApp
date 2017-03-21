/**
 * Created by AAB3605 on 15/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet
} from 'react-native';

class SearchBar extends Component {

    constructor(props) {
        super(props);
    }

    containsString = (source, search, caseSensitive = false) => {
        let sourceString = caseSensitive ? source.toString() : source.toString().toLowerCase();
        let searchString = caseSensitive ? search.toString() : search.toString().toLowerCase();
        return sourceString
            && searchString
            && sourceString.indexOf(searchString) > -1;
    };

    findMatchingData = searchString => {
        let matchingData = [];
        let {dataSource} = this.props;
        dataSource.forEach(data => {
            data.searchWords = this.findPropertiesWithMatchingData(data, searchString);
            if (this.matchingDataFoundInAtLeastOneProperty(data)) {
                matchingData.push(data);
            }
        });
        return matchingData.slice();
    };

    findPropertiesWithMatchingData(data, searchString) {
        let searchResults = {
            searchString,
            properties: []
        };
        for (let key in data) {
            if (typeof data[key] === "function" || !data[key])
                continue;
            if (
                this.containsString(data[key], searchString)
                || this.matchesSpecialSearchCriteria(data[key], searchString)
            ) {
                searchResults.properties.push(key);
            }
        }
        data.searchWords = searchResults;
        return searchResults;
    }

    matchesSpecialSearchCriteria(data, searchString) {
        let {specialSearchCriteria} = this.props;
        for (let specialSearchString in specialSearchCriteria) {
            if (specialSearchString === searchString) {
                let criterion = specialSearchCriteria[specialSearchString];
                for (let property in criterion) {
                    if (data === criterion[property]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    matchingDataFoundInAtLeastOneProperty(data) {
        return data.searchWords.properties.length > 0;
    }

    onChangeText = searchString => {
        let matchingData = this.findMatchingData(searchString);
        this.props.onSearch(this.props.dataSource, searchString, matchingData);
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    className="searchBar"
                    style={styles.input}
                    placeholder="Search..."
                    onChangeText={this.onChangeText}
                />
            </View>
        );
    }
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C1C1C1',
    },
    input: {
        height: 50,
        flex: 1,
        paddingHorizontal: 8,
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        textAlign: 'center',
    },
});