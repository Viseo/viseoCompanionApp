/**
 * Created by AAB3605 on 05/04/2017.
 */
import React, {Component} from "react";
import {View, StyleSheet, Text} from "react-native";
import Toggle from "./Toggle";
import AppText from "./appText";

export default class FilterToggle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOn: false
        }
    }

    toggleFilter = (isOn) => {
        let {filter} = this.props
        isOn ? this.props.onSelect(filter) : this.props.onUnselect(filter);
        this.setState({
            isOn
        })
    }

    render() {
        let {isOn} = this.state
        return (
            <Toggle
                style={[
                    styles.mainContainer,
                    isOn && {backgroundColor: this.props.selectedColor},
                    !isOn && {backgroundColor: this.props.unselectedColor}
                    ]}
                onToggle={this.toggleFilter}
                on={
                    <AppText style={styles.innerText}>
                        {this.props.text}
                    </AppText>
                }
                off={
                    <AppText style={styles.innerText}>
                        {this.props.text}
                    </AppText>
                }
            />
        )
    }
}

FilterToggle.defaultProps = {
    selectedColor: 'lightgray',
    unselectedColor: 'transparent',
    filter: {}
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        minHeight:30,
        borderRadius: 2
    },
    innerText: {
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 14,
        textAlignVertical: 'center',
    },
});