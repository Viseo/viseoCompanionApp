/**
 * Created by LMA3606 on 27/02/2017.
 */
import testUtil from './testUtil';
import testComponents from './testComponents';

describe("Home", () => {

    it('Should display a header', () => {
        const home = testComponents.get('Home');
        testUtil.checkChildComponentExists(home, 'Header');
    });

});