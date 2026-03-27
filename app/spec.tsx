import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLanguage } from '@/contexts/language-context';
import { ClarityGauge } from '@/components/clearer/clarity-gauge';
import { Accordion } from '@/components/clearer/accordion';
import { GradientButton } from '@/components/clearer/gradient-button';

export default function SpecScreen() {
  const { t } = useLanguage();

  const surfaceContainerLow = useThemeColor({}, 'surfaceContainerLow');
  const surfaceContainer = useThemeColor({}, 'surfaceContainer');
  const surfaceContainerLowest = useThemeColor({}, 'surfaceContainerLowest');
  const onSurface = useThemeColor({}, 'onSurface');
  const onSurfaceVariant = useThemeColor({}, 'onSurfaceVariant');
  const secondary = useThemeColor({}, 'secondary');
  const secondaryContainer = useThemeColor({}, 'secondaryContainer');
  const onSecondaryContainer = useThemeColor({}, 'onSecondaryContainer');
  const inverseSurface = useThemeColor({}, 'inverseSurface');
  const inverseOnSurface = useThemeColor({}, 'inverseOnSurface');
  const outlineVariant = useThemeColor({}, 'outlineVariant');

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.verifiedBadge,
                { backgroundColor: secondaryContainer },
              ]}>
              <Text style={[styles.verifiedText, { color: onSecondaryContainer }]}>
                {t('spec.verified')}
              </Text>
            </View>
            <Text style={[styles.pageTitle, { color: onSurface }]}>
              {t('spec.problemDefined')}
            </Text>
            <Text style={[styles.pageSubtitle, { color: onSurfaceVariant }]}>
              {t('spec.specSubtitle')}
            </Text>
          </View>
          {/* Clarity Score Bento */}
          <View
            style={[
              styles.scoreBento,
              {
                backgroundColor: surfaceContainerLowest,
                borderColor: outlineVariant + '20',
              },
            ]}>
            <ClarityGauge score={100} size={72} strokeWidth={6} />
            <View>
              <Text style={[styles.scoreBentoLabel, { color: onSurfaceVariant }]}>
                {t('spec.clarityScore')}
              </Text>
              <Text style={[styles.scoreBentoValue, { color: secondary }]}>
                {t('spec.idealSpec')}
              </Text>
              <View style={styles.scoreDots}>
                <View style={[styles.scoreDot, { backgroundColor: secondary }]} />
                <View style={[styles.scoreDot, { backgroundColor: secondary }]} />
                <View style={[styles.scoreDot, { backgroundColor: secondary }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Final Specification (Dark Card) */}
        <LinearGradient
          colors={[inverseSurface, inverseSurface]}
          style={styles.specCard}>
          {/* Terminal Header */}
          <View style={styles.terminalHeader}>
            <View style={styles.terminalDots}>
              <View style={[styles.dot, styles.dotRed]} />
              <View style={[styles.dot, styles.dotYellow]} />
              <View style={[styles.dot, styles.dotGreen]} />
            </View>
            <Text style={styles.terminalFilename}>
              final_specification_v1.0.md
            </Text>
            <Pressable style={styles.copyButton}>
              <MaterialIcons name="content-copy" size={14} color="#ffffff90" />
              <Text style={styles.copyText}>{t('spec.copyToClipboard')}</Text>
            </Pressable>
          </View>
          {/* Code Content */}
          <View style={styles.codeContent}>
            <Text style={[styles.codeLine, { color: secondary }]}>
              # 角色: 高级架构设计师
            </Text>
            <Text style={[styles.codeLine, { color: inverseOnSurface }]}>
              目标: 为精密分析工具设计模块化 UI 系统，优先考虑高密度信息而非装饰性留白。
            </Text>
            <Text style={[styles.codeLine, styles.codeComment, { color: inverseOnSurface + '60' }]}>
              -- 约束条件 --
            </Text>
            <Text style={[styles.codeLine, { color: inverseOnSurface }]}>
              - 颜色: 单色基础，配以 #006C4A 点缀。
            </Text>
            <Text style={[styles.codeLine, { color: inverseOnSurface }]}>
              - 字体: UI 使用 Inter，技术数据使用 JetBrains Mono。
            </Text>
            <Text style={[styles.codeLine, { color: inverseOnSurface }]}>
              - 几何: 圆角 0.25rem (严谨精密)。
            </Text>
            <Text style={[styles.codeLine, styles.codeComment, { color: inverseOnSurface + '60' }]}>
              -- 预期输出 --
            </Text>
            <Text style={[styles.codeLine, { color: inverseOnSurface }]}>
              生成干净、响应式的 HTML/Tailwind 骨架，利用&ldquo;色调堆叠&rdquo;而非显式边框。
            </Text>
            <Text style={[styles.codeLine, styles.codeComment, { color: inverseOnSurface + '30' }]}>
              {/* 规范结束 */}
            </Text>
          </View>
        </LinearGradient>

        {/* Structured Breakdown */}
        <View style={styles.breakdownSection}>
          <View style={styles.breakdownHeader}>
            <Text style={[styles.breakdownTitle, { color: onSurfaceVariant }]}>
              {t('spec.structuredBreakdown')}
            </Text>
            <View style={[styles.breakdownLine, { backgroundColor: outlineVariant + '20' }]} />
          </View>
          <Accordion
            title="1. 核心目标"
            isHighlighted>
            建立一种视觉语言，传达精密性、可靠性和分析深度，同时在所有现代浏览器引擎中保持极致性能。
          </Accordion>
          <Accordion title="2. 约束与边界情况">
            {null}
          </Accordion>
          <Accordion title="3. 技术输出规范">
            {null}
          </Accordion>
        </View>

        {/* Model Recommendation */}
        <View
          style={[
            styles.modelCard,
            {
              backgroundColor: surfaceContainer,
              borderColor: outlineVariant + '20',
            },
          ]}>
          <View style={styles.modelHeader}>
            <MaterialIcons name="psychology" size={20} color={secondary} />
            <Text style={[styles.modelTitle, { color: onSurface }]}>
              {t('spec.downstreamRoute')}
            </Text>
          </View>

          {/* Recommended Model */}
          <Pressable
            style={[
              styles.modelItem,
              {
                backgroundColor: surfaceContainerLowest,
                borderColor: secondary + '30',
              },
            ]}>
            <View style={styles.modelLeft}>
              <View style={[styles.modelAvatar, { backgroundColor: '#111827' }]}>
                <Text style={styles.modelAvatarText}>AI</Text>
              </View>
              <View>
                <Text style={[styles.modelName, { color: onSurface }]}>
                  Claude 3.5 Sonnet
                </Text>
                <Text style={[styles.modelRole, { color: onSurfaceVariant }]}>
                  {t('spec.recommendedModel')}
                </Text>
              </View>
            </View>
            <MaterialIcons name="check-circle" size={20} color={secondary} />
          </Pressable>

          {/* Alternative Model */}
          <View
            style={[
              styles.modelItem,
              {
                backgroundColor: surfaceContainerLow + '80',
                opacity: 0.6,
              },
            ]}>
            <View style={styles.modelLeft}>
              <View style={[styles.modelAvatar, { backgroundColor: '#064e3b' }]}>
                <Text style={styles.modelAvatarText}>GPT</Text>
              </View>
              <View>
                <Text style={[styles.modelName, { color: onSurface }]}>
                  ChatGPT-4o
                </Text>
                <Text style={[styles.modelRole, { color: onSurfaceVariant }]}>
                  {t('spec.alternativePath')}
                </Text>
              </View>
            </View>
          </View>

          {/* Expert Tip */}
          <View
            style={[
              styles.tipBox,
              {
                backgroundColor: secondary + '08',
                borderColor: secondary + '30',
              },
            ]}>
            <Text style={[styles.tipText, { color: secondary }]}>
              <Text style={{ fontWeight: '700' }}>{t('spec.expertTip')}:</Text> 该提示词结构已针对 XML 标签解析和长上下文理解进行优化。
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <GradientButton
            label={t('spec.exportFigma')}
            icon="ios-share"
            fullWidth
          />
          <GradientButton
            label={t('spec.redefine')}
            icon="refresh"
            variant="secondary"
            fullWidth
          />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 16,
    flexWrap: 'wrap',
  },
  headerLeft: {
    flex: 1,
    minWidth: 200,
  },
  verifiedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    letterSpacing: -0.8,
  },
  pageSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  scoreBento: {
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
  },
  scoreBentoLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  scoreBentoValue: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  scoreDots: {
    flexDirection: 'row',
    gap: 4,
  },
  scoreDot: {
    width: 16,
    height: 4,
    borderRadius: 2,
  },
  specCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  terminalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  terminalDots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotRed: { backgroundColor: 'rgba(239,68,68,0.3)' },
  dotYellow: { backgroundColor: 'rgba(245,158,11,0.3)' },
  dotGreen: { backgroundColor: 'rgba(34,197,94,0.3)' },
  terminalFilename: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    flex: 1,
    textAlign: 'center',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  copyText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
  },
  codeContent: {
    padding: 20,
  },
  codeLine: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 22,
    marginBottom: 4,
  },
  codeComment: {
    opacity: 0.6,
  },
  breakdownSection: {
    marginBottom: 24,
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  breakdownTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  breakdownLine: {
    flex: 1,
    height: 1,
  },
  modelCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  modelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  modelTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  modelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  modelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  modelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelAvatarText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#ffffff',
  },
  modelName: {
    fontSize: 14,
    fontWeight: '700',
  },
  modelRole: {
    fontSize: 10,
    letterSpacing: -0.5,
    textTransform: 'uppercase',
    marginTop: 1,
  },
  tipBox: {
    marginTop: 24,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  tipText: {
    fontSize: 11,
    lineHeight: 18,
  },
  actions: {
    gap: 12,
  },
});
