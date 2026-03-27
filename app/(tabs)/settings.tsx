import { Pressable, View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLanguage } from '@/contexts/language-context';

export default function SettingsScreen() {
  const { language, t } = useLanguage();

  const surfaceContainerLow = useThemeColor({}, 'surfaceContainerLow');
  const surfaceContainer = useThemeColor({}, 'surfaceContainer');
  const surfaceContainerHigh = useThemeColor({}, 'surfaceContainerHigh');
  const surfaceContainerHighest = useThemeColor({}, 'surfaceContainerHighest');
  const onSurface = useThemeColor({}, 'onSurface');
  const onSurfaceVariant = useThemeColor({}, 'onSurfaceVariant');
  const secondary = useThemeColor({}, 'secondary');
  const secondaryContainer = useThemeColor({}, 'secondaryContainer');
  const outlineVariant = useThemeColor({}, 'outlineVariant');
  const error = useThemeColor({}, 'error');

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Page Title */}
        <View style={styles.header}>
          <Text style={[styles.pageTitle, { color: onSurface }]}>
            {t('settings.title')}
          </Text>
          <Text style={[styles.pageSubtitle, { color: onSurfaceVariant }]}>
            {t('settings.subtitle')}
          </Text>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: onSurfaceVariant }]}>
            {t('settings.preferences')}
          </Text>
          <View style={styles.sectionList}>
            {/* Language */}
            <Pressable
              style={({ pressed }) => [
                styles.settingItem,
                { backgroundColor: pressed ? surfaceContainer : surfaceContainerLow },
              ]}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: surfaceContainerHighest }]}>
                  <MaterialIcons name="language" size={20} color={secondary} />
                </View>
                <View>
                  <Text style={[styles.settingLabel, { color: onSurface }]}>
                    {t('settings.language')}
                  </Text>
                  <Text style={[styles.settingDesc, { color: onSurfaceVariant }]}>
                    {t('settings.languageDesc')}
                  </Text>
                </View>
              </View>
              <View style={styles.settingRight}>
                <View
                  style={[
                    styles.langBadge,
                    { backgroundColor: secondaryContainer + '40' },
                  ]}>
                  <Text
                    style={[
                      styles.langBadgeText,
                      { color: secondary },
                    ]}>
                    {language === 'zh' ? '简体中文' : 'English'}
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color={outlineVariant} />
              </View>
            </Pressable>

            {/* Appearance */}
            <Pressable
              style={({ pressed }) => [
                styles.settingItem,
                { backgroundColor: pressed ? surfaceContainer : surfaceContainerLow },
              ]}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: surfaceContainerHighest }]}>
                  <MaterialIcons name="dark-mode" size={20} color={onSurfaceVariant} />
                </View>
                <View>
                  <Text style={[styles.settingLabel, { color: onSurface }]}>
                    {t('settings.appearance')}
                  </Text>
                  <Text style={[styles.settingDesc, { color: onSurfaceVariant }]}>
                    {t('settings.appearanceDesc')}
                  </Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={outlineVariant} />
            </Pressable>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: onSurfaceVariant }]}>
            {t('settings.account')}
          </Text>
          <View style={[styles.accountCard, { backgroundColor: surfaceContainerLow }]}>
            {/* Profile */}
            <View style={styles.profileRow}>
              <View style={styles.avatarContainer}>
                <View style={[styles.avatar, { backgroundColor: surfaceContainerHigh }]}>
                  <MaterialIcons name="person" size={32} color={onSurfaceVariant} />
                </View>
                <View style={[styles.onlineDot, { backgroundColor: secondary }]} />
              </View>
              <View>
                <Text style={[styles.profileName, { color: onSurface }]}>李明</Text>
                <Text style={[styles.profileEmail, { color: onSurfaceVariant }]}>
                  liming.analytical@clearer.ai
                </Text>
                <View style={styles.planBadge}>
                  <Text style={styles.planText}>PRO PLAN</Text>
                </View>
              </View>
            </View>
            {/* Account Actions */}
            <View style={styles.accountActions}>
              <Pressable
                style={({ pressed }) => [
                  styles.accountAction,
                  pressed && { backgroundColor: surfaceContainer },
                ]}>
                <MaterialIcons name="person-outline" size={20} color={onSurfaceVariant} />
                <Text style={[styles.accountActionText, { color: onSurface }]}>
                  {t('settings.editProfile')}
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.accountAction,
                  pressed && { backgroundColor: surfaceContainer },
                ]}>
                <MaterialIcons name="security" size={20} color={onSurfaceVariant} />
                <Text style={[styles.accountActionText, { color: onSurface }]}>
                  {t('settings.securityPassword')}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: onSurfaceVariant }]}>
            {t('settings.about')}
          </Text>
          <View style={styles.aboutList}>
            <View style={[styles.aboutItem, { backgroundColor: surfaceContainerLow }]}>
              <Text style={[styles.aboutLabel, { color: onSurface }]}>
                {t('settings.version')}
              </Text>
              <Text style={[styles.aboutValue, { color: outlineVariant }]}>v2.4.0-stable</Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.aboutItem,
                { backgroundColor: pressed ? surfaceContainer : surfaceContainerLow },
              ]}>
              <Text style={[styles.aboutLabel, { color: onSurface }]}>
                {t('settings.terms')}
              </Text>
              <MaterialIcons name="open-in-new" size={18} color={outlineVariant} />
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.aboutItem,
                { backgroundColor: pressed ? surfaceContainer : surfaceContainerLow },
              ]}>
              <Text style={[styles.signOutText, { color: error }]}>
                {t('settings.signOut')}
              </Text>
              <MaterialIcons name="logout" size={20} color={error} />
            </Pressable>
          </View>
        </View>

        {/* Footer Tagline */}
        <View style={styles.footer}>
          <View style={[styles.footerLine, { backgroundColor: secondary + '40' }]} />
          <Text style={[styles.footerText, { color: onSurfaceVariant }]}>
            {t('settings.tagline')}
          </Text>
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
    marginBottom: 32,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionList: {
    gap: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  langBadgeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  accountCard: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#f2f4f6',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191c1e',
  },
  profileEmail: {
    fontSize: 14,
    color: '#474747',
    marginTop: 2,
  },
  planBadge: {
    marginTop: 8,
    backgroundColor: '#000000',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  planText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  accountActions: {
    padding: 8,
    gap: 4,
  },
  accountAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
  },
  accountActionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  aboutList: {
    gap: 4,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  aboutLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  aboutValue: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  signOutText: {
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    marginTop: 48,
    alignItems: 'center',
    paddingTop: 32,
  },
  footerLine: {
    width: 48,
    height: 2,
    marginBottom: 20,
    borderRadius: 1,
  },
  footerText: {
    fontSize: 10,
    letterSpacing: 4,
    textTransform: 'uppercase',
    opacity: 0.5,
  },
});
