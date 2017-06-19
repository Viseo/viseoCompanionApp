import React from "react";
import {shallow} from "enzyme";
import EventCard from "../../components/events/eventCard";
import ViseoCompanion from "../../index";
import Home from "../../scenes/home";
import EditableImage from "../../modules/global/components/ImagePicker";
import AppText from "../../modules/global/components/AppText";
import AppTextInput from "../../components/AppTextInput.obsolete";
import BackButton from "../../components/BackButton.obsolete";
import Button from "../../components/Button.obsolete";
import ImageButton from "../../components/ImageButton.obsolete";
import FlexImage from "../../components/FlexImage.obsolete";
import Toggle from "./../../components/Toggle";
import ItemSpacer from "./../../components/ItemSpacer";
import FilterToggle from "./../../components/FilterToggle";
import SearchTextInput from "./../../components/SearchTextInput";
import SearchBar from "./../../components/SearchBar";
import PushController from "../../modules/global/pushController";
import Avatar from "../../modules/global/components/Avatar";

export function get(componentName, props) {
    switch (componentName) {
        case 'AppText':
            return shallow(<AppText {...props}/>);
        case 'AppTextInput':
            return shallow(<AppTextInput {...props}/>);
        case 'BackButton':
            return shallow(<BackButton {...props}/>);
        case 'Button':
            return shallow(<Button {...props}/>);
        case 'ImageButton':
            return shallow(<ImageButton {...props}/>);
        case 'ItemSpacer':
            return shallow(<ItemSpacer {...props}/>);
        case 'FilterToggle':
            return shallow(<FilterToggle {...props}/>);
        case 'FlexImage':
            return shallow(<FlexImage {...props}/>);
        case 'Toggle':
            return shallow(<Toggle {...props}/>);
        case 'SearchTextInput':
            return shallow(<SearchTextInput {...props}/>);
        case 'SearchBar':
            return shallow(<SearchBar {...props}/>);

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
            return shallow(<ImagePicker {...props}/>);
            break;
        case 'pushController':
            return shallow(<PushController {...props}/>);
            break;
        case 'avatar':
            return shallow(<Avatar {...props}/>);
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