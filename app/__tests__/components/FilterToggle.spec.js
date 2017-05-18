import {checkIsComponent, createComponent} from "../TestUtil/index";

describe('FilterToggle', () => {

    it('should render a toggle', () => {
        const filterToggle = createComponent('FilterToggle')
        checkIsComponent(filterToggle, 'Toggle')
    })

})