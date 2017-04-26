import {checkTestFunction, createComponent, createTestFunction} from "./TestUtil/";

describe('PushController', () => {

    it('should function when the component is instantiate', () => {
        const requestPermissions = createTestFunction();
        const getFCMToken = createTestFunction();
        const subscribeToTopic = createTestFunction();

        const pushController = createComponent("pushController")

        checkTestFunction(requestPermissions);
        checkTestFunction(getFCMToken);
        checkTestFunction(subscribeToTopic);
    })

});