import {
    createComponent,
    checkHasChildComponent,
    compareChildren,
    getChildComponent
} from './TestUtil/'

describe('FlexImage', () => {

    it('should render an image', () => {
        const source = require('./../images/BackButton.png')
        const children  = 'some lovely children'
        const flexImage = createComponent('FlexImage', {
            source,
            children
        })
        checkHasChildComponent(flexImage, 'Image')
        let image = getChildComponent(flexImage, 'Image')
        compareChildren(image, children)
    })

})