# ViseoCompanion
Projet Viseo Companion - ReactNative

- ReactNative Framework (Javascript framework for building multi-platform native mobile app)
- NPM package manager


## Install process

    npm install

## Run in Android

First launch an emulator or connect a android device.
Then run :

    react-native run-android

The project is going to be build and deploy on the device/emulator.

## Run in iOS

### Emulator

You have to be on a mac to produce an iOS build.

    react-native run-ios

### Device

You have to run at least once the above command.

1. Open the "ViseoCompanion.xcodeproj" in XCode.

2. **Make sure you have set up the signing properties for the project and the testProject.**
To do so on the left dock, click on your project name.
Then click on your project name in the central panel and select <yourProject>Tests.
In signing -> team, set the appropriate account.

3. Connect your device
Wait for the downloading of the symbol. (it can takes several minutes)

4. Click on the **play** button.
For the first time you have to "trust" the developer on your phone.


## NPM PACKAGE with deep configuration

These packages are not only JS package, they also have native code inside. Thus they required to be installed in the Android & iOS project.
*The detailed instructions are on the git of each package*

  - react-native-fcm
  - react-native-image-picker
  - react-native-navigation
  - react-native-vector-icons

## Re-create XCode project from scratch

***Don't do that unless you really want to regenerate the XCode project.***

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

5. Open the .xcodeproj in XCode. Right click on the project name (right panel) and click on **"add files to <...>"**.
Select the pod.xcodeproj, in your Pods directory.

6. Read the documentation for each "NPM PACKAGE with deep configuration" mentioned above, and add the corresponding configuration in the "appDelegate.m" and "appDelegate.h".

7. Drag and drop the "GoogleService-Info.plist" file into your project in XCode.

Your XCode project is now ready to be build.




