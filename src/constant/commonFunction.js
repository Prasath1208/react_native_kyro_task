import {Alert, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, openSettings} from 'react-native-permissions';

export function PermissionRequests(type, callBack, errorCallBack) {
  if (Platform.OS == 'android') {
    // android permissions
    if (type == 'locations') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(res => {
        if (res == 'granted') {
          return Boolean(callBack) && callBack();
        } else if (res == 'never_ask_again') {
          return Boolean(errorCallBack) && errorCallBack();
        }
      });
    }
  } else {
    // ios permissions
    if (type == 'locations') {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
        result == 'granted' ? Boolean(callBack) && callBack() : errorCallBack();
      });
    }
  }
}

export function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function convertMsToHM(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  // 👇️ if seconds are greater than 30, round minutes up (optional)
  minutes = seconds >= 30 ? minutes + 1 : minutes;

  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds,
  )}`;
}

export function GetLatittudeLongitude(callback, permissionError) {
  PermissionRequests(
    'locations',
    () => {
      Geolocation.getCurrentPosition(
        //Will give you the current location
        position => {
          //getting the Longitude from the location json
          const currentLongitude = JSON.stringify(position.coords.longitude);

          //getting the Latitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);

          // returns the location were the function calleded
          Boolean(callback) &&
            callback({
              lat: currentLatitude,
              long: currentLongitude,
            });
        },
        error => {
          alert(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        },
      );
    },
    () => {
      //error callback for permission
      Boolean(permissionError) && permissionError();
    },
  );
}

export function openSettingsPopup(titleText, disText) {
  // titleText Like "Storage Permission Required"
  // disText like 'Application needs access to your storage'

  Alert.alert(titleText, disText, [
    {
      text: 'Not now',
      onPress: () => console.log('Cancel Pressed'),
    },
    {
      text: 'Settings',
      onPress: () => openSettings(),
    },
  ]);
}
