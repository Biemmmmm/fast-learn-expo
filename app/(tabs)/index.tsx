import { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TodoItem } from '@/components/todo/todo-item';
import { TodoInput } from '@/components/todo/todo-input';
import { TodoFilter } from '@/components/todo/todo-filter';
import { useLanguage } from '@/contexts/language-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { Todo, FilterType } from '@/types/todo';

const TODOS_KEY = '@todos';

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const { t } = useLanguage();
  const tintColor = useThemeColor({}, 'tint');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const saved = await AsyncStorage.getItem(TODOS_KEY);
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load todos:', e);
    }
  };

  const saveTodos = async (newTodos: Todo[]) => {
    try {
      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
    } catch (e) {
      console.error('Failed to save todos:', e);
    }
  };

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    saveTodos(newTodos);
  }, [todos]);

  const toggleTodo = useCallback((id: string) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    saveTodos(newTodos);
  }, [todos]);

  const deleteTodo = useCallback((id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    saveTodos(newTodos);
  }, [todos]);

  const clearCompleted = useCallback(() => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
    saveTodos(newTodos);
  }, [todos]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        {t('appName')}
      </ThemedText>

      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

      <ThemedView style={styles.stats}>
        <ThemedText style={styles.statsText}>
          {t('todo.count.left', { count: activeCount })}
        </ThemedText>
        {completedCount > 0 && (
          <Pressable onPress={clearCompleted}>
            <ThemedText style={[styles.clearText, { color: tintColor }]}>
              {t('todo.clearCompleted')}
            </ThemedText>
          </Pressable>
        )}
      </ThemedView>

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <ThemedView style={styles.empty}>
            <ThemedText style={styles.emptyText}>
              {filter === 'all'
                ? t('todo.empty')
                : t('todo.emptyFiltered')}
            </ThemedText>
          </ThemedView>
        }
      />

      <TodoInput onSubmit={addTodo} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statsText: {
    fontSize: 14,
    opacity: 0.6,
  },
  clearText: {
    fontSize: 14,
    fontWeight: '500',
  },
  list: {
    flexGrow: 1,
    paddingTop: 8,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.5,
  },
});
