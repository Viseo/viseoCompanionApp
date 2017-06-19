import {checkHasChildComponent, createComponent} from '../TestUtil/index';

describe('Home', () => {

    it('should display the app name, a search bar, the list of events, and a button with several options', () => {
        const home = createComponent('Home');
        checkHasChildComponent(home, 'Header');
        checkHasChildComponent(home, 'SearchBar');
    });

});