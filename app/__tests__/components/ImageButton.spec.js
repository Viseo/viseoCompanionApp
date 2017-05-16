import {
    checkHasChildComponent,
    checkIsComponent,
    checkTestFunction,
    createComponent,
    createTestFunction,
    press
} from "../TestUtil/index";

describe('ImageButton', () => {

    it('should render a clickable image', () => {
        let onPress = createTestFunction()
        let source = require('../../images/BackButton.png')
        let imageButton = createComponent('ImageButton', {
            onPress,
            source
        })
        checkIsComponent(imageButton, 'Button')
        checkHasChildComponent(imageButton, 'FlexImage')
        press(imageButton)
        checkTestFunction(onPress)
    })

})
