changing individual state peices into contexts, and using useReducer for more complicated states
using native and 3rd party apis for timer picker, notifications, etc.
needed to change into more customized components (modal for example is not react native because it doesn't hide status bar properly)
alert was a massive pain, but got fixed with some alterations with contexts
lots of testing
the most difficult thing was the triggerNotification when the app initaliiy got reminder data in ReminderContext (it was originally just copying old data, and teh string was being returned cauing null on the notificatinIdentifier when it came time to delete hte notificaiont).
