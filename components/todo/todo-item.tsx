import { Pressable, StyleSheet, Alert } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLanguage } from '@/contexts/language-context';
import type { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const { t } = useLanguage();
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');

  const handleDelete = () => {
    Alert.alert(
      t('todo.delete'),
      '',
      [
        { text: t('todo.cancel') || 'Cancel', style: 'cancel' },
        { text: t('todo.delete'), style: 'destructive', onPress: () => onDelete(todo.id) },
      ]
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(todo.completed ? 0.6 : 1, { duration: 200 }),
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable
        onPress={() => onToggle(todo.id)}
        onLongPress={handleDelete}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      >
        <ThemedView style={styles.content}>
          <Pressable
            onPress={() => onToggle(todo.id)}
            style={[styles.checkbox, todo.completed && styles.checkboxCompleted]}
          >
            {todo.completed && (
              <IconSymbol name="checkmark" size={14} color="#fff" />
            )}
          </Pressable>

          <ThemedText
            style={[
              styles.text,
              todo.completed && styles.textCompleted,
            ]}
            numberOfLines={1}
          >
            {todo.text}
          </ThemedText>

          <Pressable onPress={handleDelete} style={styles.deleteButton}>
            <IconSymbol name="trash" size={20} color="#EF4444" />
          </Pressable>
        </ThemedView>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  pressable: {
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#0a7ea4',
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  deleteButton: {
    padding: 4,
  },
});
