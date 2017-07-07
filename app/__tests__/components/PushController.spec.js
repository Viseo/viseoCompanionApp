import {checkTestFunction, createComponent, createTestFunction} from '../TestUtil/index';

describe('PushController', () => {
    it('should function when the component is instantiated', () => {
        const FCM = {
            requestPermissions: createTestFunction(),
            getFCMToken: createTestFunction(),
            subscribeToTopic: createTestFunction(),
        };

        const pushController = createComponent('pushController');

        checkTestFunction(FCM.requestPermissions);
        checkTestFunction(FCM.getFCMToken);
        checkTestFunction(FCM.subscribeToTopic);
    });

});