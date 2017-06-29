import {View, StyleSheet, SectionList} from 'react-native';
import React, {Component} from 'react';
import EventCard from '../EventCard';
import PropTypes from 'prop-types';
import AppText from '../../global/components/AppText';

export default class CalendarTab extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._scrollToEvent();
    }

    render() {
        const ITEM_HEIGHT = 100;
        const eventList = (
            <SectionList
                ref={(ref) => { this.sectionList = ref; }}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) =>
                    <EventCard
                        imageUrl = {item.imageUrl}
                        navigator={this.props.navigator}
                        eventId={item.id}
                    />
                }
                renderSectionHeader={({section}) => <AppText>{section.title}</AppText>}
                sections={this.props.events}
                getItemLayout={(data, index) => (
                    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                )}
            />
        );
        return <View style={styles.mainContainer}>{eventList}</View>;
    }

    _scrollToEvent() {
        this.sectionList.scrollToLocation({sectionIndex: 6, itemIndex: 0});
    }
}

CalendarTab.propTypes = {
    events: PropTypes.array.isRequired,
    eventId: PropTypes.number,
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
    },
});