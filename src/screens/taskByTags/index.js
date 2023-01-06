import React, {useEffect} from 'react';
import {View} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import styles from './styles';

import {SCREENS} from '../../constant';
import {iconpathurl} from '../../constant/iconpath';
import {baseStyle, colors, fontfamily} from '../../constant/theme';
import {strings} from '../../constant/strings';

import CustomSafeArea from '../../components/customSafeArea';
import Button from '../../components/button';
import HeaderComponent from '../../components/header';
import TaskListComponent from '../../components/taskList';
import Spacer from '../../components/spacer';

import NavigationService from '../../navigation/NavigationService';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AddTaskActions from '../../redux/actions/addTaskActions';

function TaskByTagsScreen(props) {
  useEffect(() => {}, []);

  const Tab = createMaterialTopTabNavigator();

  const openDrawerTab = () => {
    props.navigation.openDrawer();
  };

  // view task detail
  const viewTaskDetail = item => {
    NavigationService.navigate(SCREENS.TASKDETAIL, {
      taskId: item?.id,
    });
  };

  const tabCompent = (prop, type) => (
    <TaskListComponent
      type={type}
      viewTaskOnpress={item => {
        viewTaskDetail(item);
      }}
      {...prop}
    />
  );

  return (
    <CustomSafeArea backgroundColor={colors.blue} style={styles.container}>
      <HeaderComponent
        headerText={SCREENS.TASKBYTAGS}
        icon={iconpathurl.menuIcon}
        onPress={openDrawerTab}
      />
      <View style={styles.bodyView}>
        <Tab.Navigator
          screenOptions={{
            swipeEnabled: false,
            tabBarActiveTintColor: colors.blue,
            tabBarInactiveTintColor: colors.black,
            tabBarIndicatorStyle: {
              borderColor: colors.blue,
              borderWidth: 1,
            },
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarScrollEnabled: true,
            tabBarStyle: {backgroundColor: colors.lightWhite},
            tabBarPressOpacity: 0.5,
          }}>
          <Tab.Screen
            name={strings.all}
            children={prop => {
              return tabCompent(prop, strings.all);
            }}
            options={{
              title: strings.all,
            }}
          />
          <Tab.Screen
            name={strings.high}
            children={prop => {
              return tabCompent(prop, strings.high);
            }}
            options={{
              title: strings.high,
            }}
          />
          <Tab.Screen
            name={strings.low}
            children={prop => {
              return tabCompent(prop, strings.low);
            }}
            options={{
              title: strings.low,
            }}
          />
        </Tab.Navigator>
      </View>
    </CustomSafeArea>
  );
}

const mapStateToProps = state => ({});

const Actions = {
  ...AddTaskActions,
};

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators(Actions, dispatch)};
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskByTagsScreen);
