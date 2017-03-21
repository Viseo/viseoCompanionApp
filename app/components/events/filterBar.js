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
                    onFilter={() => {this.props.category(0)}}
                />
                <Filter
                    className="optional"
                    onFilter={() => {this.props.category(1)}}
                />
                <Filter
                    className="other"
                    onFilter={() => {this.props.category(2)}}
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
