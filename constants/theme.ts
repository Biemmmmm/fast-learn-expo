import { Platform } from 'react-native';

// Clearer Design System: "The Analytical Lens"
// Tonal Architecture with monochromatic slate foundation + emerald accent

export const Colors = {
  light: {
    // Surface Hierarchy (base → highest)
    background: '#f7f9fb',
    surface: '#f7f9fb',
    surfaceBright: '#f7f9fb',
    surfaceDim: '#d8dadc',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f2f4f6',
    surfaceContainer: '#eceef0',
    surfaceContainerHigh: '#e6e8ea',
    surfaceContainerHighest: '#e0e3e5',
    surfaceVariant: '#e0e3e5',

    // Primary (black)
    primary: '#000000',
    onPrimary: '#dfe2eb',
    primaryContainer: '#383c42',
    onPrimaryContainer: '#ffffff',
    primaryFixed: '#5b5e66',
    primaryFixedDim: '#43474e',
    onPrimaryFixed: '#ffffff',
    onPrimaryFixedVariant: '#dfe2eb',

    // Secondary (emerald accent)
    secondary: '#006c4a',
    onSecondary: '#ffffff',
    secondaryContainer: '#76eab6',
    onSecondaryContainer: '#002114',
    secondaryFixed: '#68dba9',
    secondaryFixedDim: '#49bf8f',
    onSecondaryFixed: '#002114',
    onSecondaryFixedVariant: '#00452e',

    // Tertiary
    tertiary: '#2e3c50',
    onTertiary: '#d5e3fd',
    tertiaryContainer: '#67758c',
    onTertiaryContainer: '#ffffff',
    tertiaryFixed: '#515f74',
    tertiaryFixedDim: '#3a485c',
    onTertiaryFixed: '#ffffff',
    onTertiaryFixedVariant: '#d5e3fd',

    // Error
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#410002',

    // Text
    onBackground: '#191c1e',
    onSurface: '#191c1e',
    onSurfaceVariant: '#474747',

    // Borders
    outline: '#777777',
    outlineVariant: '#c6c6c6',

    // Inverse
    inverseSurface: '#2d3133',
    inverseOnSurface: '#eff1f3',
    inversePrimary: '#c3c6cf',

    // Navigation
    tint: '#2563eb', // blue-600 for active nav
    tabIconDefault: '#777777',
    tabIconSelected: '#2563eb',

    // Brand
    brandBlue: '#2563eb', // blue-600
  },
  dark: {
    background: '#191c1e',
    surface: '#191c1e',
    surfaceBright: '#2d3133',
    surfaceDim: '#111416',
    surfaceContainerLowest: '#0e1112',
    surfaceContainerLow: '#1d2022',
    surfaceContainer: '#212527',
    surfaceContainerHigh: '#2b3032',
    surfaceContainerHighest: '#363a3d',
    surfaceVariant: '#41484b',

    primary: '#c3c6cf',
    onPrimary: '#303338',
    primaryContainer: '#464a51',
    onPrimaryContainer: '#dfe2eb',
    primaryFixed: '#dfe2eb',
    primaryFixedDim: '#c3c6cf',
    onPrimaryFixed: '#303338',
    onPrimaryFixedVariant: '#c3c6cf',

    secondary: '#68dba9',
    onSecondary: '#003823',
    secondaryContainer: '#005237',
    onSecondaryContainer: '#85f7c5',
    secondaryFixed: '#85f7c5',
    secondaryFixedDim: '#68dba9',
    onSecondaryFixed: '#003823',
    onSecondaryFixedVariant: '#005237',

    tertiary: '#b0c8f3',
    onTertiary: '#152944',
    tertiaryContainer: '#2e3c50',
    onTertiaryContainer: '#d5e3fd',
    tertiaryFixed: '#d5e3fd',
    tertiaryFixedDim: '#b0c8f3',
    onTertiaryFixed: '#152944',
    onTertiaryFixedVariant: '#475f7a',

    error: '#ffb4ab',
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffdad6',

    onBackground: '#e1e3e5',
    onSurface: '#e1e3e5',
    onSurfaceVariant: '#c0c7cb',

    outline: '#8a9296',
    outlineVariant: '#41484b',

    inverseSurface: '#e1e3e5',
    inverseOnSurface: '#303338',
    inversePrimary: '#5b5e66',

    tint: '#60a5fa', // blue-400 for dark mode
    tabIconDefault: '#8a9296',
    tabIconSelected: '#60a5fa',

    brandBlue: '#60a5fa', // blue-400
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'Inter, system-ui',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});

// Spacing scale
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
};

// Border radius scale (Design System: "No Large Radii")
export const Radii = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  full: 9999,
};
