import {
    createComponent,
    checkIsComponent,
    checkHasStyle
} from './TestUtil/'

describe('ItemSpacer', () => {

    it('should render a spacer view', () => {
        const spaces = 4
        const itemSpacer = createComponent('ItemSpacer', {
            flex: spaces
        })
        checkIsComponent(itemSpacer, 'View')
        checkHasStyle(itemSpacer, 'flex', spaces)
    })

})