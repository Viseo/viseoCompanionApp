import {renderCompleteComponent, renderOneLevelComponent} from '../../global/__tests__/utilities';
import React from 'react';

import {ChatView} from '../ChatView';
import {LiveEvent} from '../LiveEvent';
import ChatInput from '../components/ChatInput';
import {chatMessages, mockFunction, mockNavigator, mockUser} from '../../global/__tests__/mockLibrary';

describe('Live', () => {
    it('should render a SentCard, ReceivedCard and StatusCard', () => {
        renderCompleteComponent(
            <ChatView chatMessages={chatMessages}/>,
        );
    });
    it('should render a ChatInput', () => {
        renderCompleteComponent(
            <ChatInput navigator={mockNavigator} sendMessage={mockFunction}/>,
        );
        //Need to test the changing text -> enzyme to access state
    });
    it('should render a LiveEvent view', () => {
        renderOneLevelComponent(
            <LiveEvent navigator={mockNavigator} user={mockUser} lastUpdate={123456789}/>,
        );
    });
});