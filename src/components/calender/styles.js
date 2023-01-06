import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors, fontfamily} from '../../constant/theme';

const styles = StyleSheet.create({
  fieldText: {
    width: '100%',
    alignSelf: 'center',
  },

  //date picker styles

  datePicker: {
    width: '100%',
    height: hp('6%'),
    flexDirection: 'row',
    backgroundColor: colors.textInputGrey,
    borderRadius: wp('1%'),
    alignSelf: 'center',
    paddingRight: wp('2%'),
    paddingLeft: wp('2%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.greyBorder,
  },
  datePickerInput: {
    height: hp('2.5%'),
    borderWidth: 0,
  },
  datePickerText: {
    fontSize: 14,
    color: colors.black,
    alignSelf: 'flex-start',
    fontFamily: fontfamily.fontInterRegular,
    left: wp('3%'),
  },
  dateIcon: {
    height: wp('6%'),
    width: wp('5%'),
    marginRight: '3%',
  },

  calenderIcon: {
    height: wp('5%'),
    width: wp('5%'),
    resizeMode: 'contain',
  },
  iconView: {
    width: '50%',
    alignItems: 'flex-end',
  },
  dateText: {
    width: '50%',
  },
});

export default styles;
