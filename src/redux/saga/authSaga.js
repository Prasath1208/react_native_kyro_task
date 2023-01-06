import axios from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';
// import APIKit from '../../apiService';
// import {ApiEndpoints} from '../../apiService/apiEndpoints';

// export function* loginWithPasswordRequest({payload}) {
//   const {data, updateStatus} = payload;

//   try {
//     const response = yield call(
//       APIKit.post,
//       ApiEndpoints.loginWithPasswordApi,
//       {
//         mobileNumber: data.mobileNumber,
//         password: data.password,
//       },
//     );

//     updateStatus(response);
//   } catch (err) {
//     updateStatus(err?.response?.data?.data || err?.data);
//   }
// }

export default all([
  // takeLatest('@auth/OTP_REQUEST', otpRequest),
]);
