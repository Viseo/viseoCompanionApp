/**
 * Created by AAB3605 on 20/03/2017.
 */
import testUtil from '../testUtil';
import testComponents from '../testComponents';

describe('EventDetails', () => {

    it('should display the information about that event', () => {
        let event = new Event(0, 'the beautiful event', 'the description of my awesome event', '1/1/2017', 'it happens here');
        const eventDetails = testComponents.get('EventDetails', {
            event
        });
        testUtil.checkFieldContent(eventDetails, 'name', event.name);
        testUtil.checkFieldContent(eventDetails, 'description', event.description);
        testUtil.checkFieldContent(eventDetails, 'location', event.location);
        testUtil.checkFieldContent(eventDetails, 'date', event.getTime());
    });

    describe('logged user', () => {

        it('should be able to see the comments', () => {

        });

        it('should be able to write a comment', () => {

        });

    });

});