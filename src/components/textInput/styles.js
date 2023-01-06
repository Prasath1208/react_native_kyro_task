import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../../constant/theme';

const styles = StyleSheet.create({
  fieldText: {
    width: '100%',
    alignSelf: 'center',
  },
  textInputView: {
    width: '100%',
    height: hp('6%'),
    flexDirection: 'row',
    borderRadius: wp('1%'),
    alignSelf: 'center',
    paddingRight: wp('2%'),
    paddingLeft: wp('2%'),
    alignItems: 'center',
    borderColor: colors.greyBorder,
  },
  textInputViewMultiline: {
    flex: 0.15,
    width: '100%',
    flexDirection: 'row',
    borderRadius: wp('1%'),
    alignSelf: 'center',
    padding: wp('2%'),
    borderColor: colors.greyBorder,
  },
  textInput: {
    height: '100%',
  },
  icon: {
    width: wp('5%'),
    height: wp('5%'),
    resizeMode: 'contain',
    flex: 0.13,
  },
  marginTop: {
    top: wp('1%'),
  },
});

export default styles;
