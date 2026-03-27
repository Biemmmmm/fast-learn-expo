import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLanguage } from '@/contexts/language-context';
import { SessionCard } from '@/components/clearer/session-card';
import { FilterChip } from '@/components/clearer/filter-chip';
import type { Session } from '@/types/session';

// Demo library data
const demoSessions: Session[] = [
  {
    id: '1',
    title: '量化微交互对移动金融应用用户留存的影响。',
    originalInput: '我需要了解微小的动画是否真的能让用户在应用上停留更久……',
    category: '研究',
    clarityScore: 98,
    status: 'completed',
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    insights: '已提取 6 个见解',
    isStarred: true,
  },
  {
    id: '2',
    title: '为 OAuth2.0 重构遗留的身份验证中间件。',
    originalInput: '当前的验证逻辑很混乱，我想更新它以使用 OAuth 2.0……',
    category: '编程',
    clarityScore: null,
    status: 'draft',
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    isStarred: false,
  },
  {
    id: '3',
    title: '东南亚订阅制教育平台的市场准入分析。',
    originalInput: '我们该如何在东南亚推出我们的学校软件？……',
    category: '策略',
    clarityScore: 84,
    status: 'completed',
    createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
    insights: '已提取 3 个见解',
    isStarred: false,
  },
  {
    id: '4',
    title: '定义初级保健中人工智能辅助医疗诊断的伦理边界。',
    originalInput: '医生使用人工智能的规则是什么？……',
    category: '研究',
    clarityScore: 92,
    status: 'completed',
    createdAt: Date.now() - 12 * 24 * 60 * 60 * 1000,
    insights: '已提取 5 个见解',
    isStarred: true,
  },
];

type FilterType = 'all' | 'draft' | 'completed' | 'starred';

export default function LibraryScreen() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const { t } = useLanguage();

  const surfaceContainerLow = useThemeColor({}, 'surfaceContainerLow');
  const surfaceContainerHigh = useThemeColor({}, 'surfaceContainerHigh');
  const onSurface = useThemeColor({}, 'onSurface');
  const onSurfaceVariant = useThemeColor({}, 'onSurfaceVariant');
  const secondary = useThemeColor({}, 'secondary');
  const secondaryContainer = useThemeColor({}, 'secondaryContainer');
  const outlineVariant = useThemeColor({}, 'outlineVariant');
  const tertiary = useThemeColor({}, 'tertiary');

  const filteredSessions = demoSessions.filter((s) => {
    if (filter === 'draft') return s.status === 'draft';
    if (filter === 'completed') return s.status === 'completed';
    if (filter === 'starred') return s.isStarred;
    if (searchText) {
      return s.title.includes(searchText) || s.originalInput.includes(searchText);
    }
    return true;
  });

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('library.filterAll') },
    { key: 'draft', label: t('library.filterDraft') },
    { key: 'completed', label: t('library.filterCompleted') },
    { key: 'starred', label: t('library.filterStarred') },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={[styles.pageTitle, { color: onSurface }]}>
          {t('library.title')}
        </Text>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <View style={[styles.searchContainer, { backgroundColor: surfaceContainerLow }]}>
            <MaterialIcons name="search" size={20} color={outlineVariant} />
            <TextInput
              style={[styles.searchInput, { color: onSurface }]}
              placeholder={t('library.searchPlaceholder')}
              placeholderTextColor={onSurfaceVariant}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}>
          {filters.map((f) => (
            <FilterChip
              key={f.key}
              label={f.label}
              isActive={filter === f.key}
              onPress={() => setFilter(f.key)}
            />
          ))}
        </ScrollView>

        {/* Library List */}
        <View style={styles.sessionList}>
          {filteredSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onPress={() => router.push('/spec')}
            />
          ))}
        </View>

        {/* Insights Section */}
        <View style={styles.insightsSection}>
          <View style={[styles.knowledgeCard, { backgroundColor: surfaceContainerLow }]}>
            <View style={[styles.knowledgeIcon, { backgroundColor: surfaceContainerHigh }]}>
              <MaterialIcons name="auto-stories" size={28} color={outlineVariant} />
            </View>
            <Text style={[styles.knowledgeTitle, { color: onSurface }]}>
              {t('library.buildKnowledge')}
            </Text>
            <Text style={[styles.knowledgeDesc, { color: onSurfaceVariant }]}>
              {t('library.buildKnowledgeDesc')}
            </Text>
          </View>

          <View style={styles.insightsRight}>
            <View
              style={[
                styles.insightCard,
                {
                  backgroundColor: secondaryContainer + '20',
                  borderColor: secondary + '20',
                },
              ]}>
              <Text style={[styles.insightTitle, { color: secondary }]}>
                {t('library.libraryInsights')}
              </Text>
              <Text style={[styles.insightText, { color: onSurface }]}>
                {t('library.avgImproved')} <Text style={{ fontWeight: '900' }}>12%</Text>
              </Text>
              {/* Progress bar */}
              <View style={[styles.progressBar, { backgroundColor: surfaceContainerHigh }]}>
                <View style={[styles.progressFill, { backgroundColor: secondary, width: '72%' }]} />
              </View>
            </View>

            <View style={[styles.activeAreaCard, { backgroundColor: surfaceContainerHigh }]}>
              <Text style={[styles.activeAreaTitle, { color: onSurfaceVariant }]}>
                {t('library.mostActive')}
              </Text>
              <View style={styles.activeAreaContent}>
                <MaterialIcons name="biotech" size={22} color={tertiary} />
                <Text style={[styles.activeAreaLabel, { color: onSurface }]}>研究</Text>
              </View>
            </View>
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
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 24,
  },
  searchWrapper: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterScroll: {
    marginBottom: 24,
  },
  filterContent: {
    gap: 8,
    paddingRight: 20,
  },
  sessionList: {
    gap: 12,
  },
  insightsSection: {
    marginTop: 32,
    gap: 16,
  },
  knowledgeCard: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  knowledgeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  knowledgeTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  knowledgeDesc: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  insightsRight: {
    gap: 16,
  },
  insightCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  insightTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  insightText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  activeAreaCard: {
    borderRadius: 16,
    padding: 20,
  },
  activeAreaTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  activeAreaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activeAreaLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
});
