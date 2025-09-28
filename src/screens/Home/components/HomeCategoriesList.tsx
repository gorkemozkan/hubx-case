import { LinearGradient } from 'expo-linear-gradient';
import { FC, ReactNode, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CommonInfinityFlatList from '@/src/components/common/CommonInfinityFlatList';
import UiImage from '@/src/components/ui/UiImage';
import { useGetCategoriesQuery } from '@/src/services/categories';
import { Colors, getColorWithOpacity, SemanticColors, Typography } from '@/src/theme';
import type { Category } from '@/src/types';

interface Props {
  onScrollBeginDrag?: () => void;
  renderHeader?: () => ReactNode;
}

const HomeCategoriesList: FC<Props> = (props) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch, isFetching } = useGetCategoriesQuery({
    page,
    pageSize: 25,
  });

  const transformData = (categories: Category[]) => {
    const data = [...categories];
    if (data.length % 2 !== 0) {
      data.push({} as Category);
    }
    return data;
  };

  const renderCategory = ({ item }: { item: Category; index: number }) => {
    if (!item.id) {
      return <View style={styles.emptyItem} />;
    }

    return (
      <View style={styles.itemContainer}>
        <LinearGradient
          locations={[1, 0]}
          end={{ x: 0, y: 0 }}
          start={{ x: 1, y: 1 }}
          style={styles.gradient}
          colors={[Colors.white, Colors['sage-50']]}
        />
        <Text style={styles.title}>
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
    );
  };

  return (
    <CommonInfinityFlatList
      data={data}
      isLoading={isLoading}
      error={error}
      isFetching={isFetching}
      refetch={refetch}
      page={page}
      setPage={setPage}
      transformData={transformData}
      renderItem={renderCategory}
      keyExtractor={(item, index) => (item.id ? item.id.toString() : `empty-${index}`)}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.flatListContainer}
      ListHeaderComponent={props.renderHeader}
      showsVerticalScrollIndicator={false}
      onScrollBeginDrag={props.onScrollBeginDrag}
      onEndReachedThreshold={0.1}
      getItemLayout={undefined}
      emptyTitle="No plant categories available"
      emptyMessage="Categories will appear here when they're added to the system."
      errorMessage="Failed to load plant categories"
      showLoadMoreButton={false}
      loadMoreText="Load More"
      skeletonColumns={2}
      skeletonRows={3}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingBottom: 16,
  },

  categoriesHeaderContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  categoriesTitle: {
    fontSize: 24,
    fontFamily: Typography.rubik.bold,
    color: SemanticColors.text,
    marginBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
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
    flex: 1,
    marginHorizontal: 8,
  },
  plantImage: {
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  emptyItem: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default HomeCategoriesList;
