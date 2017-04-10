/**
 * Created by AAB3605 on 05/04/2017.
 */
import React, {Component} from "react";
import {View, StyleSheet, Text} from "react-native";
import Toggle from './../Toggle'
import AppText from './../appText'

export default class FilterToggle extends Component {

    toggleFilter = (isOn) => {
        let {filter} = this.props
        isOn ? this.props.onSelect(filter) : this.props.onUnselect(filter);
    }

    render() {
        return (
            <Toggle
                style={styles.mainContainer}
                onToggle={this.toggleFilter}
                on={
                    <AppText
                        style={[
                            styles.innerText,
                            {backgroundColor: this.props.selectedColor},
                        ]}
                    >
                        {this.props.text}
                    </AppText>
                }
                off={
                    <AppText
                        style={[
                            styles.innerText,
                            {backgroundColor: this.props.unselectedColor},
                        ]}
                    >
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
    },
    innerText: {
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 14,
        textAlignVertical: 'center',
    },
});