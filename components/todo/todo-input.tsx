import { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLanguage } from '@/contexts/language-context';

interface TodoInputProps {
  onSubmit: (text: string) => void;
}

export function TodoInput({ onSubmit }: TodoInputProps) {
  const [text, setText] = useState('');
  const { t } = useLanguage();
  const tintColor = useThemeColor({}, 'tint');

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setText('');
      Keyboard.dismiss();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={t('todo.placeholder')}
          placeholderTextColor="#687076"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
        <Pressable
          onPress={handleSubmit}
          disabled={!text.trim()}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: tintColor },
            pressed && styles.buttonPressed,
            !text.trim() && styles.buttonDisabled,
          ]}
        >
          <ThemedText style={styles.buttonText}>{t('todo.add')}</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.05)',
    fontSize: 16,
    color: '#11181C',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
