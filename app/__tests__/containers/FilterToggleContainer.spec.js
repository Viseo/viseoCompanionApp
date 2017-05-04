import {beforeEach} from "mocha";
import {createContainer} from "../TestUtil/index";

describe('FilterToggle container', () => {
    let container
    let component

    beforeEach(() => {
        let result = createContainer('FilterToggle')
        container = result.container
        component = result.component
    })

    it('should render', () => {
        expect(container.length).to.equal(1)
        expect(component.length).to.equal(1)
    })
})