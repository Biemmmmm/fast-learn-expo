import { Pressable, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColor } from '@/hooks/use-theme-color';

interface GradientButtonProps {
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export function GradientButton({
  label,
  icon,
  onPress,
  variant = 'primary',
  fullWidth = false,
}: GradientButtonProps) {
  const onSecondary = useThemeColor({}, 'onSecondary');
  const onSurface = useThemeColor({}, 'onSurface');
  const surfaceContainerHighest = useThemeColor({}, 'surfaceContainerHighest');
  const surfaceDim = useThemeColor({}, 'surfaceDim');

  if (variant === 'secondary') {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: surfaceContainerHighest },
          fullWidth && styles.fullWidth,
          pressed && { backgroundColor: surfaceDim },
        ]}>
        <View style={styles.content}>
          {icon && <MaterialIcons name={icon} size={20} color={onSurface} />}
          <Text style={[styles.text, { color: onSurface }]}>{label}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={fullWidth && styles.fullWidth}>
      <LinearGradient
        colors={['#006c4a', '#68dba9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <View style={styles.content}>
          {icon && <MaterialIcons name={icon} size={20} color={onSecondary} />}
          <Text style={[styles.text, { color: onSecondary }]}>{label}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  fullWidth: {
    width: '100%',
  },
});
