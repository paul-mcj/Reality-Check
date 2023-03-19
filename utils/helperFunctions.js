// date time picker
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

// expo notifications
import * as Notifications from "expo-notifications";

// opens time picker modal in Android module
export const showTimePicker = (handleOnChange, value) =>
     DateTimePickerAndroid.open({
          value: value || new Date(),
          // when the selected time is confirmed by user, make a new reminder obj
          onChange: handleOnChange,
          mode: "time",
          is24Hour: false,
     });

// function used to format time into a proper string according to 12-hour clock system
export const formatTime = (timeObj) => {
     let hours = timeObj.getHours();
     let minutes = timeObj.getMinutes();
     let ampm = hours >= 12 ? "pm" : "am";
     hours %= 12;
     hours = hours ? hours : 12; // hours "0" should be "12"
     minutes = minutes < 10 ? `0${minutes}` : minutes;
     return `${hours}:${minutes} ${ampm}`;
};

// function to trigger a notification
export const triggerNotification = async (trigger) => {
     return await Notifications.scheduleNotificationAsync({
          content: {
               title: "Lucid Dream Reminder",
               body: "Perform daily scheduled reality check!",
          },
          trigger: {
               hour: trigger.getHours(),
               minute: trigger.getMinutes(),
               repeats: true,
          },
     });
};

// function to delete desired notification
export const deleteNotification = async (notificationIdentifier) => {
     // unique private prop on notification objects for deletion is necessary using expo API:
     try {
          await Notifications.cancelScheduledNotificationAsync(
               notificationIdentifier._z
          );
     } catch (err) {
          console.log(
               `error at deleteNotification in ./utils/helperFunctions.js: ${err}`
          );
     }
};
