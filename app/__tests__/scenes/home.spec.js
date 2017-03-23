/**
 * Created by AAB3605 on 23/03/2017.
 */
import React from "react";
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import Home from './../../scenes/home';
import util from './../testUtil';
import components from './../testComponents';

let db = {
    getEvents: () => {
        return [
            {id:0, name:'registered event', participating:true},
            {id:1, name:'unregistered event', participating:false},
        ];
    },
    getEventsByRegisteredUser: (userId) => {
        return userId === 0 ?
            [{id:0, name:'registered event', participating:true}]:
            []
        ;
    },
    removeEventParticipant: util.createCheckCallFunction(),
    addEventParticipant: util.createCheckCallFunction(),
};
let props = {
    db,
    user: {
        id: 0
    }
};

describe('Home', () => {

    it('should load the events when mounted', async () => {
        const home = components.get('Home', props);
        await home.instance().componentDidMount();
        expect(home.state().allEvents).to.deep.equal(db.getEvents());
        expect(home.state().showedEvents).to.deep.equal(db.getEvents());
    });

    it('should display a header', () => {
        const home = components.get('Home', props);
        util.checkChildComponentExists(home, 'Header');
    });

    it('should display a loading indicator while fetching the events', () => {
        const home = components.get('Home', props);
        util.checkChildComponentExists(home, 'ActivityIndicator');
    });

    it('should notify the user if there are no events to show', async () => {
        let emptyDb = {
            getEvents: () => {return []},
            getEventsByRegisteredUser: () => {return []},
        }
        const home = components.get('Home', {db:emptyDb});
        await home.instance().componentDidMount();
        util.checkChildComponentExists(home, 'AppText');
    });

    it('should display an eventListView when the events are fetched', async () => {
        const home = components.get('Home', props);
        await home.instance().componentDidMount();
        util.checkChildComponentExists(home, 'EventListView');
    });

    it('should add or remove the user from the list of participants in the database when the eventListView changes', async () => {
        const home = components.get('Home', props);
        await home.instance().componentDidMount();
        await home.instance().onParticipationChange(db.getEvents()[0]);
        util.checkCall(db.removeEventParticipant);
        await home.instance().onParticipationChange(db.getEvents()[1]);
        util.checkCall(db.addEventParticipant);
    });

    it('should refresh the list whenever a filter is applied and show all events if there are no active filters', async () => {
        const home = components.get('Home', props);
        await home.instance().componentDidMount();
        await home.instance().onFilter([], 0);
        expect(home.state().showedEvents).to.deep.equal(db.getEvents());
        await home.instance().onFilter(db.getEventsByRegisteredUser(props.user.id), 1);
        expect(home.state().showedEvents).to.deep.equal(db.getEventsByRegisteredUser(props.user.id));
    });

    it('should refresh the list whenever a search is performed and show all events if none was matched', async () => {
        const home = components.get('Home', props);
        await home.instance().componentDidMount();
        await home.instance().onSearch(db.getEvents(), '', []);
        expect(home.state().showedEvents).to.deep.equal(db.getEvents());
        await home.instance().onSearch(db.getEvents(), '', db.getEventsByRegisteredUser(props.user.id));
        expect(home.state().showedEvents).to.deep.equal(db.getEventsByRegisteredUser(props.user.id));
    });

});