import React, {Component} from 'react'
import {
    View,
    Dimensions
} from 'react-native'
import EventInfo from './../containers/EventInfo'

const {height} = Dimensions.get('window');

export default class Event extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={{height}}>
                <EventInfo
                    navigator={this.props.navigator}
                    id={this.props.id}
                    canEdit={true}
                />
            </View>
        )
    }
}