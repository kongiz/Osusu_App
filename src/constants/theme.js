export const COLORS = {
  // Primary palette — warm earth tones, community feel
  primary: '#1B6B3A',       // deep forest green
  primaryLight: '#2D8A50',
  primaryDark: '#134D2A',

  accent: '#F4A623',        // warm gold — money, trust
  accentLight: '#F7BD55',

  background: '#F5F2EC',    // warm off-white, not clinical
  surface: '#FFFFFF',
  surfaceWarm: '#FDF9F3',

  text: '#1A1A1A',
  textSecondary: '#6B6B6B',
  textMuted: '#A0A0A0',
  textOnPrimary: '#FFFFFF',

  success: '#2D8A50',
  warning: '#F4A623',
  error: '#D94F3D',
  errorLight: '#FDF0EE',

  border: '#E8E3D9',
  borderLight: '#F0EDE8',

  // Status colors for contributions
  paid: '#E8F5EE',
  paidText: '#1B6B3A',
  pending: '#FEF8EC',
  pendingText: '#C17D10',
  missed: '#FDF0EE',
  missedText: '#D94F3D',

  overlay: 'rgba(0,0,0,0.5)',
  cardShadow: 'rgba(0,0,0,0.08)',
};

export const FONTS = {
  // Use system fonts for reliability in bare Expo
  heading: 'System',
  body: 'System',
};

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,

  // Border radius
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 20,
  radiusFull: 999,

  // Typography
  textXs: 11,
  textSm: 13,
  textMd: 15,
  textLg: 17,
  textXl: 20,
  textXxl: 24,
  textDisplay: 30,
};

export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};
