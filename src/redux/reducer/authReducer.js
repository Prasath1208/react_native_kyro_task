const INITIAL_STATE = {
  userData: {},
};

export const authReducer = (state = INITIAL_STATE, action) => {
  const {type} = action;
  switch (type) {
    case '@auth/LOGIN':
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};
