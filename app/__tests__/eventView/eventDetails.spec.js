/**
 * Created by VBO3596 on 23/03/2017.
 */
import React from "react";
import testUtil from '../testUtil';
import Event from '../../util/event';
import {
    Image,
    Button
} from "react-native";
import AppText from './../../components/appText';
import EditableAppText from './../../components/editableAppText';
import strings from "../../util/localizedStrings";

describe('EventDetails', () => {
    let event =
        new Event(0,
            'the beautiful event',
            'the description of my awesome event',
            '2013-03-07T07:00:00+08:00',
            'it happens here');
    const details = testUtil.createEventDetails({event: event, isModificationAllowed:false});

    it('should display 1 app header if not modifiable', () => {
        testUtil.checkChildComponentExists(details, 'Header');
    });

    it('should display 1 scrollview', () => {
        testUtil.checkChildComponentExists(details, 'ScrollView');
    });

    it('should display 4 images (user avatar, user icon, location icon)', () => {
        expect(testUtil.getComponentsOfTypeInContainer(details, Image)).to.have.length(4);
    });

    it('should display 3 editable text : for title, event location, and description)', () => {
        expect(testUtil.getComponentsOfTypeInContainer(details, EditableAppText)).to.have.length(3);
    });

    it('should display event title', () => {
        testUtil.checkChildComponentWithPropValue(details, EditableAppText, 'content', event.name);
    });

    it('should display event category', () => {
        let categoryName = strings.categoriesNames[event.category];
        testUtil.checkChildComponentWithPropValue(details, AppText, 'children', categoryName);
    });

    it('should display event location', () => {
        testUtil.checkChildComponentWithPropValue(details, EditableAppText, 'content', event.location);
    });

    it('should display event description', () => {
        testUtil.checkChildComponentWithPropValue(details, EditableAppText, 'content', event.description);
    });

    it('should display event date and hour', () => {
        let date = event.getDateToString().split("/");
        testUtil.checkChildComponentWithPropValue(details, AppText, 'children', date[0]);
        testUtil.checkChildComponentWithPropValue(details, AppText, 'children', date[1]);
    });

    it('should "going" checkbox be checked or unchecked when pressed, and call the participation function', () => {
        const participationFunction = testUtil.createCheckCallFunction();
        const details = testUtil.createEventDetails({event: event, onParticipationChange: participationFunction});
        let checkedBeforePress = testUtil.getState(details).going;
        testUtil.click(details, 'CheckBox');
        let checkedAfterPress = testUtil.getState(details).going;
        testUtil.compare(checkedAfterPress, !checkedBeforePress);
        testUtil.checkCall(participationFunction);
    });

    it('should change title state when title input edited', () => {
        let newTitle  = "my new title";
        let titleInput = testUtil.getSpecificComponentWIthPropValue(details, EditableAppText, 'content', event.name);
        testUtil.validateEditableAppTextWithInputValue(titleInput, newTitle);
        let titleAfterEdition = testUtil.getState(details).title;
        expect(titleAfterEdition.target.value).to.equal(newTitle);
    });

    it('should change location state when location input edited', () => {
        let newLocation  = "my new location";
        let locationInput = testUtil.getSpecificComponentWIthPropValue(details, EditableAppText, 'content', event.location);
        testUtil.validateEditableAppTextWithInputValue(locationInput, newLocation);
        let locationAfterEdition = testUtil.getState(details).location;
        expect(locationAfterEdition.target.value).to.equal(newLocation);
    });

    it('should change description state when description input edited', () => {
        let newDescription  = "my new description";
        let descriptionInput = testUtil.getSpecificComponentWIthPropValue(details, EditableAppText, 'content', event.description);
        testUtil.validateEditableAppTextWithInputValue(descriptionInput, newDescription);
        let descriptionAfterEdition = testUtil.getState(details).description;
        expect(descriptionAfterEdition.target.value).to.equal(newDescription);
    });
});

