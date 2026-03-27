import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLanguage } from '@/contexts/language-context';
import { ClarityGauge } from '@/components/clearer/clarity-gauge';
import { GradientButton } from '@/components/clearer/gradient-button';

interface MissingItem {
  id: string;
  title: string;
  detail: string;
  status: 'identified' | 'missing' | 'undefined';
}

const missingItems: MissingItem[] = [
  {
    id: 'goal',
    title: '主要目标',
    detail: '已识别：技术债务减少 (20%) + 速度维持。',
    status: 'identified',
  },
  {
    id: 'constraints',
    title: '约束条件',
    detail: '缺失：预算限制、人数限制或具体的 Q3 截止日期。',
    status: 'missing',
  },
  {
    id: 'output',
    title: '目标输出规格',
    detail: '未定义：应如何向利益相关者展示解决方案？',
    status: 'undefined',
  },
];

const outputFormats = [
  '可执行提示词',
  '决策分析',
  '结构化规格',
  '执行摘要',
];

export default function ClarifyScreen() {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useLanguage();

  const surfaceContainerLow = useThemeColor({}, 'surfaceContainerLow');
  const surfaceContainer = useThemeColor({}, 'surfaceContainer');
  const surfaceContainerLowest = useThemeColor({}, 'surfaceContainerLowest');
  const surfaceContainerHighest = useThemeColor({}, 'surfaceContainerHighest');
  const onSurface = useThemeColor({}, 'onSurface');
  const onSurfaceVariant = useThemeColor({}, 'onSurfaceVariant');
  const secondary = useThemeColor({}, 'secondary');
  const secondaryContainer = useThemeColor({}, 'secondaryContainer');
  const onSecondaryContainer = useThemeColor({}, 'onSecondaryContainer');
  const outlineVariant = useThemeColor({}, 'outlineVariant');
  const error = useThemeColor({}, 'error');

  const getStatusIcon = (status: MissingItem['status']) => {
    switch (status) {
      case 'identified':
        return <MaterialIcons name="check-circle" size={14} color={secondary} />;
      case 'missing':
        return <MaterialIcons name="warning" size={14} color="#d97706" />;
      case 'undefined':
        return <MaterialIcons name="priority-high" size={14} color={error} />;
    }
  };

  const getStatusBg = (status: MissingItem['status']) => {
    switch (status) {
      case 'identified':
        return secondary + '20';
      case 'missing':
        return '#d9770620';
      case 'undefined':
        return error + '20';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Problem Definition Card */}
        <View
          style={[
            styles.problemCard,
            {
              backgroundColor: surfaceContainerLow,
              borderLeftColor: secondary,
            },
          ]}>
          <Text style={[styles.problemLabel, { color: onSurfaceVariant }]}>
            {t('clarify.currentDefinition')}
          </Text>
          <Text style={[styles.problemTitle, { color: onSurface }]}>
            优化软件工程部门的季度资源分配，在保持功能交付速度的同时，将技术债务减少 20%。
          </Text>
          <Text style={[styles.problemNote, { color: onSurfaceVariant, opacity: 0.8 }]}>
            {t('clarify.modifiedFrom')}：&ldquo;修复 Q3 的工程速度和技术债务问题。&rdquo;
          </Text>
        </View>

        {/* Clarity Score */}
        <View style={[styles.scoreCard, { backgroundColor: surfaceContainer }]}>
          <ClarityGauge score={42} size={120} strokeWidth={8} />
          <Text style={[styles.scoreTitle, { color: onSurface }]}>
            {t('clarify.clarityScore')}
          </Text>
          <Text style={[styles.scoreDesc, { color: onSurfaceVariant }]}>
            已识别基础逻辑。输出约束中仍存在结构性缺口。
          </Text>
        </View>

        {/* Missing Components Audit */}
        <View style={styles.auditSection}>
          <View style={styles.auditHeader}>
            <MaterialIcons name="list-alt" size={16} color={onSurfaceVariant} />
            <Text style={[styles.auditTitle, { color: onSurfaceVariant }]}>
              {t('clarify.missingAudit')}
            </Text>
          </View>
          <View style={styles.auditList}>
            {missingItems.map((item, idx) => (
              <View
                key={item.id}
                style={[
                  styles.auditItem,
                  {
                    backgroundColor: surfaceContainerLowest,
                  },
                ]}>
                <View
                  style={[
                    styles.statusIcon,
                    { backgroundColor: getStatusBg(item.status) },
                  ]}>
                  {getStatusIcon(item.status)}
                </View>
                <View>
                  <Text
                    style={[
                      styles.auditItemTitle,
                      { color: item.status === 'undefined' ? error : onSurface },
                    ]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.auditItemDetail, { color: onSurfaceVariant }]}>
                    {item.detail}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Follow-up Section */}
        <View
          style={[
            styles.followUpCard,
            {
              backgroundColor: surfaceContainerLowest,
              borderColor: outlineVariant + '30',
            },
          ]}>
          <View
            style={[
              styles.stepBadge,
              { backgroundColor: secondaryContainer },
            ]}>
            <Text style={[styles.stepBadgeText, { color: onSecondaryContainer }]}>
              {t('clarify.keyStep')}
            </Text>
          </View>
          <Text style={[styles.followUpTitle, { color: onSurface }]}>
            您需要的主要输出格式是什么？
          </Text>
          <View style={styles.formatOptions}>
            {outputFormats.map((format) => (
              <Pressable
                key={format}
                onPress={() => setSelectedFormat(format)}
                style={({ pressed }) => [
                  styles.formatOption,
                  {
                    backgroundColor:
                      selectedFormat === format ? secondary + '15' : surfaceContainerHighest,
                    borderColor: selectedFormat === format ? secondary + '40' : 'transparent',
                  },
                ]}>
                <Text
                  style={[
                    styles.formatText,
                    {
                      color:
                        selectedFormat === format ? secondary : onSurface,
                    },
                  ]}>
                  {format}
                </Text>
              </Pressable>
            ))}
          </View>
          <View
            style={[
              styles.followUpFooter,
              {
                borderTopColor: outlineVariant + '20',
              },
            ]}>
            <GradientButton
              label={t('clarify.confirmChoice')}
              onPress={() => router.push('/spec')}
            />
            <Pressable
              style={styles.assumptionRow}
              onPress={() => router.push('/spec')}>
              <Text style={[styles.assumptionText, { color: onSurfaceVariant }]}>
                {t('clarify.useAssumption')}
              </Text>
              <MaterialIcons name="fast-forward" size={16} color={onSurfaceVariant} />
            </Pressable>
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
  problemCard: {
    padding: 20,
    borderRadius: 6,
    borderLeftWidth: 4,
    marginBottom: 24,
  },
  problemLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  problemTitle: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  problemNote: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 16,
  },
  scoreCard: {
    padding: 28,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: 20,
  },
  scoreDesc: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 4,
    textAlign: 'center',
  },
  auditSection: {
    marginBottom: 24,
  },
  auditHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  auditTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  auditList: {
    gap: 4,
  },
  auditItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    padding: 16,
    marginBottom: 4,
  },
  statusIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  auditItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  auditItemDetail: {
    fontSize: 12,
    lineHeight: 18,
  },
  followUpCard: {
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
  },
  stepBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  stepBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  followUpTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 20,
  },
  formatOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  formatOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  formatText: {
    fontSize: 14,
    fontWeight: '600',
  },
  followUpFooter: {
    flexDirection: 'column',
    gap: 16,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  assumptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  assumptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
