import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { Session, SessionCategory } from '@/types/session';

interface SessionCardProps {
  session: Session;
  onPress?: () => void;
}

const categoryConfig: Record<SessionCategory, { bgKey: string; textKey: string }> = {
  '研究': { bgKey: 'tertiaryContainer', textKey: 'tertiary' },
  '编程': { bgKey: 'secondaryContainer', textKey: 'secondary' },
  '策略': { bgKey: 'primaryContainer', textKey: 'primary' },
  '写作': { bgKey: 'surfaceContainerHighest', textKey: 'onSurfaceVariant' },
  '战略': { bgKey: 'primaryContainer', textKey: 'primary' },
};

export function SessionCard({ session, onPress }: SessionCardProps) {
  const surfaceContainerLowest = useThemeColor({}, 'surfaceContainerLowest');
  const surfaceContainerLow = useThemeColor({}, 'surfaceContainerLow');
  const surfaceContainerHigh = useThemeColor({}, 'surfaceContainerHigh');
  const onSurface = useThemeColor({}, 'onSurface');
  const onSurfaceVariant = useThemeColor({}, 'onSurfaceVariant');
  const outline = useThemeColor({}, 'outline');
  const secondary = useThemeColor({}, 'secondary');

  const config = categoryConfig[session.category] || categoryConfig['研究'];
  const bgColor = useThemeColor({}, config.bgKey as 'tertiaryContainer');
  const textColor = useThemeColor({}, config.textKey as 'tertiary');

  const timeText = getTimeAgo(session.createdAt);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: session.status === 'draft' ? surfaceContainerLow : surfaceContainerLowest,
          opacity: session.status === 'draft' ? 0.7 : 1,
        },
        pressed && { backgroundColor: surfaceContainerHigh },
      ]}>
      <View style={styles.cardInner}>
        <View style={styles.topRow}>
          <View style={styles.badges}>
            <View style={[styles.categoryBadge, { backgroundColor: bgColor + '30' }]}>
              <Text style={[styles.categoryText, { color: textColor }]}>{session.category}</Text>
            </View>
            {session.status === 'draft' && (
              <View style={[styles.draftBadge, { backgroundColor: surfaceContainerHigh }]}>
                <Text style={[styles.draftText, { color: onSurfaceVariant }]}>
                  {session.category === '研究' ? '草稿' : 'Draft'}
                </Text>
              </View>
            )}
          </View>
          <Text style={[styles.timeText, { color: outline }]}>{timeText}</Text>
        </View>

        <Text
          style={[styles.title, { color: onSurface }]}
          numberOfLines={2}>
          {session.title}
        </Text>

        {session.status !== 'draft' && session.insights && (
          <View style={styles.footer}>
            <MaterialIcons name="schema" size={18} color={outline} />
            <Text style={[styles.footerText, { color: onSurfaceVariant }]}>{session.insights}</Text>
          </View>
        )}

        {session.status !== 'draft' && session.clarityScore !== null && (
          <View style={styles.scoreRow}>
            <Text style={[styles.scoreValue, { color: secondary }]}>
              {session.clarityScore}
              <Text style={[styles.scoreMax, { color: onSurfaceVariant }]}>/100</Text>
            </Text>
            <Text style={[styles.scoreLabel, { color: onSurfaceVariant }]}>
              清晰度得分
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

function getTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) return '刚刚';
  if (hours < 24) return `${hours}小时前`;
  if (days === 1) return '昨天';
  return `${days}天前`;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 20,
  },
  cardInner: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  draftBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  draftText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  timeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    paddingTop: 12,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
  },
  scoreRow: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: '900',
  },
  scoreMax: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.6,
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
