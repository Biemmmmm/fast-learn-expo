import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLanguage } from '@/contexts/language-context';
import type { FilterType } from '@/types/todo';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: FilterType[] = ['all', 'active', 'completed'];

export function TodoFilter({ currentFilter, onFilterChange }: TodoFilterProps) {
  const { t } = useLanguage();
  const tintColor = useThemeColor({}, 'tint');

  return (
    <ThemedView style={styles.container}>
      {filters.map((filter) => (
        <Pressable
          key={filter}
          onPress={() => onFilterChange(filter)}
          style={({ pressed }) => [
            styles.filterButton,
            currentFilter === filter && [
              styles.filterButtonActive,
              { backgroundColor: tintColor },
            ],
            pressed && styles.filterButtonPressed,
          ]}
        >
          <ThemedText
            style={[
              styles.filterText,
              currentFilter === filter && styles.filterTextActive,
            ]}
          >
            {t(`todo.filter.${filter}`)}
          </ThemedText>
        </Pressable>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterButtonActive: {
    backgroundColor: '#0a7ea4',
  },
  filterButtonPressed: {
    opacity: 0.8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
});
