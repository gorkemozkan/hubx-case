import { LinearGradient } from 'expo-linear-gradient';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CommonGridView from '@/src/components/common/CommonGridView';
import UiEmptyState from '@/src/components/ui/UiEmptyState';
import UiErrorState from '@/src/components/ui/UiErrorState';
import UiImage from '@/src/components/ui/UiImage';
import UiSkeletonGrid from '@/src/components/ui/UiSkeletonGrid';
import { useGetCategoriesQuery } from '@/src/services/categories';
import { Colors, getColorWithOpacity, SemanticColors, Typography } from '@/src/theme';

const HomeCategoriesList: FC = () => {
  const { data, isLoading, error, refetch } = useGetCategoriesQuery();

  if (isLoading) {
    return <UiSkeletonGrid numColumns={2} numRows={3} itemSpacing={16} rowSpacing={11} />;
  }

  if (error) {
    return (
      <UiErrorState
        message="Failed to load plant categories"
        onRetry={refetch}
        retryText="Retry"
        compact
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <UiEmptyState
        title="No plant categories available"
        message="Categories will appear here when they're added to the system."
        onAction={refetch}
        actionText="Refresh"
        compact
      />
    );
  }

  return (
    <CommonGridView
      scrollEnabled={false}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      itemSpacing={16}
      renderItem={({ item }) => (
        <View
          style={styles.itemContainer}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${item.title} plant category`}
          accessibilityHint="Tap to explore this plant category"
        >
          <LinearGradient
            locations={[1, 0]}
            end={{ x: 0, y: 0 }}
            start={{ x: 1, y: 1 }}
            style={styles.gradient}
            colors={[Colors.white, Colors['sage-50']]}
          />
          <Text style={styles.title} accessibilityRole="text" accessibilityLabel={item.title}>
            {item.title.split(' ').length === 2 ? item.title.split(' ').join('\n') : item.title}
          </Text>
          {item.image && (
            <UiImage
              source={{ uri: item.image.url }}
              previewUrl={item.image.previewUrl}
              style={styles.plantImage}
              width={item.image.width}
              height={item.image.height}
              contentFit="cover"
              accessibilityLabel={item.image.alternativeText || `${item.title} plant image`}
            />
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.32,
    color: SemanticColors.text,
    fontFamily: Typography.rubik.medium,
  },
  gradient: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  itemContainer: {
    padding: 16,
    height: 152,
    minHeight: 80,
    borderWidth: 0.5,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderColor: getColorWithOpacity(Colors['gray-700'], 10),
    marginBottom: 11,
  },
  plantImage: {
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default HomeCategoriesList;
