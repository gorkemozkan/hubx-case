import { FontSource } from 'expo-font';

export const Colors = {
  'green-500': '#28AF6E',
  'green-400': '#2CCC80',

  'sage-700': '#597165',
  'sage-500': '#7C9471',
  'sage-200': '#BDD3AB',
  'sage-50': '#F9FFFA',

  'blue-600': '#3E59E7',
  'indigo-300': '#93AAFF',
  'sky-200': '#C0F0FF',

  'violet-500': '#A276FF',
  'lavender-300': '#E7C0FF',
  'fuchsia-600': '#FA00FF',
  'pink-200': '#FEBDFF',
  'pink-100': '#FEDEFF',

  'amber-700': '#D9A846',
  'amber-600': '#E4B046',
  'amber-500': '#F5C25B',
  'amber-400': '#F4BD6B',
  'amber-300': '#E5C990',
  'amber-200': '#F0D399',
  'amber-100': '#FFDE9C',
  'sand-500': '#D0B070',

  'red-600': '#E82C13',
  'red-500': '#FF0000',

  'gray-950': '#101E17',
  'gray-900': '#130F26',
  'gray-850': '#13231B',
  'gray-700': '#3C3C43',
  'gray-500': '#979798',
  'gray-450': '#AFAFAF',
  'gray-400': '#ABABAB',
  'gray-300': '#BDBDBD',
  'gray-100': '#F6F6F6',
  'gray-50': '#FAFAFA',
  'gray-25': '#FBFAFA',

  white: '#FFFFFF',
  'white-cool': '#F8FAFF',
  'white-mint': '#FDFFFE',

  'brown-900': '#24201A',
  black: '#000000',
} as const;

export const SemanticColors = {
  primary: Colors['green-500'],
  primaryMuted: Colors['green-400'],
  onPrimary: Colors.white,

  text: Colors['gray-850'],
  textSecondary: Colors['gray-700'],
  textTertiary: Colors['gray-500'],
  textInverse: Colors.white,

  background: Colors.white,
  backgroundMuted: Colors['white-cool'],
  backgroundSecondary: Colors['gray-100'],
  surface: Colors.white,
  surfaceAlt: Colors['gray-50'],

  border: Colors['gray-300'],
  outline: Colors['gray-400'],
  hairline: Colors['gray-700'],

  success: Colors['green-500'],
  warning: Colors['amber-600'],
  error: Colors['red-600'],
  info: Colors['blue-600'],

  link: Colors['blue-600'],
  accentPurple: Colors['violet-500'],
  accentPink: Colors['pink-200'],

  tagSage: Colors['sage-500'],
  tagGold: Colors['amber-500'],
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Typography = {
  rubik: {
    light: 'Rubik-Light',
    regular: 'Rubik-Regular',
    medium: 'Rubik-Medium',
    semiBold: 'Rubik-SemiBold',
    bold: 'Rubik-Bold',
    extraBold: 'Rubik-ExtraBold',
  },
  sfProDisplay: {
    light: 'SF-Pro-Display-Light',
    regular: 'SF-Pro-Display-Regular',
    medium: 'SF-Pro-Display-Medium',
    semiBold: 'SF-Pro-Display-Semibold',
    bold: 'SF-Pro-Display-Bold',
    black: 'SF-Pro-Display-Black',
  },
  sfProText: {
    regular: 'SF-Pro-Text-Regular',
    semiBold: 'SF-Pro-Text-Semibold',
    bold: 'SF-Pro-Text-Bold',
  },
  visby: {
    thin: 'Visby-Thin',
    light: 'Visby-Light',
    regular: 'Visby-Regular',
    medium: 'Visby-Medium',
    semiBold: 'Visby-Semibold',
    bold: 'Visby-Bold',
    extraBold: 'Visby-Extrabold',
    heavy: 'Visby-Heavy',
  },
} as const;

export type ColorKey = keyof typeof Colors;
export type SpacingKey = keyof typeof Spacing;
export type SemanticColorKey = keyof typeof SemanticColors;
export type TypographyKey = keyof typeof Typography;

export type TypographySource = Record<
  {
    [K in keyof typeof Typography]: (typeof Typography)[K][keyof (typeof Typography)[K]];
  }[keyof typeof Typography],
  FontSource
>;

export const getColorWithOpacity = (color: string, opacity: number): string => {
  const alpha = Math.round((opacity / 100) * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${color.replace('#', '')}${alpha}`;
};
