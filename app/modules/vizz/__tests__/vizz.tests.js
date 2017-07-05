import React from 'react';
import VizzManagement from '../VizzManagement';
import {renderCompleteComponent} from '../../global/__tests__/utilities';

describe( 'Vizz', () => {
    it( 'Should render a vizz component', () => {
        renderCompleteComponent(
            <VizzManagement/>,
        );
    } );
} );