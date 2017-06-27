import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import EventCard from './EventCard';
import AppText from '../global/components/AppText';
import colors from '../global/colors';
import PropTypes from 'prop-types';

export default class EventList extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.refresh(this.props.user);
    }

    render() {
        const eventList = (
            <FlatList
                data={this.props.events}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) =>
                    <EventCard
                        navigator={this.props.navigator}
                        eventId={item.id}
                    />
                }
                onRefresh={this.props.refresh}
                ListEmptyComponent={() => this._renderEmptyEventCard()}
                refreshing={this.props.refreshing}
            />
        );
        return <View style={styles.mainContainer}>{eventList}</View>;
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
    refreshing: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
    },
});