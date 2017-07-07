import {renderFullComponent} from '../../global/__tests__/utilities';
import Shop from '../Shop';
import React from 'react';

describe('Shop', () => {
    it('should render shop screen', () => {
        renderFullComponent(
            <Shop/>,
        );
    });
});