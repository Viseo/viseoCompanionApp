/**
 * Created by VBO3596 on 10/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

class Filter extends Component {

    static defaultProps = {
        selectedColor: 'black',
        unselectedColor: 'grey'
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
        return (
            <View>
                <TouchableOpacity
                    style={[
                        styles.circle,
                        selected && {backgroundColor: this.props.selectedColor},
                        !selected && {backgroundColor: this.props.unselectedColor},
                        {borderColor: this.props.color}
                        ]}
                    onPress={this.toggleFilter}
                />
            </View>
        )
    }
}

export default Filter;

const styles = StyleSheet.create({
    circle: {
        height: 30,
        width: 30,
        borderRadius: 30,
        borderWidth: 2,
        marginTop: 5,
        marginBottom: 10,
        // marginLeft: 35,
        // marginRight: 35
    }
});