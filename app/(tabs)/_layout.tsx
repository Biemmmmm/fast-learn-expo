import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLanguage } from '@/contexts/language-context';

export default function TabLayout() {
  const brandBlue = useThemeColor({}, 'brandBlue');
  const tabIconDefault = useThemeColor({}, 'tabIconDefault');
  const surfaceContainerLow = useThemeColor({}, 'surfaceContainerLow');
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: brandBlue,
        tabBarInactiveTintColor: tabIconDefault,
        tabBarStyle: {
          backgroundColor: surfaceContainerLow + 'cc',
          borderTopWidth: 1,
          borderTopColor: 'rgba(198,198,198,0.2)',
          elevation: 0,
          shadowOpacity: 0,
          paddingTop: 4,
          paddingBottom: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.input'),
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="edit-note"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: t('tabs.library'),
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="inventory-2"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="settings"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
