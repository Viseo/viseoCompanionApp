/**
 * Created by VBO3596 on 10/03/2017.
 */
import React, {Component} from "react";
import {View, TouchableOpacity, StyleSheet, Text, Dimensions} from "react-native";

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
        let style = this.props.filterType === "circle" ? styles.circle : styles.rectangle;
        let sideText = this.props.sideText ? this.renderSideText() : null;
        return (
            <View style={{flexDirection: 'row', alignItems:'center'}}>
                <TouchableOpacity
                    style={[
                    style,
                    selected && {backgroundColor: this.props.selectedColor},
                    ]}
                    onPress={this.toggleFilter}
                >
                    <Text style={[styles.innerText,
                    selected && {color: 'white'},
                    !selected && {color: this.props.selectedColor}]}>
                        {this.props.text}
                    </Text>
                </TouchableOpacity>
                {sideText}
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

    rectangle: {
        height: deviceHeight * 0.06,
        width: deviceWidth * 0.24,
        borderRadius: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    innerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: deviceHeight * 0.02,
    },

    sideText: {
        textAlign: 'center',
        textAlignVertical:'center',
        marginRight: deviceHeight * 0.015,
        fontSize: deviceHeight * 0.02,
    },
});