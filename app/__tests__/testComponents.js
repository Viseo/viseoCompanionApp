/**
 * Created by AAB3605 on 20/03/2017.
 */
import React from "react";
import {shallow, mount} from "enzyme";
import EventListView from '../components/events/eventListView';
import EventCard from '../components/events/eventCard';
import EventDetails from '../components/events/eventDetails';
import Filter from '../components/events/filter';
import FilterBar from '../components/events/filterBar';
import Header from '../components/header';
import ViseoCompanion from '../index';
import Home from '../scenes/home';
import EditableImage from '../components/editableImage';

function get(componentName, props) {
    switch (componentName) {
        case 'EventCard':
            return shallow(<EventCard {...props}/>);
            break;
        case 'EventDetails':
            return shallow(<EventDetails {...props}/>);
            break;
        case 'EventListView':
            return shallow(<EventListView {...props}/>);
            break;
        case 'Filter':
            return shallow(<Filter {...props}/>);
            break;
        case 'FilterBar':
            return shallow(<FilterBar {...props}/>);
            break;
        case 'Header':
            return shallow(<Header {...props}/>);
            break;
        case 'Home':
            return shallow(<Home {...props}/>);
            break;
        case 'ViseoCompanion':
            return shallow(<ViseoCompanion {...props}/>);
            break;
        case 'editableImage':
            return shallow(<EditableImage {...props}/>);
            break;
        default:
            return null;
    }
}

function getChildren(parent, childName) {
    return parent.find(childName);
}

export default testComponents = {
    get,
    getChildren
}