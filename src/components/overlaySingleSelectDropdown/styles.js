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
  // dropdown styles

  dropDownBoxView: {
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

  downArrowIcon: {
    resizeMode: 'contain',
    height: wp('3%'),
    width: wp('4%'),
  },
  dropDownContentview: {
    backgroundColor: colors.profileBackground,
    borderColor: colors.greyBorder,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomRightRadius: wp('1%'),
    borderBottomLeftRadius: wp('1%'),
    width: '100%',
    alignSelf: 'center',
    padding: wp('2%'),
    paddingTop: 0,
  },
  dropdownTextView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: wp('2.5%'),
    paddingBottom: wp('2.5%'),
  },
  dropValueText: {
    width: '93%',
  },
  tcikIcon: {
    resizeMode: 'contain',
    height: wp('3%'),
    width: wp('3.5%'),
  },
});

export default styles;
