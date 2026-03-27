import { Pressable, StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';

interface QuickActionChipProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress?: () => void;
  isActive?: boolean;
}

export function QuickActionChip({ icon, label, onPress, isActive = false }: QuickActionChipProps) {
  const surfaceContainer = useThemeColor({}, 'surfaceContainer');
  const surfaceContainerHigh = useThemeColor({}, 'surfaceContainerHigh');
  const secondaryContainer = useThemeColor({}, 'secondaryContainer');
  const onSecondaryContainer = useThemeColor({}, 'onSecondaryContainer');
  const onSurface = useThemeColor({}, 'onSurface');

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: isActive ? secondaryContainer : surfaceContainer,
        },
        pressed && { backgroundColor: surfaceContainerHigh },
      ]}>
      <View style={styles.content}>
        <MaterialIcons
          name={icon}
          size={18}
          color={isActive ? onSecondaryContainer : onSurface}
        />
        <Text
          style={[
            styles.label,
            { color: isActive ? onSecondaryContainer : onSurface },
          ]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});
