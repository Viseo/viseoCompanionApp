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

    In this file, under the 'ViseoCompanion' section, add this 3 pods :

        pod 'Firebase/Messaging'
        pod 'Fabric'
        pod 'Crashlytics'

    To launch the installation, just run

        pod install

4. Link the dependencies in you project by running : (from your project folder)

        react-native link

   This will create the link between the module file and the XCode project.

5. Open the .xcodeproj in XCode. Right click on the project name (right pannel) and click on **"add files to <...>"**.
Select the pod.xcodeproj, in your Pods directory.

6. Read the documentation for each "NPM PACKAGE with deep configuration" mentionned above, and add the corresponding configuration in the "appDelegate.m" and "appDelegate.h".

7. Drag and drop the "GoogleService-Info.plist" file into your project in XCode.

8. At this step you should ba able (and you have) to build on the emulator with :

        react-native run-ios

9. You can now, launch XCode and build the project from here.




