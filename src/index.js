import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import {Provider} from 'react-redux';
import {AppStack} from './navigation';
import NavigationService from './navigation/NavigationService';

import Modal from './components/modal';
console.disableYellowBox = true;

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppStack />
        <Modal pointerEvents="box-none" onLayout={() => {}} />
      </PersistGate>
    </Provider>
  );
};

export default App;
