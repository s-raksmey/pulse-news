// utils/css-vars.ts
export const cssVars = {
  // Colors
  colors: {
    primary: {
      50: 'var(--color-primary-50)',
      100: 'var(--color-primary-100)',
      200: 'var(--color-primary-200)',
      300: 'var(--color-primary-300)',
      400: 'var(--color-primary-400)',
      500: 'var(--color-primary-500)',
      600: 'var(--color-primary-600)',
      700: 'var(--color-primary-700)',
      800: 'var(--color-primary-800)',
      900: 'var(--color-primary-900)',
    },
    gray: {
      50: 'var(--color-gray-50)',
      100: 'var(--color-gray-100)',
      200: 'var(--color-gray-200)',
      300: 'var(--color-gray-300)',
      400: 'var(--color-gray-400)',
      500: 'var(--color-gray-500)',
      600: 'var(--color-gray-600)',
      700: 'var(--color-gray-700)',
      800: 'var(--color-gray-800)',
      900: 'var(--color-gray-900)',
    },
    semantic: {
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      error: 'var(--color-error)',
      info: 'var(--color-info)',
    },
    background: 'var(--color-background)',
    foreground: 'var(--color-foreground)',
    surface: 'var(--color-surface)',
    surfaceAlt: 'var(--color-surface-alt)',
  },
  
  // Typography
  typography: {
    fonts: {
      sans: 'var(--font-family-sans)',
      mono: 'var(--font-family-mono)',
    },
    sizes: {
      xs: 'var(--font-size-xs)',
      sm: 'var(--font-size-sm)',
      base: 'var(--font-size-base)',
      lg: 'var(--font-size-lg)',
      xl: 'var(--font-size-xl)',
      '2xl': 'var(--font-size-2xl)',
      '3xl': 'var(--font-size-3xl)',
      '4xl': 'var(--font-size-4xl)',
      '5xl': 'var(--font-size-5xl)',
      '6xl': 'var(--font-size-6xl)',
    },
    weights: {
      normal: 'var(--font-weight-normal)',
      medium: 'var(--font-weight-medium)',
      semibold: 'var(--font-weight-semibold)',
      bold: 'var(--font-weight-bold)',
      black: 'var(--font-weight-black)',
    },
  },
  
  // Layout
  layout: {
    maxWidth: {
      '8xl': 'var(--max-width-8xl)',
      '7xl': 'var(--max-width-7xl)',
      '6xl': 'var(--max-width-6xl)',
      '5xl': 'var(--max-width-5xl)',
      '4xl': 'var(--max-width-4xl)',
    },
  },
  
  // Effects
  effects: {
    gradients: {
      primary: 'var(--gradient-primary)',
      subtle: 'var(--gradient-subtle)',
    },
    shadows: {
      sm: 'var(--shadow-sm)',
      base: 'var(--shadow-base)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      xl: 'var(--shadow-xl)',
      '2xl': 'var(--shadow-2xl)',
    },
  },
  
  // Transitions
  transitions: {
    fast: 'var(--transition-fast)',
    base: 'var(--transition-base)',
    slow: 'var(--transition-slow)',
  },
  
  // Border Radius
  borderRadius: {
    sm: 'var(--radius-sm)',
    base: 'var(--radius-base)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    '3xl': 'var(--radius-3xl)',
    full: 'var(--radius-full)',
  },
};

// Helper function to use CSS variables in inline styles
export const varStyle = (variableName: string) => {
  return `var(${variableName})`;
};