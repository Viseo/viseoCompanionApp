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
    }

    render() {
        return (
            <View style={styles.container}>
                <Filter
                    className="important"
                />
                <Filter
                    className="optional"
                />
                <Filter
                    className="other"
                />
                <Filter
                    className="participation"
                    selectedColor='royalblue'
                    unselectedColor='lightblue'
                    onFilter={() => {this.props.participation()}}
                />
            </View>
        );
    }
}

export default FilterBar;

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 40,
        marginLeft: 40
    }
});
