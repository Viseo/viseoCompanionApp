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

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    className="searchBar"
                    style={styles.input}
                    dataSource={this.props.dataSource}
                    onInputChanged={this.props.onInputChanged}
                    placeholder="Search..."
                    onChangeText={(text) => {}}
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