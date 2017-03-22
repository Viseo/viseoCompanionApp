/**
 * Created by AAB3605 on 20/03/2017.
 */
import React from "react";
import {shallow, mount} from "enzyme";
import EventListView from '../components/events/eventListView';
import EventDetails from '../components/events/eventDetails';
import Filter from '../components/events/filter';

function get(componentName, props) {
    switch (componentName) {
        case 'EventDetails':
            return shallow(<EventDetails {...props}/>);
            break;
        case 'EventListView':
            return shallow(<EventListView {...props}/>);
            break;
        case 'Filter':
            return shallow(<Filter {...props}/>);
            break;
        default:
            return null;
    }
}

export default testComponents = {
    get,
}