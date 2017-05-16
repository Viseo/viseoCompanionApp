/**
 * Created by AAB3605 on 07/04/2017.
 */
import React, {Component} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";

export default class Toggle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOn: this.props.isOn,
        }
    }

    toggle = () => {
        this.props.onToggle(!this.state.isOn)
        this.setState({
            isOn: !this.state.isOn
        })
    }

    render() {
        return (
            <TouchableOpacity
                style={[
                    styles.main,
                    this.props.style
                ]}
                onPress={this.toggle}
            >
                {this.state.isOn ? this.props.on : this.props.off}
                {this.props.children}
            </TouchableOpacity>
        )
    }
}

Toggle.displayName = 'Toggle'

Toggle.defaultProps = {
    off: null,
    on: null,
    onToggle: () => {
    },
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 0,
        backgroundColor: 'transparent',
    }
})