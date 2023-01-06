import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors, fontfamily} from '../../constant/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.lightWhite,
  },
  bodyView: {
    flex: 0.89,
    width: '100%',
    alignItems: 'center',
  },

  // modal styles
  modalBase: {
    width: '100%',
    backgroundColor: colors.white,
    alignSelf: 'center',
    padding: wp('4%'),
    borderRadius: wp('2%'),
  },
  cancelIconView: {
    width: '10%',
    height: hp('3.5%'),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelIcon: {
    width: wp('4%'),
    height: wp('4%'),
    resizeMode: 'contain',
  },

  // list styles
  listView: {
    width: '100%',
    flex: 0.94,
    paddingBottom: wp('2%'),
  },
});

export default styles;
