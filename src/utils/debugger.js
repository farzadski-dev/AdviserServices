module.exports = (TAG) => {
  const myDebugger = require("debug")(TAG);
  myDebugger.enabled = process.env.NODE_ENV === "development";
  return myDebugger;
};
