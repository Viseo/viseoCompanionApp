import {checkIsComponent, createComponent} from "../TestUtil/index";

describe('SearchTextInput', () => {

    it('should render a TextInput', () => {
        const searchTextInput = createComponent('SearchTextInput');
        checkIsComponent(searchTextInput, 'TextInput')
    })

});