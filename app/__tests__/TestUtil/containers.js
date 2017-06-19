import React from "react";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import FilterToggle from "../../containers/FilterToggle";
import UserProfileInfo from "../../containers/UserProfileInfo.obsolete";
import Profile from "../../components/UserProfileInfo.obsolete";

export const storeFake = (state) => {
    return {
        default: () => {
        },
        subscribe: () => {
        },
        dispatch: () => {
        },
        getState: () => {
            return {...state};
        },
    };
};

export function get(containerName, store = storeFake({}), props = {}) {
    let wrapper, container, component;
    switch (containerName) {
        case 'FilterToggle':
            wrapper = mount(
                <Provider store={store}>
                    <FilterToggle {...props}/>
                </Provider>
            );
            container = wrapper.find(FilterToggle);
            component = container.find(FilterToggle);
            break;
        case 'UserProfileInfo':
            wrapper = mount(
                <Provider store={store}>
                    <UserProfileInfo {...props}/>
                </Provider>
            );
            container = wrapper.find(UserProfileInfo);
            component = container.find(Profile);
            break;
        default:
            break
    }
    return {
        container,
        component
    }
}