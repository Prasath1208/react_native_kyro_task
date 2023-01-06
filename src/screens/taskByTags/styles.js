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
    alignSelf: 'center',
  },
  tabBarLabelStyle: {
    fontSize: hp('1.5%'),
    fontFamily: fontfamily.fontInterBold,
    fontWeight: 'bold',
  },
});

export default styles;
