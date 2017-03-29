/**
 * Created by AAB3605 on 29/03/2017.
 */
import React, { Component } from 'react'
import {
    View,
    Text } from 'react-native'

export default class EventList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let eventList = this.props.events.map( event => {
            return (
                <Text key={event.id}>
                    {event.name}
                </Text>
            )
        })
        return (
            <View>
                {eventList}
            </View>
        )
    }
}