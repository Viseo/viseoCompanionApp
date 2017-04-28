import {
    checkIsComponent,
    createComponent,
    compareChildren,
} from '../TestUtil/index';

describe('AppTextInput', () => {

    const appTextInput = createComponent('AppTextInput', {
        children: 'Some lovely child component'
    })

    it('should render a text input', () => {
        checkIsComponent(appTextInput, 'TextInput')
    })

    it('should render the child component passed in props', () => {
        compareChildren(appTextInput, 'Some lovely child component')
    })

})