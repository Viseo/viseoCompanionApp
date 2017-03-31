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
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
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
        if(date)
            return null;
        let dateTime = moment(date);
        return dateTime.calendar();
    }

    render() {
        return (
            <View style={{flex:1, flexDirection:'column'}}>
                <View>
                    <Button
                        title={"Add event"}
                        onPress={() => {
                            this.props.addEvent({
                                category:"0",
                                description:"description",
                                keywords:"keywords",
                                name:"new event",
                                location:"place",
                                version:"1",
                                datetime:"2017-03-28 09:00:00.000000",
                                participating: Math.random() < .5
                            })
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
        if(!event) {
            console.warn('undefined event')
            return null
        }
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
                onParticipationChange={() => {}}
                onPress={() => {this.props.removeEvent(event.id)}}
                searchWords={event.searchWords}
            />
        );
    }
}