import sinon from 'sinon'

export {get as createComponent} from './components'
export * from './events'
export * from './traversal'

export function checkIsComponent(component, expectedComponent) {
    expect(component.type().displayName).to.equal(expectedComponent)
}

export function checkHasChildComponent(parent,
                                       expectedChildComponent,
                                       matchProp = null,
                                       withValue = null) {
    let shouldCheckProp = matchProp && withValue
    let foundChild = parent.findWhere(node => {
        return node.type()
                && node.type().displayName === expectedChildComponent
                && (!shouldCheckProp || node.props()[prop] === value)
    })
    expect(foundChild).to.have.length(1)
}

export function checkTestFunction(testFunction) {
    expect(testFunction.calledOnce).to.equal(true)
}

export function compareChildren(parentComponent, expectedChildren) {
    expect(parentComponent.props().children).to.equal(expectedChildren)
}

export function createTestFunction() {
    return sinon.spy()
}
