import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeCampaignBadge from '@/src/screens/Home/components/HomeCampaignBadge';
import HomeCategoriesList from '@/src/screens/Home/components/HomeCategoriesList';
import HomeHeader from '@/src/screens/Home/components/HomeHeader';
import HomeQuestionsCarousel from '@/src/screens/Home/components/HomeQuestionsCarousel';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <HomeHeader />
      <ScrollView showsVerticalScrollIndicator={false} onScrollBeginDrag={() => Keyboard.dismiss()}>
        <View style={styles.campaignBadgeContainer}>
          <HomeCampaignBadge />
        </View>
        <View style={styles.questionsCarouselContainer}>
          <HomeQuestionsCarousel />
        </View>
        <View style={styles.categoriesListContainer}>
          <HomeCategoriesList />
        </View>
      </ScrollView>
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
  categoriesListContainer: {
    padding: 24,
    flex: 1,
  },
  questionsCarouselContainer: {
    paddingLeft: 24,
  },
});

export default HomeScreen;
