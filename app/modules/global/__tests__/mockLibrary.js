export const mockNavigator = {
    setOnNavigatorEvent: jest.fn(),
    toggleTabs: jest.fn(),
};

export const mockFunction = jest.fn();

export const mockUser = {
    id: 8,
    version: 0,
    email: 'leo@gmail.com',
    firstName: 'bob',
    lastName: 'Rasofsky',
    password: 'tatata',
    roles: null,
};

export const mockEvents = [
    {
        id: 1,
        name: 'Veuillez noter cet event',
        datetime: '123456123',
        location: 'Boston',
    },
    {
        id: 2,
        name: 'Et celui-la aussi',
        datetime: '123456123',
        location: 'Boston',
    },
];

export const chatMessages = [
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