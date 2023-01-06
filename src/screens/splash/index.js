import React, {useEffect, useState} from 'react';
import {SafeAreaView, Image, View, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {bindActionCreators} from 'redux';
import {iconpathurl} from '../../constant/iconpath';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {dqutill, SCREENS} from '../../constant';
import NavigationService from '../../navigation/NavigationService';
import Modal from '../../components/modal';
import CustomSafeArea from '../../components/customSafeArea';
import {colors} from '../../constant/theme';

function SplashScreen(props) {
  useEffect(() => {
    Modal.createProgressModal('Splash...', false);
    setTimeout(() => {
      Modal.hideAll();
      NavigationService.navigateAndReset(SCREENS.DASHBOARD);
    }, 2000);
  }, []);

  return (
    <CustomSafeArea
      backgroundColor={colors.blue}
      style={styles.container}></CustomSafeArea>
  );
}

const mapStateToProps = state => ({});

const Actions = {};

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators(Actions, dispatch)};
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
