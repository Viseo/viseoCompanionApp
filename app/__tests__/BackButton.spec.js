import {
    checkIsComponent,
    checkHasChildComponent,
    checkTestFunction,
    createComponent,
    createTestFunction,
    press,
} from './TestUtil/';

describe('BackButton', () => {

    it('should render a clickable image', () => {
        let onPress =  createTestFunction()
        const backButton = createComponent('BackButton', {
            onPress
        })
        checkIsComponent(backButton, 'TouchableOpacity')
        checkHasChildComponent(backButton, 'Image')
        press(backButton)
        checkTestFunction(onPress)
    })

})