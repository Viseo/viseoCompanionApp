/**
 * Created by VBO3596 on 10/03/2017.
 */
import React, {Component} from "react";
import {View, TouchableOpacity, StyleSheet, Text, Dimensions} from "react-native";
import colors from './colors';

class Filter extends Component {

    static defaultProps = {
        selectedColor: 'black',
        unselectedColor: 'grey',
        filterType: "rectangle",
    }

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
    }

    filter() {
        let {dataSource, filter} = this.props;
        let matchingData = [];
        dataSource.forEach(data => {
           for(let property in data) {
               if(property === filter.property && data[property] === filter.value) {
                   matchingData.push(data);
               }
           }
        });
        return matchingData;
    }

    toggleFilter = () => {
        let filteredData = this.state.selected ? null : this.filter();
        this.props.onFilter(filteredData);
        this.setState({
            selected: !this.state.selected
        });
    }

    render() {
        let { selected } = this.state;
        return (
            <View
                style={[
                    {
                    flexDirection: 'row',
                    justifyContent:'center',
                    alignItems:'center',
                    flex:1,
                    },
                    selected && {backgroundColor: this.props.selectedColor},
                ]}
            >
                <TouchableOpacity
                    onPress={this.toggleFilter}
                >
                    <Text style={[styles.innerText,
                    selected && {color: 'white'},
                    !selected && {color: colors.mediumGray}]}>
                        {this.props.text}
                    </Text>

                </TouchableOpacity>
            </View>
        )
    }

    renderSideText() {
        return (
            <Text style={styles.sideText}>
                {this.props.sideText}
            </Text>
        );
    }
}

export default Filter;

const {
    height: deviceHeight,
    width: deviceWidth,
} = Dimensions.get('window');

const styles = StyleSheet.create({
    circle: {
        height: deviceWidth * 0.05,
        width: deviceWidth * 0.05,
        borderRadius: 30,
        margin: 10,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerText: {
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 14,
        paddingVertical:10
    },

    sideText: {
        textAlign: 'center',
        textAlignVertical:'center',
        fontSize: 14,
    },
});