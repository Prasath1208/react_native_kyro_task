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
    flex: 0.8,
    width: '90%',
    alignSelf: 'center',
  },
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
  },

  timerView: {
    width: '30%',
  },
});

export default styles;
