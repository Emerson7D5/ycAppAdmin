import { Platform, StatusBar } from 'react-native';
import { theme } from 'galio-framework';

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));
export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);
export const webApi = 'https://testing-app-2020-restaurant.herokuapp.com';

export const seedOne = '>Nv+m4V5X@';
export const seedTwo = '@b8,MC5+$:;@';
