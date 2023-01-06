import {NavigationActions, StackActions} from 'react-navigation';
import {createNavigationContainerRef} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function navigateAndReset(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot({
      index: 0,
      routes: [{name: name, params: params}],
    });
  }
}

function goBack() {
  navigationRef.dispatch(CommonActions.goBack());
}

export default {
  navigationRef,
  navigate,
  navigateAndReset,
  goBack,
};
