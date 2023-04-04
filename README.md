# Reality Check

## About

<<<<<<< HEAD
This Android-based application helps people to become lucid dreamers by allowing them to set daily notifications to remind them to check their consciousness, as well as allowing them to maintain a dream journal. The application can be found on the Google Play store [here](https://beer-order-app-real.vercel.app/about).

I wanted to make this application to help me become a better lucid dreamer, and since I own an Android mobile device I decided to make it for that platform exclusively. I also have React.js experience and decided that completing this application in React Native would be a great test of my knowledge while still inviting challenges of using a new framework.

## Challenges and Solutions

This application was built using React Native, and as such I had to deal with different building blocks as compared to React.js. I used [expo](https://docs.expo.dev/) to help me build out the project as I wanted to run the app natively on my actual everyday device as opposed to using an emulator. I also imported several packages via NPM to help the application function properly, however working with those seemed to be the biggest challenges while making this app.

Below I will briefly describe some of the challenges I faced while building this application, and the solutions I came up with to fix them.

### Upgrading Individual useState Pieces into Context API

When I first started building the application I was using a lot of smaller, interchanging pieces of state. But as it started to expand, I quickly realized that there were some difficult states that needed to be managed on a higher level. Understanding that the application wasn't large enough in scope to use something as powerful as Redux (or another global state management system), I decided to use the React.js's Context API and split those pieces of state into their own unique provider components to track state separately, organized, and on a higher level.

Additionally, there were some state issues within some of the context provider component's themselves. The AlertContext for example was not updating the ability to alert users after completing some interactions (such as deleting a journal entry) as the state was dealing with too many pieces. As a solution, I decided to use the useReducer hook and have the main reducer object contain multiple interacting properties -- this allowed the state to change properly with separate payload arguments being passed to the reducer dispatch function.

### Using 3rd Party APIs

One of the most important aspects of this app is the ability to make and delete reminders based upon a time. As such, working with an [exterior package](https://www.npmjs.com/package/@react-native-community/datetimepicker) to choose values from a clock and attach that to reminders was essential.

However, perhaps the most difficult feature of this app was working with expo notifications...

### Customized Components

Several components throughout the application need to make use of an overlay, and at first I decided to use the React Native Modal component to help me achieve this. However, it was interrupting the stylistic approach I wanted the application to have (namely, when the Modal was active it didn't hide the mobile device's StatusBar). To fix this, I created a customized component and manipulated it's z-index property to work as an overlay. I also allowed it to be passed props in order to change depending on what parent component was passing it data to work with.

### Physical Testing and Expo Limitations

This application required a LOT of testing! Dozens of times I needed to...

the most difficult thing was the triggerNotification when the app initaliiy got reminder data in ReminderContext (it was originally just copying old data, and teh string was being returned cauing null on the notificatinIdentifier when it came time to delete hte notificaiont). I needed to resolve it by wiping all notifications on app init, then triggeringNotification for each reminder in

```javascript
await Promise.all(
     tempKeyArr.map(async (reminder) => {
          const data = await AsyncStorage.getItem(reminder);
          let parsedData = JSON.parse(data);
          let parsedDataTime = new Date(parsedData.time);
          let parsedDataActive = parsedData.active;
          const reformatData = {
               time: parsedDataTime,
               id: parsedData.id,
               active: parsedDataActive,
               // it is paramount to trigger a new notification for each reminder object that is about to be put into the reminder context. If this is not done here, then the notificationIdentifier prop would simply be "null" and thus the notification cannot be properly deleted/updated on the backend properly causing massive issues to app functionality.
               notificationIdentifier: parsedDataActive
                    ? triggerNotification(parsedDataTime)
                    : triggerNotification(),
          };
          tempReminderArr.push(reformatData);
     })
);
```

placeholderRemindersArr instead of reminders after state update:

```javascript
// update reminder context
setReminders(() => placeholderRemindersArr);
// change all item active states in device storage
await Promise.all(
     placeholderRemindersArr.map(async (reminder) => {
          await AsyncStorage.mergeItem(
               String(reminder.id),
               JSON.stringify(reminder)
          );
     })
);
```

## Conclusions and Future Implementations

ChatGPT:
The battery consumption of an APK file depends on several factors, including the app's features, background processes, and usage patterns. Generally speaking, a 30MB APK file that is running continuously in the background without being put to sleep would consume more battery than if it were put to sleep or if it were used intermittently.

However, it is difficult to determine exactly how much battery an APK file of 30MB would consume without more information about the app and the device it is running on. Some factors that can affect battery consumption include the app's usage of network resources, CPU, and GPU, as well as the screen brightness and other settings of the device.

That being said, it is generally a good practice to put apps to sleep when they are not being actively used, as this can help prolong the battery life of the device. Users can also choose to optimize individual apps to further reduce their battery consumption, as well as adjust other settings such as brightness, location services, and data usage to conserve battery life.
=======
This Android-based application helps people to become lucid dreamers by allowing them to set daily reminders to check their consciousness, as well as allowing them to maintain a dream journal. The application can be found on the Google Play store [here](https://beer-order-app-real.vercel.app/about).

I wanted to make thi spp

## Challenges and Solutions

This application was built using React native, and specialized on Android buildig

### Subheading 1

changing individual state peices into contexts, and using useReducer for more complicated states
using native and 3rd party apis for timer picker, notifications, etc.
needed to change into more customized components (modal for example is not react native because it doesn't hide status bar properly)
alert was a massive pain, but got fixed with some alterations with contexts
lots of testing
the most difficult thing was the triggerNotification when the app initaliiy got reminder data in ReminderContext (it was originally just copying old data, and teh string was being returned cauing null on the notificatinIdentifier when it came time to delete hte notificaiont).



placeholderRemindersArr instead of reminders after state update:

 in ReminderContext.jsx
```javascript
 // set state for all active reminders
               setAllRemindersActive((prev) => !prev);
               // update reminder context
               setReminders(() => placeholderRemindersArr);
               // change all item active states in device storage
               await Promise.all(
                    placeholderRemindersArr.map(async (reminder) => {
                         await AsyncStorage.mergeItem(
                              String(reminder.id),
                              JSON.stringify(reminder)
                         );
                    })
               );
               // set changes to device storage if all notifications are active or not
               await AsyncStorage.removeItem("all-reminders-active");
               await AsyncStorage.setItem(
                    "all-reminders-active",
                    JSON.stringify(!allRemindersActive)
               );
```

### suheading 2

I also found some more troubles with the context API specifically when trying to update a certain property of the context object. I was updating an amount directly in the context and not within an internal item component first, which was causing a lot of issues keeping track of the proper quantity of items for each item itself.

What I needed to do was update an amount outside of the context through props before updating with the context state (by way of useReducer logic). In essence, my logic for adding just one item at a time changed drastically when taking into consideration props as state for each item, going from this:

```javascript
dispatch({
    type: "UPDATE_BEER_ITEM_AMOUNT",
    payload: { id: id, amount: 1 },
});
```

to this (where **currentItemAmount** is passed in as props):

```javascript
dispatch({
    type: "UPDATE_BEER_ITEM_AMOUNT",
    payload: { id: id, amount: currentItemAmount + 1 },
});
```


## Improvements and Optimization

Before finalizing this application and deploying it live, I felt it was best to review some internal logic for bug fixes or simply to optimize code.

## Conclusions and Future Implementations
>>>>>>> 93de9bd1e7580602f74c7122699fe8dbae5b42a5

I think this project is very polished, fluid, and looks professional on several types of devices. A lot of this is due to React's amazing ecosystem which has several fascinating technologies that help with building more complex UI components and overall application state management.

But, this application also looks and feels smooth and sleek because it uses additional 3rd party libraries such as TailwindCSS and framer motion. I feel like with these modern solutions, this application truly does a nice job of imitating real-world buy-apps.

One thing that this application does not have that I think would be a nice addition in the future is local storage. As it stands, anything the user adds to their cart will disappear when the page reloads. Being able to have users save session data to persist reloads would be a nice addition, and would also be another excuse to use another custom hooks for such storage management.

## Author

<<<<<<< HEAD
-    LinkedIn: [Paul McJannet](https://www.linkedin.com/in/paul-mcjannet)
-    Github: [paul-mcj](https://github.com/paul-mcj)
=======
-   LinkedIn: [Paul McJannet](https://www.linkedin.com/in/paul-mcjannet)
-   Github: [paul-mcj](https://github.com/paul-mcj)
>>>>>>> 93de9bd1e7580602f74c7122699fe8dbae5b42a5
