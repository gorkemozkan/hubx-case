import { useRouter } from 'expo-router';
import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';
import { Folders, HealthCare, Leaf, Profile, Scan } from '@/src/components/icons';
import { Colors, SemanticColors, Typography } from '@/src/theme';
import { triggerHaptic } from '@/src/utils/haptic';

interface TabItem {
  name: string;
  title: string;
  icon: FC<SvgProps>;
  route: string;
}

interface NavigationState {
  index: number;
  routes: { name: string; key: string }[];
}

interface CustomTabBarProps {
  state: NavigationState;
}

const CustomTabBar: FC<CustomTabBarProps> = (props) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const tabs: TabItem[] = [
    { name: 'index', title: 'Home', icon: Folders, route: '/(tabs)/' },
    { name: 'diagnose', title: 'Diagnose', icon: HealthCare, route: '/(tabs)/diagnose' },
    { name: 'my-garden', title: 'My Garden', icon: Leaf, route: '/(tabs)/my-garden' },
    { name: 'profile', title: 'Profile', icon: Profile, route: '/(tabs)/profile' },
  ];

  const handleTabPress = (route: string) => {
    triggerHaptic('medium');
    router.push(route as never);
  };

  const handleCenterButtonPress = () => {
    triggerHaptic('medium');
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        <View style={styles.leftTabs}>
          {tabs.slice(0, 2).map((tab, index) => {
            const isFocused = props.state.index === index;
            return (
              <Pressable
                key={tab.name}
                onPress={() => handleTabPress(tab.route)}
                style={[styles.tabItem, isFocused && styles.activeTab]}
              >
                <tab.icon
                  width={25}
                  height={25}
                  fill={isFocused ? SemanticColors.primary : Colors['gray-500']}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isFocused ? styles.activeTabLabel : styles.inactiveTabLabel,
                  ]}
                >
                  {tab.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Pressable style={styles.centerButton} onPress={handleCenterButtonPress}>
          <Scan width={25} height={25} fill={Colors.white} />
        </Pressable>
        <View style={styles.rightTabs}>
          {tabs.slice(2).map((tab, index) => {
            const adjustedIndex = index + 2;
            const isFocused = props.state.index === adjustedIndex;
            return (
              <Pressable
                key={tab.name}
                onPress={() => handleTabPress(tab.route)}
                style={[styles.tabItem, isFocused && styles.activeTab]}
              >
                <tab.icon
                  width={25}
                  height={25}
                  fill={isFocused ? SemanticColors.primary : Colors['gray-500']}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isFocused ? styles.activeTabLabel : styles.inactiveTabLabel,
                  ]}
                >
                  {tab.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  tabBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftTabs: {
    flexDirection: 'row',
  },
  rightTabs: {
    flexDirection: 'row',
  },
  tabItem: {
    paddingVertical: 6,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  activeTab: {},
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
    letterSpacing: -0.24,
    fontFamily: Typography.rubik.regular,
  },
  centerButton: {
    top: -20,
    width: 64,
    height: 64,
    left: '50%',
    borderWidth: 4,
    marginLeft: -32,
    borderRadius: 32,
    position: 'absolute',
    alignItems: 'center',
    borderColor: '#45C888',
    justifyContent: 'center',
    backgroundColor: '#0DB262',
  },
  activeTabLabel: {
    color: SemanticColors.primary,
  },
  inactiveTabLabel: {
    color: Colors['gray-500'],
  },
});

export default CustomTabBar;
