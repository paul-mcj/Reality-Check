// react and misc
import { useContext } from "react";

// date time picker
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

// utils
import { formatTime } from "../utils/helperFunctions";

// context
import AlertContext from "../context/AlertContext";
import ToastContext from "../context/ToastContext";
import ReminderContext from "../context/ReminderContext";

const useTime = () => {
     // init context
     const { dispatch: alertDispatch } = useContext(AlertContext);
     const { addReminder } = useContext(ReminderContext);
     const { setToastMessage, invokeToast } = useContext(ToastContext);

     // opens time picker modal in Android module
     const showTimePicker = () =>
          DateTimePickerAndroid.open({
               value: new Date(),
               // when the selected time is confirmed by user, make a new reminder obj
               onChange: createReminder,
               mode: "time",
               is24Hour: false,
          });

     // function changes local time state, creates a new reminder with the time, and adds it to reminder context
     const createReminder = (e, selectedTime) => {
          // users should not be able to have multiple reminders set at the same time (they must be at least a min apart), so if selectedTime is already in the reminder context then Alert users they cannot make multiple reminders at the same time
          let timeAlreadyInContext = false;
          reminders.forEach((item) => {
               if (formatTime(selectedTime) === formatTime(item.time)) {
                    timeAlreadyInContext = true;
                    // dismiss immediately and return to not update Toast if "cancel" is tapped in the timer picker modal
                    if (e.type === "dismissed") {
                         return;
                    }
                    // otherwise set Alert state (make sure data is set to null, otherwise it will be referencing the last updated context which might cause unwanted bugs the next time Alert context is updated)
                    alertDispatch({
                         type: "DUPLICATE_REMINDER",
                         payload: {
                              title: "Error",
                              message: `There is already a reminder set for ${formatTime(
                                   selectedTime
                              )}!`,
                         },
                    });
               }
          });
          // if this reminder time is unique in the context:
          if (e.type === "set" && !timeAlreadyInContext) {
               // add time, unique id and an active state (true by default) to new reminder object
               const newReminder = {
                    time: selectedTime,
                    id: selectedTime.getTime(),
                    active: true,
               };
               // add new object to reminder context
               addReminder(newReminder);
               // Toast that new reminder has been created
               setToastMessage(() => "New reminder created");
               invokeToast();
               // fixme: app will now make a notification at the scheduled time everyday
               // triggerNotification(selectedTime);
               // note: this will erase all notifications in the use effect state, as long as there is no triggering of notifications like above!
               // Notifications.cancelAllScheduledNotificationsAsync();
               //    setNot(() => Notifications.getAllScheduledNotificationsAsync());
          }
     };

     return { showTimePicker };
};

export default useTime;
