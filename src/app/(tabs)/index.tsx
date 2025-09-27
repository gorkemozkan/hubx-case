import { Keyboard, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeCampaignBadge from '@/src/screens/Home/components/HomeCampaignBadge';
import HomeCategoriesList from '@/src/screens/Home/components/HomeCategoriesList';
import HomeHeader from '@/src/screens/Home/components/HomeHeader';
import HomeQuestionsCarousel from '@/src/screens/Home/components/HomeQuestionsCarousel';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <HomeHeader />
      <HomeCategoriesList
        onScrollBeginDrag={() => Keyboard.dismiss()}
        renderHeader={() => (
          <View style={styles.headerContainer}>
            <View style={styles.campaignBadgeContainer}>
              <HomeCampaignBadge />
            </View>
            <View style={styles.questionsCarouselContainer}>
              <HomeQuestionsCarousel />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  campaignBadgeContainer: {
    padding: 24,
  },
  questionsCarouselContainer: {
    paddingLeft: 24,
  },
  headerContainer: {
    marginBottom: 24,
  },
});

export default HomeScreen;
