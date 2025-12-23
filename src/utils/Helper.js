const moment = require("moment");

const TAG = "app:Helper";
const myDebugger = require("./debugger")(TAG);

exports.arrayOfStringsContains = (needle, arrayOfStrings) => {
    return arrayOfStrings.indexOf(needle) > -1;
};

exports.arrayOfObjectContainsThisObject = (needle, arrayOfObjects) =>{
    return arrayOfObjects.indexOf(...needle);
}

exports.isRoomReachedHalfTime = (startTime, endTime) => {
    const now = moment(Date.now());
    const momentStartTime = moment(startTime);
    const momentEndTime = moment(endTime);

    const totalDuration = momentEndTime.diff(momentStartTime, "minutes");
    const durationTillEndTimeRemained = momentEndTime.diff(now, "minutes");

    myDebugger(totalDuration);
    myDebugger(durationTillEndTimeRemained);

    return (totalDuration / 2) <= durationTillEndTimeRemained;
};
