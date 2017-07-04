import 'react-native';
import React from 'react';

import SentChatCard from '../components/SentChatCard';

import renderer from 'react-test-renderer';

it('will render a SentChatCard', () => {
    const chatData = {
        message: 'test',
    };
    const tree = renderer.create(
        <SentChatCard chatData={chatData}/>,
    );
});