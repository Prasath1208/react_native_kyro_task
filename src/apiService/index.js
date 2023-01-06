import axios from 'axios';
import {dLog, eLog} from './../utils/logger/logger';
import {getToken} from '../redux/selectors';
import NavigationService from '../navigation/NavigationService';

import {dqutill, SCREENS} from '../constant';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage';

// Create axios client, pre-configured with baseURL
// const SERVER_API = `${PRODURL064}`;
// const SERVER_API = isDevelopement() ? `${DEVURL64}` : `${PRODURL064}`;
const SERVER_API = 'https://apidev.meradoc.com';

const result = dqutill.getDqUtilData();
const TOKEN = result.access;

const APIKit = axios.create({
  baseURL: SERVER_API,
  timeout: 10000,
  //   headers: {
  //     'Authorization':'Bearer ' + TOKEN,
  //     'Content-Type': 'application/json',

  // },
  // setClientToken,
});

const responseHandler = response => {
  if (response.status === 401) {
    return Promise.reject(error);
  }

  return response;
};

const errorHandler = async error => {
  if (error.toJSON().message === 'Network Error') {
    try {
      await AsyncStorage.clear();
      NavigationService.navigate(SCREENS.SPLASH);
      //  alert('Token expired')
      setTimeout(() => {
        RNRestart.Restart();
      }, 400);
    } catch (e) {
      alert('Unable to logout');
    }
  } else if (error.toJSON().message === 'Request failed with status code 401') {
    //logout flow
    // if (
    //   this.props?.route?.name != SCREENS.SPLASH &&
    //   this.props?.route?.name != SCREENS.SELECTUSER
    // ) {
    //   NavigationService.navigate(SCREENS.SPLASH, {isLogout: true});
    // }
  } else if (error.toJSON().status === 422) {
    //logout flow
    // if (
    //   this.props?.route?.name != SCREENS.SPLASH &&
    //   this.props?.route?.name != SCREENS.SELECTUSER
    // ) {
    //   NavigationService.navigate(SCREENS.SPLASH, {isLogout: true});
    // }
  }

  return Promise.reject(error);
};

APIKit.interceptors.request.use(function (config) {
  const result = dqutill.getDqUtilData();

  config.headers['Authorization'] = 'Bearer' + ' ' + result.access;
  return config;
});
APIKit.interceptors.response.use(
  response => responseHandler(response),
  error => errorHandler(error),
);

export default APIKit;
