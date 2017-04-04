/**
 * Created by AAB3605 on 15/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Image
} from 'react-native';
import strings from './../../util/localizedStrings'

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
                <View style={{
                    flex:5,
                }}>
                    <TextInput
                        className="searchBar"
                        style={[
                            styles.input,
                            this.props.filtersVisible && styles.inputWhenFilterBarIsVisible
                        ]}
                        placeholder={strings.search + "..."}
                        onChangeText={this.onChangeText}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                </View>
            </View>
        );
    }
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white',
        borderRadius:3
    },
    input: {
        flex: 1,
        fontSize: 15,
        backgroundColor: 'white',
        textAlign: 'center',
        borderTopLeftRadius:3,
        borderBottomLeftRadius:3,
    },
    inputWhenFilterBarIsVisible: {
        borderBottomLeftRadius:0
    }
});