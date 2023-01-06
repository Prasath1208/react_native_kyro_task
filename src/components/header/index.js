import React from 'react';
import {Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './styles';

import Button from '../button';

import {baseStyle, colors} from '../../constant/theme';

export default function HeaderComponent(props) {
  const {onPress, headerText, icon} = props;

  return (
    <View style={styles.mainView}>
      <View style={styles.buttonView}>
        <Button
          backgroundColor={'transparent'}
          icon={icon}
          onPress={onPress}
          flex={1}
          width={'100%'}
          borderRadius={wp('9%')}
          alignSelf={'flex-start'}
        />
      </View>
      <View style={styles.textView}>
        <Text
          style={[
            baseStyle.txtStyleOutInterBold(hp('2.5%'), colors.blue),
            styles.text,
          ]}>
          {headerText}
        </Text>
      </View>
    </View>
  );
}
