import React from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './styles';

import Spacer from '../spacer';

import {baseStyle, colors} from '../../constant/theme';

export default function Button(props) {
  const {
    onPress,
    text,
    icon,
    spaceBetween,
    height,
    flex,
    width = 'auto',
    borderRadius = wp('1%'),
    textWeight = 'bold',
    textColor = colors.white,
    textSize = hp('1.8%'),
    backgroundColor = colors.blue,
    alignSelf,
    disabled = false,
  } = props;

  return (
    <TouchableOpacity
      style={[
        styles.blueButton,
        {
          flex: flex,
          height: height,
          width: width,
          borderRadius: borderRadius,
          backgroundColor: backgroundColor,
          alignSelf: alignSelf,
        },
      ]}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.65}>
      {Boolean(icon) && (
        <>
          <Image source={icon} style={styles.icon} />
          <Spacer width={spaceBetween} />
        </>
      )}
      {Boolean(text) && (
        <Text style={[baseStyle.txtStyleOutInterBold(textSize, textColor)]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
