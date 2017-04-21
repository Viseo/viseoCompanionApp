import {
    checkIsComponent,
    checkTestFunction,
    compareChildren,
    createComponent,
    createTestFunction,
    press,
} from './TestUtil/';

describe('Button', () => {

    it('should render a clickable button and its children passed in props', () => {
        const onPress =  createTestFunction();
        const children = 'someLovelyChildren';
        const button = createComponent('Button', {
            onPress,
            children
        });
        checkIsComponent(button, 'TouchableOpacity');
        compareChildren(button, children);
        press(button);
        checkTestFunction(onPress);
    })

});
