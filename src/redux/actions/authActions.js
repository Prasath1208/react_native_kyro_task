export function loginWithPasswordRequest(data, callBack) {
  return {
    type: '@auth/LOGIN',
    payload: {data, callBack},
  };
}
