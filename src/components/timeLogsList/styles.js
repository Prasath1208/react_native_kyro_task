import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors, fontfamily} from '../../constant/theme';

const styles = StyleSheet.create({
  cardView: {
    width: '100%',
    padding: wp('3%'),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3,
    borderRadius: wp('1%'),
    alignSelf: 'center',
  },
  itemContainer: {
    width: '100%',
    backgroundColor: colors.lightWhite,
    borderRadius: wp('1%'),
    alignSelf: 'center',
    padding: wp('3%'),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3,
  },
  sepratorLine: {
    borderBottomWidth: 0.7,
    borderColor: colors.lightBlue,
  },
});

export default styles;
