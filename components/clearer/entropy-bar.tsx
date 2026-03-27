import { View, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

interface EntropyBarProps {
  progress: number; // 0-100
}

export function EntropyBar({ progress }: EntropyBarProps) {
  const secondary = useThemeColor({}, 'secondary');
  const surfaceContainerHigh = useThemeColor({}, 'surfaceContainerHigh');

  return (
    <View>
      <View style={[styles.track, { backgroundColor: surfaceContainerHigh }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${progress}%`,
              backgroundColor: secondary,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 2,
    width: '100%',
    borderRadius: 1,
  },
  fill: {
    height: '100%',
    borderRadius: 1,
  },
});
