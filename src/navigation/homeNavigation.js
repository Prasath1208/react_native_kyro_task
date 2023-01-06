import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {SCREENS} from '../constant';
import ScreenName from './screenNames';
import NavigationService from './NavigationService';

export const HomeNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <Stack.Navigator initialRouteName={SCREENS.SPLASH}>
        <Stack.Screen
          name={SCREENS.SPLASH}
          component={ScreenName.Splash}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={SCREENS.HOME}
          component={ScreenName.Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SCREENS.LOGIN}
          component={ScreenName.Login}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
