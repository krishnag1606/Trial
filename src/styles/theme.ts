import { Dimensions } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: {
    new: '#cbdfedff',
    primary: '#4A90E2',
    primaryDark: '#357ABD',
    secondary: '#50C878',
    background: '#d2d4d6cc',
    surface: '#FFFFFF',
    text: '#2C3E50',
    textSecondary: '#7F8C8D',
    border: '#E8EAED',
    error: '#E74C3C',
    warning: '#F39C12',
    success: '#27AE60',
    black: '#000000',
    gray100: '#F8F9FA',
    gray200: '#E9ECEF',
    gray300: '#DEE2E6',
    gray400: '#CED4DA',
    gray500: '#ADB5BD',
    blue: '#007AFF',
    lightBlue: '#E3F2FD'
  },
  spacing: {
    xs: scale(4),
    sm: scale(8),
    md: scale(16),
    lg: scale(24),
    xl: scale(32),
    xxl: scale(48),
    xxxl: scale(64),
    xxxxl: scale(80)
  },
  borderRadius: {
    sm: moderateScale(4),
    md: moderateScale(8),
    lg: moderateScale(12),
    xl: moderateScale(16),
    round: moderateScale(50)
  },
  fontSize: {
    xs: moderateScale(10),
    sm: moderateScale(12),
    md: moderateScale(14),
    lg: moderateScale(16),
    xl: moderateScale(18),
    xxl: moderateScale(20),
    xxxl: moderateScale(24),
    title: moderateScale(28)
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5
    }
  },
  dimensions: {
    screenWidth: width,
    screenHeight: height,
    isSmallDevice: width < 350,
    isMediumDevice: width >= 350 && width < 400,
    isLargeDevice: width >= 400
  }
};