import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const sizes = {
  // global sizes
  bigFont: hp('3%'),
  mediumFont: hp('2%'),
  smallFont: hp('1%'),
  iconBigSize: hp('3%'),
  iconMediumSize: hp('2%'),
  iconSmallSize: hp('1%'),
  mediumFontText: hp('1.5%'),

  // font sizes
};
const fontfamily = {
  fontInterRegular: 'Inter-Regular',
  fontInterMedium: 'Inter-Medium',
  fontInterBold: 'Inter-Bold',
};

const baseStyle = {
  txtStyleOutInterRegular: (fontSize, fontColor) => ({
    fontFamily: fontfamily.fontInterRegular,
    fontSize: fontSize,
    color: fontColor,
  }),
  txtStyleOutInterMedium: (fontSize, fontColor) => ({
    fontFamily: fontfamily.fontInterMedium,
    fontSize: fontSize,
    color: fontColor,
  }),

  txtStyleOutInterBold: (fontSize, fontColor) => ({
    fontFamily: fontfamily.fontInterBold,
    fontSize: fontSize,
    color: fontColor,
  }),
  alignSelf: alignment => ({
    alignSelf: alignment,
  }),
  alignItems: alignment => ({
    alignItems: alignment,
  }),
  flexDirection: direction => ({
    flexDirection: direction,
  }),
  justifyContent: direction => ({
    justifyContent: direction,
  }),
  width: width => ({
    width: width,
  }),
};

const colors = {
  //black
  black: '#000000',

  // whites
  white: '#FFFFFF',
  lightWhite: '#F5F5F5',

  //blue
  blue: '#0E69C2',
  lightBlue: '#CDE7FF',
  bitDarkBlue: '#4285F4',
  darkdeepblue: '#243D63',
  darkblue: '#0655A3',

  //grey
  textInputGrey: '#EEEEEE',
  textInputPlaceholder: '#CACCCF',
  profileBackground: '#F0F2F5',
  greyBorder: '#898888',
};

export {sizes, fontfamily, baseStyle, colors};
