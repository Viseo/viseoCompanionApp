import {createContainer} from '../TestUtil/index';
import {describe} from 'mocha';

describe('UserProfileInfo', () => {

    it('should render', () => {
        let result = createContainer('UserProfileInfo');
        let container = result.container;
        let component = result.component;
        expect(container.length).to.equal(1);
        expect(component.length).to.equal(1);
    });

});

// import {
//
// } from './TestUtil/'
//
// describe('UserProfileInfo in display mode', () => {
//     const profileInfo = testUtil.createProfileInfo({
//         firstName: 'Al',
//         lastName: 'Inclusive',
//         email: 'al.inclusive@mail.com',
//         password: 'topsecret',
//         birthDate: '1988/04/05',
//         picture: defaultImage,
//         editing: false,
//     });
//
//     it('should display 1 scrollview', () => {
//         testUtil.checkChildComponentExists(profileInfo, 'ScrollView');
//     });
//
//     it('should display user avatar', () => {
//         testUtil.checkChildComponentExists(profileInfo, 'FlexImage');
//     });
//
//     it('should display 2 editable text : for firstname and lastname)', () => {
//         expect(testUtil.getComponentsOfTypeInContainer(profileInfo, EditableAppText)).to.have.length(2);
//     });
//
//     it('should display user birthDate', () => {
//         const birthDateValue = new Date(this.state.editedProfile.birthDate);
//         testUtil.checkChildComponentWithPropValue(profileInfo, AppText, 'children', birthDateValue);
//     });
// });
//
// describe('UserProfileInfo in edition mode', () => {
//     let defaultImage = require('./../images/userAvatar.jpg');
//     const profileInfo = testUtil.createProfileInfo({
//         firstName: 'Al',
//         lastName: 'Inclusive',
//         email: 'al.inclusive@mail.com',
//         password: 'topsecret',
//         birthDate: '1988/04/05',
//         picture: defaultImage,
//         editing: true,
//     });
//
//     it('should display 1 scrollview', () => {
//         testUtil.checkChildComponentExists(profileInfo, 'ScrollView');
//     });
//
//     it('should allow user to change his avatar', () => {
//         testUtil.checkChildComponentExists(profileInfo, 'EditableImage');
//     });
//
//     it('should display 2 editable text : for firstname and lastname)', () => {
//         expect(testUtil.getComponentsOfTypeInContainer(profileInfo, EditableAppText)).to.have.length(2);
//     });
//
//     it('should display one DatePicker', () => {
//         testUtil.checkChildComponentExists(profileInfo, 'DatePicker');
//     });
//
//     it('should display 2 Password inputs)', () => {
//         expect(testUtil.getComponentsOfTypeInContainer(profileInfo, PasswordInput)).to.have.length(2);
//     });
// });