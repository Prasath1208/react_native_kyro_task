import React from 'react';
import {StyleSheet} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import ScreenNames from './screenNames';

import {SCREENS} from '../constant';
import {colors, fontfamily} from '../constant/theme';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.HOME}
      options={{headerShown: false}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={SCREENS.HOME}
        component={ScreenNames.Home}
        options={{
          headerShown: false,
          drawerLabel: SCREENS.DASHBOARD,
          // drawerActiveBackgroundColor: colors.white,
          drawerActiveTintColor: colors.blue,
          drawerLabelStyle: styles.labelStyle,
        }}
      />
      <Drawer.Screen
        name={SCREENS.TASKBYTAGS}
        component={ScreenNames.TaskByTagsScreen}
        options={{
          headerShown: false,
          drawerLabel: SCREENS.TASKBYTAGS,
          // drawerActiveBackgroundColor: colors.white,
          drawerActiveTintColor: colors.blue,
          drawerLabelStyle: styles.labelStyle,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  // -----------------
  labelStyle: {
    fontFamily: fontfamily.fontInterBold,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});

export default DrawerNavigator;
