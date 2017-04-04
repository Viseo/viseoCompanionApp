/**
 * Created by AAB3605 on 29/03/2017.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ListView,
    Keyboard,
} from 'react-native'
import EventCard from './eventCard'
import moment from 'moment'

export default class EventList extends Component {

    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
            for(let key in r1) {
                if(!r2.hasOwnProperty(key))
                    return true
                if(r1[key] !== r2[key])
                    return true
            }
            return false
        }})
        this.state = {
            dataSource: ds.cloneWithRows(this.props.events),
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.events)
        });
    }

    formatDate(date) {
        if (date)
            return null;
        let dateTime = moment(date);
        return dateTime.calendar();
    }

    render() {
        return (
            <View style={{flex:4, flexDirection:'column'}}>
                <View>
                    <Button
                        title={"Show my events"}
                        onPress={() => {
                            if(!this.isOn) this.isOn = false;
                            this.isOn = !this.isOn;
                            this.isOn ? this.props.setVisibilityFilter('SHOW_GOING') : this.props.setVisibilityFilter('SHOW_ALL')
                        }}
                    >
                    </Button>
                </View>
                <View>
                    <Button
                        color="red"
                        title={"Show important events"}
                        onPress={() => {
                            if(!this.isOn) this.isOn = false;
                            this.isOn = !this.isOn;
                            this.isOn ? this.props.addFilter({category: 0}) : this.props.removeFilter({category:0})
                        }}
                    >
                    </Button>
                </View>
                <View>
                    <Button
                        color="orange"
                        title={"Show informative events"}
                        onPress={() => {
                            if(!this.isOn) this.isOn = false;
                            this.isOn = !this.isOn;
                            this.isOn ? this.props.addFilter({category: 1}) : this.props.removeFilter({category:1})
                        }}
                    >
                    </Button>
                </View>
                <View>
                    <Button
                        color="green"
                        title={"Show entertaining events"}
                        onPress={() => {
                            if(!this.isOn) this.isOn = false;
                            this.isOn = !this.isOn;
                            this.isOn ? this.props.addFilter({category: 2}) : this.props.removeFilter({category:2})
                        }}
                    >
                    </Button>
                </View>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderEventCard}
                />
            </View>
        )
    }

    renderEventCard = (event) => {
        let fullDate = this.formatDate();
        let [day, time] = fullDate.split(' ');
        return (
            <EventCard
                name={event.name}
                description={event.description}
                location={event.location}
                day={day}
                time={time}
                participating={event.participating}
                categoryId={event.category}
                onParticipationChange={() => {this.props.toggleParticipation(event.id)}}
                onPress={() => {
                    this.props.navigator.push({
                        title: 'EventDetails',
                        passProps: {
                            event,
                            onParticipationChange: () => {}
                        }
                    });
                }}
                searchWords={event.searchWords}
            />
        );
    }
}