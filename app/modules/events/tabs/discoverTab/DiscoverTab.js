import React, {Component} from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import EventList from '../../EventList.container';
import SearchBar from '../../../../components/SearchBar';
import ItemSpacer from '../../../global/components/ItemSpacer';
import colors from '../../../global/colors';
import PushController from '../../../global/pushController';
import {connect} from 'react-redux';
import EventCard from '../../EventCard';
import AppText from '../../../global/components/AppText';

class DiscoverTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // todo integrate pushController in new architecture
        // todo move searchBar into the navBar
        // todo remove EventList from project
        const oldRender = (
            <View style={styles.mainContainer}>
                <PushController/>
                <View style={styles.body}>
                    <View style={styles.searchBar}>
                        <ItemSpacer/>
                        <SearchBar style={{flex: 22}}/>
                        <ItemSpacer/>
                    </View>
                </View>
                <EventList style={{flex: 22}} navigator={this.props.navigator}/>
            </View>
        );
        return (
            <SectionList
                renderItem={({item}) =>
                    <EventCard
                        eventId={item.id}
                        navigator={this.props.navigator}
                    />
                }
                renderSectionHeader={({section}) => <AppText>{section.title}</AppText>}
                SectionSeparatorComponent={() => <View style={{height:20}}/>}
                keyExtractor={(item, index) => item.id}
                sections={this.props.events}
            />
        );
    }
}

function breakDownIntoSections (events) {
    let bbls = events.filter(event => event.category === 0);
    let bblsSection = {data: bbls, title: 'BBLs'};
    let refreshes = events.filter(event => event.category === 1);
    let refreshesSection = {data : refreshes, title: 'Refreshes'};
    return [
        bblsSection,
        refreshesSection
    ];
}

const mapStateToProps = ({events}, ownProps) => ({
    events: breakDownIntoSections(events.items),
});

export default connect(mapStateToProps, null)(DiscoverTab);

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