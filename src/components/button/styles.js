import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors, fontfamily} from '../../constant/theme';

const styles = StyleSheet.create({
  blueButton: {
    flexDirection: 'row',
    // backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: wp('4%'),
    paddingLeft: wp('4%'),
  },
  icon: {
    width: wp('5%'),
    height: wp('5%'),
    resizeMode: 'contain',
  },
});

export default styles;
