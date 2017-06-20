import {checkHasChildComponent, createComponent, getChildComponent} from '../TestUtil/index';

describe('SearchBar', () => {

    it('should render a search input and a filter button', () => {
        const searchBar = createComponent('SearchBar');
        checkHasChildComponent(searchBar, 'SearchInput');
        checkHasChildComponent(searchBar, 'Toggle');
    });

    it('should render the filters when the filter button is pressed', () => {
        const searchBar = createComponent('SearchBar');
        const filterButton = getChildComponent(searchBar, 'Toggle');
    });

});