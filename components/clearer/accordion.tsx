import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isHighlighted?: boolean;
}

export function Accordion({ title, children, isHighlighted = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(true);

  const surfaceContainerLow = useThemeColor({}, 'surfaceContainerLow');
  const surfaceContainer = useThemeColor({}, 'surfaceContainer');
  const secondary = useThemeColor({}, 'secondary');
  const outlineVariant = useThemeColor({}, 'outlineVariant');
  const onSurface = useThemeColor({}, 'onSurface');
  const onSurfaceVariant = useThemeColor({}, 'onSurfaceVariant');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: surfaceContainerLow,
          borderLeftColor: isHighlighted ? secondary : outlineVariant,
        },
      ]}>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        style={({ pressed }) => [
          styles.header,
          pressed && { backgroundColor: surfaceContainer },
        ]}>
        <Text style={[styles.title, { color: onSurface }]}>{title}</Text>
        <MaterialIcons
          name={isOpen ? 'expand-less' : 'expand-more'}
          size={24}
          color={onSurfaceVariant}
        />
      </Pressable>
      {isOpen && (
        <View style={styles.content}>
          {typeof children === 'string' ? (
            <Text style={[styles.contentText, { color: onSurfaceVariant }]}>{children}</Text>
          ) : (
            children
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    borderLeftWidth: 4,
    marginBottom: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
  },
});
