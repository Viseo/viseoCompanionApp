# ViseoCompanion
Projet Viseo Companion - ReactNative

- ReactNative Framework (Javascript framework for building multi-platform native mobile app)
- NPM package manager


## Install process :

-> npm install

-> In Webstorm, set the Android React-native configuration

-> Start the emulator from he emulator, run it in AndroidStudio

## NPM PACKAGE with deep configuration

  - react-native-fcm
  - react-native-image-picker
  - react-native-navigation
  - react-native-vector-icons

## To re-create XCode project from scratch

1. Remove all file in /ios folder EXCEPT "GoogleService-Info.plist"
2. In the iOS folder :

        react-native upgrade

    It will ask you if you want te re-create all the build file, say **NO** for all file in the /android folder.
    *At this step you should see sevelar "ViseoCompanion\*" folders in your ios folder.*

3. We now are going to create a podfile to manage the iOS dependencies:

    *Before this step, make sur your have cocoapod installed (you can find all the informations here : https://guides.cocoapods.org/using/getting-started.html)*

    In the ios folder run :

        pod init

    It will create a "podfile" file.

    In this file, add this 3 pods in the 'ViseoCompanion' section :

        pod 'Firebase/Messaging'
        pod 'Fabric'
        pod 'Crashlytics'





