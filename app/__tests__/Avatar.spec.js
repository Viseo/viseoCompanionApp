import {checkIsComponent, createComponent} from './TestUtil/';

describe('Avatar', () => {

    it('should render a Apptext with the initials', () => {

        const avatar = createComponent('Avatar', {
            name: 'bob',
            lastName: 'marley',
        });

        checkIsComponent(avatar, 'View');
        const text = getChildComponent(avatar, 'AppText');
        checkHasChildComponent(text, 'BM');
    });

});
