import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../../constant/theme';

const styles = StyleSheet.create({
  mainView: {
    flex: 0.1,
    width: 'auto',
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  buttonView: {
    flex: 0.15,
  },
  textView: {
    flex: 0.85,
    justifyContent: 'center',
  },
  text: {
    width: '99%',
  },
});

export default styles;
