import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {bindActionCreators} from 'redux';
import {iconpathurl} from '../../constant/iconpath';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {dqutill, SCREENS} from '../../constant';
import NavigationService from '../../navigation/NavigationService';
import CustomSafeArea from '../../components/customSafeArea';
import {colors} from '../../constant/theme';
import Button from '../../components/button';
import Spacer from '../../components/spacer';

function LoginScreen(props) {
  useEffect(() => {}, []);

  return (
    <CustomSafeArea backgroundColor={colors.blue} style={styles.container}>
      <Text style={styles.txt}>LOGIN</Text>
      <Spacer height={hp('1.5%')} />
      <Button
        text="Go To Home Screen"
        onPress={() => {
          NavigationService.navigate(SCREENS.DASHBOARD);
        }}
        flex={0.04}
        width={'90%'}
        textWeight={'bold'}
        textColor={colors.white}
        textSize={hp('2%')}
      />
    </CustomSafeArea>
  );
}

const mapStateToProps = state => ({});

const Actions = {};

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators(Actions, dispatch)};
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
