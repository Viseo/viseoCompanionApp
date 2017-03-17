/**
 * Created by AAB3605 on 17/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet
} from 'react-native';

export default class EventView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListView
                navigator={this.props.navigator}
                dataSource={this.state.dataSource}
                renderRow={this.renderEventCard}
                renderHeader={() =>
                    <ListViewHeader
                        filters={filters}
                        searchBar={searchBar}
                   />
                }
            />
        );
    }


}