import {View, StyleSheet, SectionList, Button} from 'react-native';
import React, {Component} from 'react';
import EventCard from '../EventCard';
import PropTypes from 'prop-types';
import AppText from '../../global/components/AppText';

export default class CalendarTab extends Component {

    constructor(props) {
        super(props);
        this.scrollToEvent = this.scrollToEvent.bind(this);
    }

    render() {
        const ITEM_HEIGHT = 100;
        const eventList = (
            <SectionList
                ref={(ref) => {
                    this.sectionList = ref;
                }}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) =>
                    <EventCard
                        imageUrl={item.imageUrl}
                        navigator={this.props.navigator}
                        eventId={item.id}
                    />
                }
                renderSectionHeader={({section}) => <View style={{backgroundColor:'blue', height:30}}><AppText>{section.title}</AppText></View>}
                sections={this.props.events}
                stickySectionHeadersEnabled={true}
                getItemLayout={(data, index) => (
                    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                )}
            />
        );
        return (
            <View style={styles.mainContainer}>
                <Button title='scroll' onPress={() => this.scrollToEvent()}/>
                {eventList}
            </View>
        );
    }

    scrollToEvent() {
        this.sectionList.scrollToLocation({
            animated: true,
            sectionIndex: 4,
            itemIndex: 0,
            viewPosition: 0,
        });
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