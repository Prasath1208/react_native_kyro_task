import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenName from './screenNames';
import {NavigationContainer} from '@react-navigation/native';
import NavigationService from './NavigationService';

import {SCREENS} from '../constant';
import DrawerNavigator from './drawerNavigator';

export const AppStack = () => {
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
          name={SCREENS.DASHBOARD}
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SCREENS.LOGIN}
          component={ScreenName.Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SCREENS.TASKBYTAGS}
          component={ScreenName.TaskByTagsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SCREENS.TASKDETAIL}
          component={ScreenName.TaskDetailScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
