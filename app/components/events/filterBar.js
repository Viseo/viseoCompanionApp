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
            <View style={{flexDirection: 'row'}}>
                <Filter
                    className="participation"
                    selectedColor='royalblue'
                    filterType="circle"
                    sideText="Going"
                    onFilter={() => {this.props.participation()}}
                />
                <View style={styles.container}>
                    <Filter
                        className="important"
                        selectedColor='red'
                        text="Important"
                        onFilter={() => {this.props.category(0)}}
                    />
                    <Filter
                        className="informative"
                        text="Informative"
                        selectedColor='orange'
                        onFilter={() => {this.props.category(1)}}
                    />
                    <Filter
                        className="refreshing"
                        text="Refreshing"
                        selectedColor='lightgreen'
                        onFilter={() => {this.props.category(2)}}
                    />
                </View>
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
