/**
 * Created by VBO3596 on 10/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';

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

    toggleFilter = () => {
        this.setState({
            selected: !this.state.selected
        })
        this.props.onFilter();
    }

    render() {
        let { selected } = this.state;
        let style = this.props.filterType === "circle" ? styles.circle : styles.rectangle;
        return (
            <View style={{flexDirection: 'row'}}>
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
                <Text style={styles.sideText}>
                    {this.props.sideText}
                </Text>
            </View>
        )
    }
}

export default Filter;

const styles = StyleSheet.create({
    circle: {
        height: 20,
        width: 20,
        borderRadius: 30,
        margin: 10,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },

    rectangle: {
        height: 30,
        width: 90,
        borderRadius: 1,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    innerText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },

    sideText: {
        textAlign: 'center',
        marginTop: 10,
    },
});