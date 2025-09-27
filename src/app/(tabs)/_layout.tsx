import { Tabs } from 'expo-router';
import CustomTabBar from '@/src/components/tab/CustomTabBar';

const TabLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="diagnose"
        options={{
          title: 'Diagnose',
        }}
      />
      <Tabs.Screen
        name="my-garden"
        options={{
          title: 'My Garden',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
