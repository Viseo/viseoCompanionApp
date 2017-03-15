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
        selected: false
    }

    constructor(props) {
        super(props);
    }

    render() {
        let { selected } = this.props;
        return (
            <View>
                <TouchableOpacity
                    style={[
                        styles.circle,
                        selected && {backgroundColor: this.props.selectedColor},
                        !selected && {backgroundColor: this.props.unselectedColor},
                        {borderColor: this.props.color}
                        ]}
                    onPress={this.props.onFilter}
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