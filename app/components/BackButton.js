/**
 * Created by AAB3605 on 10/04/2017.
 */
import React, {Component} from "react";
import {Image, StyleSheet, TouchableOpacity} from "react-native";

export default class BackButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity
                style={[
                    styles.button,
                    this.props.style
                ]}
                onPress={
                    this.props.onPress ||
                    (
                        () => {
                            if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
                                this.props.navigator.pop();
                            }
                        }
                    )
                }
            >
                <Image
                    source={this.props.source || require('./../images/back.png')}
                    resizeMode="contain"
                    style={styles.fitImage}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    fitImage: {
        flex: 1,
        width: null,
        height: null
    }
})