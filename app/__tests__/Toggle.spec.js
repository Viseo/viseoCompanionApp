import {
    checkIsComponent,
    createComponent,
    createTestFunction,
    compareChildren,
    checkTestFunction,
    press,
} from './TestUtil/'

describe('Toggle', () => {

    it('should render a clickable on/off button', () => {
        const onToggle = createTestFunction()
        const renderThisWhenOn = 'I am turned On!'
        const renderThisWhenOff = 'I am turned Off!'
        const toggle = createComponent('Toggle', {
            onToggle,
            isOn: true,
            on: renderThisWhenOn,
            off: renderThisWhenOff,
        })
        checkIsComponent(toggle, 'TouchableOpacity')
        compareChildren(toggle, renderThisWhenOn)
        press(toggle)
        checkTestFunction(onToggle)
        compareChildren(toggle, renderThisWhenOff)
    })

})