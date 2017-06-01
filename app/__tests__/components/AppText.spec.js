import {compareChildren, createComponent} from "../TestUtil/index";

describe('AppText', () => {

    it('should display the text passed in props', () => {
        const appText = createComponent('AppText', {
            children: 'Some lovely text'
        });
        compareChildren(appText, 'Some lovely text')
    })

});