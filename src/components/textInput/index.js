import React from 'react';
import {TouchableOpacity, Image, Text, View, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './styles';

import Spacer from '../spacer';
import Button from '../button';

import {baseStyle, colors} from '../../constant/theme';
import {iconpathurl} from '../../constant/iconpath';
import {strings} from '../../constant/strings';

export default function TextInputComponent(props) {
  const {
    icon,
    type,
    label,
    labelColor = colors.black,
    labelTextSize = '1.8%',
    placeholder = strings.enterHere,
    defaultValue,
    maxLength,
    keyboardType,
    value,
    onSubmit,
    onChangeText,
    secureTextEntry,
    editable = true,
  } = props;

  const multilineTextInput = () => {
    return (
      <View
        style={[
          styles.textInputViewMultiline,
          {
            backgroundColor: editable
              ? colors.textInputGrey
              : colors.textInputPlaceholder,
            borderWidth: editable ? 1 : 0,
          },
        ]}>
        {Boolean(icon) && (
          <Image source={icon} style={[styles.icon, styles.marginTop]} />
        )}
        <TextInput
          style={[
            baseStyle.txtStyleOutInterRegular(hp('1.6%'), colors.black),
            styles.textInput,
            {flex: Boolean(icon) ? 0.87 : 1},
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textInputPlaceholder}
          defaultValue={defaultValue}
          maxLength={maxLength}
          keyboardType={keyboardType}
          value={value}
          onSubmit={onSubmit}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          multiline={true}
          editable={editable}
        />
      </View>
    );
  };

  const textInput = () => {
    return (
      <View
        style={[
          styles.textInputView,
          {
            backgroundColor: editable
              ? colors.textInputGrey
              : colors.textInputPlaceholder,
            borderWidth: editable ? 1 : 0,
          },
        ]}>
        {Boolean(icon) && <Image source={icon} style={styles.icon} />}
        <TextInput
          style={[
            baseStyle.txtStyleOutInterRegular(hp('1.6%'), colors.black),
            styles.textInput,
            {flex: Boolean(icon) ? 0.87 : 1},
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textInputPlaceholder}
          defaultValue={defaultValue}
          maxLength={maxLength}
          keyboardType={keyboardType}
          value={value}
          onSubmit={onSubmit}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          editable={editable}
        />
      </View>
    );
  };
  return (
    <>
      {Boolean(label) && (
        <>
          <Text
            style={[
              baseStyle.txtStyleOutInterMedium(hp(labelTextSize), labelColor),
              styles.fieldText,
            ]}>
            {label}
          </Text>
          <Spacer height={hp('1%')} />
        </>
      )}
      {type == 'multiline' ? multilineTextInput() : textInput()}
    </>
  );
}
