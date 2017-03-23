/**
 * Created by AAB3605 on 10/03/2017.
 */
import testUtil from '../testUtil';
import testComponents from '../testComponents';
import Highlighter from 'react-native-highlight-words';
import AppText from './../../components/appText';

describe('Event card', () => {

    it('should display an event card', () => {
        let event = {
            name: 'the beautiful event',
            description: 'the description of my awesome event',
            date: 'today',
            location: 'here',
            category: 'best',
        }
        let onParticipationChange = () => {
        };
        const eventCard = testComponents.get('EventCard', {
            ...event,
            onParticipationChange
        });
        testUtil.checkChildComponentWithPropValue(eventCard, Highlighter, 'textToHighlight', event.name);
        testUtil.checkChildComponentWithPropValue(eventCard, Highlighter, 'textToHighlight', event.description);
        testUtil.checkChildComponentWithPropValue(eventCard, AppText, 'children', event.date);
        testUtil.checkChildComponentWithPropValue(eventCard, AppText, 'children', event.location.toUpperCase());
    });

});