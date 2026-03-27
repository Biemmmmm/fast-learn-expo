import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLanguage } from '@/contexts/language-context';
import { QuickActionChip } from '@/components/clearer/quick-action-chip';
import { SessionCard } from '@/components/clearer/session-card';
import type { Session } from '@/types/session';

// Demo sessions data
const demoSessions: Session[] = [
  {
    id: '1',
    title: '扩展实时数据流的分布式系统架构...',
    originalInput: '优化数据流处理管道，支持百万级并发。',
    category: '策略',
    clarityScore: 85,
    status: 'completed',
    createdAt: Date.now() - 2 * 60 * 60 * 1000,
    insights: '已提取 4 个见解',
    isStarred: false,
  },
  {
    id: '2',
    title: '再生农业 AI 工具的市场分析...',
    originalInput: '分析再生农业领域的 AI 应用前景。',
    category: '研究',
    clarityScore: 98,
    status: 'completed',
    createdAt: Date.now() - 24 * 60 * 60 * 1000,
    insights: '结构化简报已就绪',
    isStarred: false,
  },
  {
    id: '3',
    title: '将单体身份验证服务重构为 OIDC...',
    originalInput: '当前的验证逻辑很混乱，想用 OAuth 2.0 替换。',
    category: '编程',
    clarityScore: 72,
    status: 'completed',
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    insights: '已识别 12 个阻碍因素',
    isStarred: false,
  },
];

const categories: { icon: keyof typeof MaterialIcons.glyphMap; label: string }[] = [
  { icon: 'science', label: '研究' },
  { icon: 'terminal', label: '编程' },
  { icon: 'lightbulb', label: '策略' },
  { icon: 'edit-note', label: '写作' },
];

const methodologySteps = [
  '使用第一性原理逻辑，将模糊性解构为基本事实。',
  '绘制技术与业务约束之间的跨职能依赖图。',
  '生成一个结构化的问题陈述，在探讨"如何做"之前定义"做什么"。',
];

export default function InputScreen() {
  const [inputText, setInputText] = useState('');
  const router = useRouter();
  const { t } = useLanguage();

  const surfaceContainerLow = useThemeColor({}, 'surfaceContainerLow');
  const surfaceContainerLowest = useThemeColor({}, 'surfaceContainerLowest');
  const onSurface = useThemeColor({}, 'onSurface');
  const onSurfaceVariant = useThemeColor({}, 'onSurfaceVariant');
  const outline = useThemeColor({}, 'outline');
  const secondary = useThemeColor({}, 'secondary');
  const outlineVariant = useThemeColor({}, 'outlineVariant');

  const handleSubmit = () => {
    if (inputText.trim()) {
      router.push('/clarify');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroTextContainer}>
            <Text style={[styles.heroTitle, { color: onSurface }]}>
              {t('input.title')}
              <Text style={{ color: secondary }}>{t('input.titleHighlight')}</Text>
            </Text>
            <Text style={[styles.heroSubtitle, { color: onSurfaceVariant }]}>
              {t('input.subtitle')}
            </Text>
          </View>

          {/* Input Area */}
          <View style={styles.inputWrapper}>
            <View style={[styles.inputContainer, { backgroundColor: surfaceContainerLowest }]}>
              <TextInput
                style={[styles.textInput, { color: onSurface }]}
                placeholder={t('input.placeholder')}
                placeholderTextColor={outlineVariant}
                multiline
                textAlignVertical="top"
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleSubmit}
              />
              <View style={styles.inputFooter}>
                <View style={styles.enterHint}>
                  <MaterialIcons name="keyboard" size={14} color={outline} />
                  <Text style={[styles.enterHintText, { color: outline }]}>
                    {t('input.enterHint')}
                  </Text>
                </View>
                <Pressable onPress={handleSubmit}>
                  <View style={[styles.submitButton, { backgroundColor: secondary }]}>
                    <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Quick Action Chips */}
          <View style={styles.chipsRow}>
            <Text style={[styles.quickStartLabel, { color: onSurfaceVariant }]}>
              {t('input.quickStart')}
            </Text>
            <View style={styles.chipsContainer}>
              {categories.map((cat) => (
                <QuickActionChip
                  key={cat.label}
                  icon={cat.icon}
                  label={cat.label}
                  onPress={() => setInputText(`[${cat.label}] `)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Methodology Side Card (always visible on mobile) */}
        <View style={[styles.methodologyCard, { backgroundColor: surfaceContainerLow }]}>
          <View style={styles.methodologyHeader}>
            <View style={[styles.methodologyBar, { backgroundColor: secondary }]} />
            <Text style={[styles.methodologyTitle, { color: onSurface }]}>
              {t('input.methodology')}
            </Text>
          </View>
          <View style={styles.methodologyList}>
            {methodologySteps.map((step, i) => (
              <View key={i} style={styles.methodologyItem}>
                <Text style={[styles.stepNumber, { color: secondary }]}>
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <Text style={[styles.stepText, { color: onSurfaceVariant }]}>
                  {step}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Sessions Section */}
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <View>
              <Text style={[styles.archiveLabel, { color: secondary }]}>
                {t('input.archive')}
              </Text>
              <Text style={[styles.recentTitle, { color: onSurface }]}>
                {t('input.recentSessions')}
              </Text>
            </View>
            <Pressable onPress={() => router.push('/library')}>
              <Text style={[styles.viewLibraryText, { color: onSurfaceVariant }]}>
                {t('input.viewLibrary')}
              </Text>
            </Pressable>
          </View>

          <View style={styles.sessionGrid}>
            {demoSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onPress={() => router.push('/spec')}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  heroSection: {
    marginBottom: 32,
  },
  heroTextContainer: {
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 42,
    letterSpacing: -0.8,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 0,
    position: 'relative',
  },
  textInput: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 20,
    minHeight: 140,
    lineHeight: 26,
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  enterHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  enterHintText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  submitButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsRow: {
    paddingTop: 4,
  },
  quickStartLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  methodologyCard: {
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
  },
  methodologyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  methodologyBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  methodologyTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  methodologyList: {
    gap: 16,
  },
  methodologyItem: {
    flexDirection: 'row',
    gap: 16,
  },
  stepNumber: {
    fontSize: 14,
    fontFamily: 'monospace',
    width: 20,
  },
  stepText: {
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
  },
  recentSection: {
    marginBottom: 16,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(198,198,198,0.2)',
  },
  archiveLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  recentTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  viewLibraryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sessionGrid: {
    gap: 16,
    marginTop: 16,
  },
});
