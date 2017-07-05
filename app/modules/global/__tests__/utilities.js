import 'react-native';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

export const renderCompleteComponent = (component) => {
    return renderer.create(component);
};

export const renderOneLevelComponent = (component) => {
    const renderer = new ShallowRenderer();
    return renderer.render(component);
};