describe('EventDetails modifiable', () => {
    let event =
        new Event(0,
            'the beautiful event',
            'the description of my awesome event',
            '2013-03-07T07:00:00+08:00',
            'it happens here');
    const details = testUtil.createEventDetails({event: event, isModificationAllowed:true});

    it('should display 1 scrollview', () => {
        testUtil.checkChildComponentExists(details, 'ScrollView');
    });

    it('should display 4 images (user avatar, user icon, location icon)', () => {
        expect(testUtil.getComponentsOfTypeInContainer(details, Image)).to.have.length(4);
    });

    it('should display 2 button to activate edition and to save modifications', () => {
        expect(testUtil.getComponentsOfTypeInContainer(details, Button)).to.have.length(2);
    });

    it('should display 3 editable text : for title, event location, and description)', () => {
        expect(testUtil.getComponentsOfTypeInContainer(details, EditableAppText)).to.have.length(3);
    });

    it('should display event title', () => {
        testUtil.checkChildComponentWithPropValue(details, EditableAppText, 'content', event.name);
    });

    it('should display event category', () => {
        let categoryName = strings.categoriesNames[event.category];
        testUtil.checkChildComponentWithPropValue(details, AppText, 'children', categoryName);
    });

    it('should display event location', () => {
        testUtil.checkChildComponentWithPropValue(details, EditableAppText, 'content', event.location);
    });

    it('should display event description', () => {
        testUtil.checkChildComponentWithPropValue(details, EditableAppText, 'content', event.description);
    });

    it('should display event date and hour', () => {
        let date = event.getDateToString().split("/");
        testUtil.checkChildComponentWithPropValue(details, AppText, 'children', date[0]);
        testUtil.checkChildComponentWithPropValue(details, AppText, 'children', date[1]);
    });

    it('should "going" checkbox be checked or unchecked when pressed, and call the participation function', () => {
        const participationFunction = testUtil.createCheckCallFunction();
        const details = testUtil.createEventDetails({event: event, onParticipationChange: participationFunction});
        let checkedBeforePress = testUtil.getState(details).going;
        testUtil.click(details, 'CheckBox');
        let checkedAfterPress = testUtil.getState(details).going;
        testUtil.compare(checkedAfterPress, !checkedBeforePress);
        testUtil.checkCall(participationFunction);
    });

    it('should change title state when title input edited', () => {
        let newTitle  = "my new title";
        let titleInput = testUtil.getSpecificComponentWIthPropValue(details, EditableAppText, 'content', event.name);
        testUtil.validateEditableAppTextWithInputValue(titleInput, newTitle);
        let titleAfterEdition = testUtil.getState(details).title;
        expect(titleAfterEdition.target.value).to.equal(newTitle);
    });

    it('should change location state when location input edited', () => {
        let newLocation  = "my new location";
        let locationInput = testUtil.getSpecificComponentWIthPropValue(details, EditableAppText, 'content', event.location);
        testUtil.validateEditableAppTextWithInputValue(locationInput, newLocation);
        let locationAfterEdition = testUtil.getState(details).location;
        expect(locationAfterEdition.target.value).to.equal(newLocation);
    });

    it('should change description state when description input edited', () => {
        let newDescription  = "my new description";
        let descriptionInput = testUtil.getSpecificComponentWIthPropValue(details, EditableAppText, 'content', event.description);
        testUtil.validateEditableAppTextWithInputValue(descriptionInput, newDescription);
        let descriptionAfterEdition = testUtil.getState(details).description;
        expect(descriptionAfterEdition.target.value).to.equal(newDescription);
    });

    it('should active edition mode when button "Edit" is clicked', () => {
        let editionModeBeforeClick = testUtil.getState(details).isInModificationMode;
        expect(editionModeBeforeClick).to.equal.false;
        let buttonEdit = testUtil.getSpecificComponentWIthPropValue(details, Button, 'title', strings.editEvent);
        testUtil.simulateActionOnSpecificComponent(buttonEdit, 'press')
        let editionModeAfterClick = testUtil.getState(details).isInModificationMode;
        expect(editionModeAfterClick).to.equal.true;
    });
});

describe('EventDetails in modification mode', () => {
    let event =
        new Event(0,
            'the beautiful event',
            'the description of my awesome event',
            '2013-03-07T07:00:00+08:00',
            'it happens here');
    const details = testUtil.createEventDetails({event: event, isModificationAllowed:true, isInModificationMode: true});

    it('should display 1 DatePicker', () => {
        testUtil.checkChildComponentExists(details, 'DatePicker');
    });

    it('should update date state when date changes in the datepicker', () => {
        let pickedDate = new Date("2017/09/12 13:56");
        testUtil.changeDateWithValue(details, pickedDate);
        let newDateValue = testUtil.getState(details).date;
        let newDate = new Date(newDateValue);
        expect(newDate).to.equal(pickedDate);
    });

    it('should desactive edition mode when button "Save" is clicked', () => {
        let editionModeBeforeClick = testUtil.getState(details).isInModificationMode;
        expect(editionModeBeforeClick).to.equal.true;
        let buttonSave = testUtil.getSpecificComponentWIthPropValue(details, Button, 'title', strings.saveEvent);
        testUtil.simulateActionOnSpecificComponent(buttonSave, 'press')
        let editionModeAfterClick = testUtil.getState(details).isInModificationMode;
        expect(editionModeAfterClick).to.equal.false;
    });
});