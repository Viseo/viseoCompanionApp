import React, {Component} from 'react';
import SearchBar from './SearchBar';
import {View} from 'react-native';
import EventList from './EventList.container';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../global/colors';

export default class SearchEvents extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={{flexDirection: 'row', backgroundColor: colors.lightBlue}}>
                    <Icon
                        color={'#FFFFFF'}
                        size={48}
                        style={{flex: 1, alignItems: 'center', marginLeft: 10, marginTop: 3}}
                        name="angle-left"
                        onPress={() => {
                            this.props.navigator.pop()
                        }}
                    />
                    <SearchBar style={{flex: 9}}/>
                </View>
                <EventList navigator={this.props.navigator}/>
            </View>
        );
    }
}