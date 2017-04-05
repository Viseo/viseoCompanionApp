/**
 * Created by AAB3605 on 15/03/2017.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
} from 'react-native';
import FilterToggle from './../../containers/FilterToggle'
import VisibilityToggle from './../../containers/VisibilityToggle'
import colors from './colors'

class FilterBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.borderRadiusContainer}>
                    <VisibilityToggle
                        filter={'SHOW_GOING'}
                        selectedColor="blue"
                        unselectedColor="gray"
                        text={"Show my events"}
                    />
                    <FilterToggle
                        filter={{category:0}}
                        selectedColor="red"
                        unselectedColor="gray"
                        text={"Show important events"}
                    />
                    <FilterToggle
                        filter={{category:1}}
                        selectedColor="orange"
                        unselectedColor="gray"
                        text={"Show informative events"}
                    />
                    <FilterToggle
                        filter={{category:2}}
                        selectedColor="green"
                        unselectedColor="gray"
                        text={"Show entertaining events"}
                    />
                </View>
            </View>
        );
    }
}

export default FilterBar;

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex:1,
        justifyContent: 'center',
        backgroundColor:colors.lightGray,
        borderTopWidth:0.5,
        borderColor: 'lightgray'
    },
    borderRadiusContainer: {
        backgroundColor:'white',
        flex:1,
        flexDirection:'row',
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8,
    },
});
