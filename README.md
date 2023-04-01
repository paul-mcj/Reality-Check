# Reality Check

## About

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

I think this project is very polished, fluid, and looks professional on several types of devices. A lot of this is due to React's amazing ecosystem which has several fascinating technologies that help with building more complex UI components and overall application state management.

But, this application also looks and feels smooth and sleek because it uses additional 3rd party libraries such as TailwindCSS and framer motion. I feel like with these modern solutions, this application truly does a nice job of imitating real-world buy-apps.

One thing that this application does not have that I think would be a nice addition in the future is local storage. As it stands, anything the user adds to their cart will disappear when the page reloads. Being able to have users save session data to persist reloads would be a nice addition, and would also be another excuse to use another custom hooks for such storage management.

## Author

-   LinkedIn: [Paul McJannet](https://www.linkedin.com/in/paul-mcjannet)
-   Github: [paul-mcj](https://github.com/paul-mcj)
