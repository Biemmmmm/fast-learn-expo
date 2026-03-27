# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (provides QR code for Expo Go app)
npx expo start

# Start with specific platform
npm run android    # Android emulator
npm run ios        # iOS simulator (macOS only)
npm run web        # Web browser

# Code quality
npm run lint       # Run ESLint with expo config

# Reset project to blank state
npm run reset-project
```

## Project Architecture

### File-Based Routing (Expo Router)

Routes are defined by files in the `app/` directory:

- `app/_layout.tsx` - Root layout with navigation stack
- `app/(tabs)/` - Route group for tab navigation
  - `app/(tabs)/index.tsx` - Home tab (/)
  - `app/(tabs)/explore.tsx` - Explore tab (/explore)
  - `app/(tabs)/_layout.tsx` - Tab bar configuration
- `app/modal.tsx` - Modal screen

Route groups (folders with parentheses) don't appear in the URL path. The `(tabs)` group creates a tab navigator without affecting routes.

### Theming System

The project uses a custom theming system supporting light/dark modes:

- `constants/theme.ts` - Color and font definitions
- `hooks/use-color-scheme.ts` - Detect system color scheme
- `hooks/use-theme-color.ts` - Get themed colors with overrides
- `components/themed-text.tsx` - Text with theme support and type variants
- `components/themed-view.tsx` - View with theme support

Use `ThemedText` and `ThemedView` components instead of raw React Native components to respect user color scheme preferences.

### Path Aliases

TypeScript path alias `@/*` maps to the project root:

```tsx
import { Colors } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
```

### Key Dependencies

- **Expo ~54.0.33** - Core framework
- **Expo Router ~6.0.23** - File-based routing
- **React Native 0.81.5** - New Architecture enabled
- **React 19.1.0** - With React Compiler experiment

### Platform-Specific Code

Use platform-specific file extensions or `Platform.select()`:

```tsx
// File-based: icon-symbol.ios.tsx, icon-symbol.tsx (fallback)
// Or inline: Platform.select({ ios: ..., android: ..., web: ... })
```

### Icons

Use `IconSymbol` component from `components/ui/icon-symbol.tsx` for SF Symbols (iOS) with Material Icons fallback (Android/Web).

### Experiments Enabled

- `typedRoutes: true` - Type-safe routing
- `reactCompiler: true` - React Compiler optimization
- `newArchEnabled: true` - React Native New Architecture
