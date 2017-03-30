/**
 * Created by AAB3605 on 29/03/2017.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    Button,
    TouchableOpacity
} from 'react-native'

export default class EventList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let eventList = this.props.events.map(event => {
            return (
                <TouchableOpacity
                    key={event.id}
                    onPress={() => {
                        this.props.removeEvent(event.id)
                    }}
                >
                    <Text>
                        {event.name}
                    </Text>
                </TouchableOpacity>
            )
        })
        return (
            <View>
                <View>
                    <Button
                        title={"Add event"}
                        onPress={() => {
                            this.props.addEvent({
                                name: 'new event'
                            })
                        }}
                    >
                    </Button>
                </View>
                {eventList}
            </View>
        )
    }
}