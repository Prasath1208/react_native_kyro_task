import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../constant/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const LoadingIndicator = props => (
  <View
    style={[
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      props.containerStyle,
    ]}>
    <ActivityIndicator
      hidesWhenStopped={true}
      animating={props.loading}
      color={colors.blue}
      size="small"
      style={{marginRight: 10}}
    />
    <Text
      testID={`loadingMessageText_${props.message}`}
      accessibilityLabel={`loadingMessageText_${props.message}`}
      style={styles.textMessage}>
      {props.message}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  textMessage: {
    fontSize: hp('1.8%'),
    color: colors.black,
    fontWeight: '700',
  },
});
