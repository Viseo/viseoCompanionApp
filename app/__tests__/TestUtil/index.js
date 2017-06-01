import sinon from "sinon";
import {getComponentProp} from "./traversal";

export {get as createComponent} from './components'
export {get as createContainer, storeFake} from './containers'
export * from './events'
export * from './traversal'

export function checkIsComponent(component,
                                 expectedComponent,
                                 matchProp = null,
                                 withValue = null) {
    expect(component.type().displayName).to.equal(expectedComponent);
    let shouldCheckProp = matchProp && withValue;
    if (shouldCheckProp)
        expect(component.props()).to.equal(withValue)
}

export function checkHasChildComponent(parent,
                                       expectedChildComponent,
                                       occurrences = 1,
                                       matchProp = null,
                                       withValue = null) {
    let shouldCheckProp = matchProp && withValue;
    let foundChild = parent.findWhere(node => {
        return node.type()
            && node.type().displayName === expectedChildComponent
            && (!shouldCheckProp || node.props()[matchProp] === withValue)
    });
    expect(foundChild).to.have.length(occurrences)
}

export function checkHasStyle(component, expectedStyle, expectedValue) {
    let styleSheet = getComponentProp(component, 'style');
    let styleToCompare = null;
    styleSheet.forEach(style => {
        if (style.hasOwnProperty(expectedStyle))
            styleToCompare = style[expectedStyle]
    });
    expect(styleToCompare).to.equal(expectedValue)
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