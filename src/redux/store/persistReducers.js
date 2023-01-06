import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'kyroTask',
      storage: AsyncStorage,
      whitelist: ['authReducer', 'addTaskReducer'],
    },
    reducers,
  );

  return persistedReducer;
};
