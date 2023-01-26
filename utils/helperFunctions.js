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
