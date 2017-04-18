import React from "react";
import {shallow, mount} from "enzyme";
import EventCard from '../components/events/eventCard';
import Header from '../components/header';
import ViseoCompanion from '../index';
import Home from '../scenes/home';
import EditableImage from '../components/editableImage';
import AppText from './../components/appText'

export function get(componentName, props) {
    switch (componentName) {
        case 'AppText':
            return shallow(<AppText {...props}/>)
        case 'EventCard':
            return shallow(<EventCard {...props}/>);
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