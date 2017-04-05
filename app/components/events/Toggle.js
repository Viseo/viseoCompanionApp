/**
 * Created by AAB3605 on 05/04/2017.
 */
import React, {Component} from "react";
import {View, TouchableOpacity, StyleSheet, Text, Dimensions} from "react-native";

export default class Toggle extends Component {

    static defaultProps = {
        selectedColor: 'black',
        unselectedColor: 'grey',
        filter: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    toggleFilter = () => {
        let {filter} = this.props
        this.state.selected ? this.props.onUnselect(filter) : this.props.onSelect(filter);
        this.setState({
            selected: !this.state.selected
        })
    }

    render() {
        let {selected} = this.state;
        return (
            <View
                style={[
                    styles.mainContainer,
                    selected && {backgroundColor: this.props.selectedColor},
                ]}
            >
                <TouchableOpacity
                    onPress={this.toggleFilter}
                >
                    <Text
                        style={[
                            styles.innerText,
                            selected && {color: 'white'},
                            !selected && {color: this.props.unselectedColor}
                        ]}
                    >
                        {this.props.text}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    innerText: {
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 14,
        textAlignVertical:'center',
    },
});