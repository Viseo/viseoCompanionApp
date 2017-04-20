// /**
//  * Created by LMA3606 on 06/04/2017.
//  */
//
// import React from "react";
// import {
//     StyleSheet,
//     Text,
//     View,
// } from "react-native";
// // import testComponent from './TestUtil/';
// import testUtil from './testUtil';
//
// describe('EditableImage', () => {
//     const editableImage = testComponent.get('editableImage',{});
//
//     it('should display a selectable filed when there is no picture', () => {
//         testUtil.checkComponentExists(editableImage, 'placeholder');
//     });
//     it('should call the image picker when the user click on it', () => {
//         let ImagePicker = {
//             showImagePicker: testUtil.createCheckCallFunction()
//         };
//         testUtil.press(testComponents.getChildren(editableImage, 'TouchableOpacity'));
//         testUtil.checkCall(ImagePicker.showImagePicker);
//     })
//
// });