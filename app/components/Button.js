import React, {Component} from 'react'
import {
    TouchableOpacity,
    StyleSheet
} from 'react-native'

export default class Button extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity
                {...this.props}
                style={[
                    styles.button,
                    this.props.style
                ]}
            >
                {this.props.children}
            </TouchableOpacity>
        )
    }

}

Button.displayName = 'Button';

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});