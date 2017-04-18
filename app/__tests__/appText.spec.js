import {
    createComponent,
    compareComponentChildren
} from './TestUtils';

describe('AppText', () => {

    it('should display the test passed in props', () => {
        const appText = createComponent('AppText', {
            children: 'Some lovely text'
        })
        compareComponentChildren(appText, 'Some lovely text')
    });

});