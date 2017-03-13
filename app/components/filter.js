/**
 * Created by VBO3596 on 10/03/2017.
 */
import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

class Filter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: false,
        };
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={
                        [styles.circle,
                        {backgroundColor: this.props.color },
                        {borderColor: this.props.color}]}
                    onPress={() => this.setState({
                        selected: !this.state.selected,
                })}/>
            </View>
        )
    }
}

Filter.defaultProps = {
    color: 'grey',
    backgroundColor: 'transparent'
}
export default Filter;

const styles = StyleSheet.create({
    circle: {
        height: 30,
        width: 30,
        borderRadius: 30,
        borderWidth: 2,
        margin: 15
    }
});