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
    }

    findMatchingData = (searchString) => {
        let matchingData = [];
        let { dataSource } = this.props;
        dataSource.forEach( data => {
            for (let key in data) {
                if (this.containsString(data[key], searchString)) {
                    matchingData.push(data);
                    break;
                }
            }
        });
        return matchingData.slice();
    }

    onChangeText = (searchString) => {
        let matchingData = this.findMatchingData(searchString);
        this.props.onSearch(this.props.dataSource, matchingData);
    }

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
    },
});