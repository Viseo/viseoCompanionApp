import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import EventCard from '../EventCard';
import AppText from '../../global/components/AppText';
import colors from '../../global/colors';
import PropTypes from 'prop-types';

export default class EventList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FlatList
                data={this.props.events}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) =>
                    <EventCard
                        navigator={this.props.navigator}
                        eventId={item.id}
                    />
                }
                ListEmptyComponent={() => this._renderEmptyEventCard()}
            />
        );

    }

    _renderEmptyEventCard() {
        return (
            <View>
                <AppText
                    style={{
                        textAlign: 'center',
                        color: colors.mediumGray,
                        backgroundColor: 'white',
                        height: 50,
                        borderRadius: 4,
                        textAlignVertical: 'center',
                        fontSize: 18,
                    }}
                >
                    Aucun évènement.
                </AppText>
            </View>
        );
    }
}

EventList.propTypes = {
    events: PropTypes.array.isRequired,
};