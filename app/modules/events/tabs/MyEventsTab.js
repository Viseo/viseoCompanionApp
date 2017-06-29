import {SectionList, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import colors from '../../global/colors';
import AppText from '../../global/components/AppText';
import EventCard from '../EventCard';

class MyEventsTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SectionList
                renderItem={({item}) => (
                    <EventCard
                        eventId={item.id}
                        navigator={this.props.navigator}
                    />
                )}
                renderSectionHeader={({section}) => <AppText>{section.title}</AppText>}
                SectionSeparatorComponent={() => <View style={{height: 20}}/>}
                keyExtractor={(item, index) => item.id}
                sections={this.props.events}
            />
        );
    }
}

MyEventsTab.propTypes = {
}

function breakDownIntoSections(events) {
    let bbls = events.filter(event => event.userId === 1);
    let bblsSection = {data: bbls, title: 'BBLs'};

    let refreshes = events.filter(event => event.userId === 1);
    let refreshesSection = {data: refreshes, title: 'Refreshes'};

    return [
        bblsSection,
        refreshesSection,
    ];
}

const mapStateToProps = ({events}, ownProps) => ({
    events: breakDownIntoSections(events.items),
});

export default connect(mapStateToProps, null)(MyEventsTab);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.blue,
        padding: 8,
        paddingBottom: 0,
        paddingTop: 0,
    },
    body: {
        flex: 0,
        flexDirection: 'column',
        paddingBottom: 10,
        marginTop: 20,
    },
    searchBar: {
        flex: 0,
        flexDirection: 'row',
    },
    icon: {
        fontSize: 24,
        height: 22,
        color: 'white',
    },
});