import { Pressable, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLanguage } from '@/contexts/language-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { Language } from '@/types/todo';

const languages: { code: Language; label: string }[] = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
];

export default function SettingsScreen() {
  const { language, setLanguage, t } = useLanguage();
  const tintColor = useThemeColor({}, 'tint');

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.header}>
          {t('settings.title')}
        </ThemedText>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {t('settings.language.title')}
          </ThemedText>
          <ThemedText style={styles.sectionDescription}>
            {t('settings.language.description')}
          </ThemedText>

          <ThemedView style={styles.options}>
            {languages.map((lang) => (
              <Pressable
                key={lang.code}
                onPress={() => setLanguage(lang.code)}
                style={({ pressed }) => [
                  styles.option,
                  pressed && styles.optionPressed,
                ]}
              >
                <ThemedText style={styles.optionLabel}>{lang.label}</ThemedText>
                {language === lang.code && (
                  <IconSymbol name="checkmark.circle.fill" size={24} color={tintColor} />
                )}
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {t('settings.about.title')}
          </ThemedText>
          <ThemedText style={styles.version}>
            {t('settings.about.version')}
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  sectionDescription: {
    opacity: 0.6,
    marginBottom: 12,
  },
  options: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  optionPressed: {
    opacity: 0.7,
  },
  optionLabel: {
    fontSize: 16,
  },
  version: {
    opacity: 0.6,
  },
});
