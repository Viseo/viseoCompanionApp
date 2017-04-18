export {get as createComponent} from './testComponents'

export function compareComponentChildren(component, expectedValue) {
    expect(component.props().children).to.equal(expectedValue);
}