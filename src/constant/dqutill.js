/* Utils.js */
/* This file contains functions you can use anywhere in your application */
/* This is getter and setter method for quickrecharge*/

var dqUtilData = {};

function setDqUtilData(key, value) {
  if (!key)
    return;

  dqUtilData[key] = value;
}

function getDqUtilData() {
  return dqUtilData;
}

function getDqUtilDataName() {
  return dqUtilData.Loginfullname;
}

// Now you have to export each function you want
export {
  setDqUtilData,
  getDqUtilData,
  getDqUtilDataName
};