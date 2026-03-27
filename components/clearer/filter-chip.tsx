import { Pressable, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

interface FilterChipProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

export function FilterChip({ label, isActive = false, onPress }: FilterChipProps) {
  const secondaryContainer = useThemeColor({}, 'secondaryContainer');
  const onSecondaryContainer = useThemeColor({}, 'onSecondaryContainer');
  const surfaceContainerHigh = useThemeColor({}, 'surfaceContainerHigh');
  const onSurfaceVariant = useThemeColor({}, 'onSurfaceVariant');
  const surfaceContainerHighest = useThemeColor({}, 'surfaceContainerHighest');

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: isActive
            ? secondaryContainer
            : pressed
              ? surfaceContainerHighest
              : surfaceContainerHigh,
        },
      ]}>
      <Text
        style={[
          styles.label,
          {
            color: isActive ? onSecondaryContainer : onSurfaceVariant,
          },
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 9999,
  },
  label: {
    fontSize: 14,
    fontWeight: '500' as const,
  },
});
