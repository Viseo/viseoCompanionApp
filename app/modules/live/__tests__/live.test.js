import {mockNavigator, renderCompleteComponent, renderOneLevelComponent} from '../../global/__tests__/utilities';
import React from 'react';

import {ChatView} from '../ChatView';
import {LiveEvent} from '../LiveEvent';
import ChatInput from '../components/ChatInput';

const chatMessages = [
    {
        type: 'sent',
        message: 'Est-ce qu\'on peut avoir les slides ?',
        datetime: '1499257629',
        writerId: 1,
    },
    {
        type: 'received',
        message: 'Je les envois a la fin !',
        datetime: '1499257629',
        writerId: 2,
    },
    {
        type: 'status',
        message: 'Vous avez été déconnecté',
        datetime: '1499257629',
    },
];
const inputMessage = {
    message: 'Super BBL !',
};

describe('Live', () => {
    it('should render a SentCard, ReceivedCard and StatusCard', () => {
        renderCompleteComponent(
            <ChatView chatMessages={chatMessages}/>,
        );
    });
    it('should render a ChatInput', () => {
        renderCompleteComponent(
            <ChatInput navigator={mockNavigator} sendMessage={inputMessage}/>,
        );
        //Need to test the changing text -> enzyme to access state
    });
    it('should render a LiveEvent view', () => {
        renderOneLevelComponent(
            <LiveEvent user="" lastUpdate=""/>,
        );
    });
});