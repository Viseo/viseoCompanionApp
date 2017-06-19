/**
 * Created by AAB3605 on 10/04/2017.
 */
import React, {Component} from "react";
import {Image, StyleSheet, View} from "react-native";

export default class FlexImage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Image
                    source={this.props.source}
                    resizeMode={this.props.resizeMode || 'contain'}
                    style={[
                        styles.fitImage,
                        this.props.style
                    ]}
                >
                    {this.props.children}
                </Image>
            </View>
        )
    }
}

FlexImage.displayName = 'FlexImage';

const styles = StyleSheet.create({
    fitImage: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    }
});