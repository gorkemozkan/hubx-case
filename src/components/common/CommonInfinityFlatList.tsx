import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, FlatListProps, StyleSheet, Text, View } from 'react-native';
import UiEmptyState from '@/src/components/ui/UiEmptyState';
import UiErrorState from '@/src/components/ui/UiErrorState';
import UiSkeletonGrid from '@/src/components/ui/UiSkeletonGrid';
import { Colors, Typography } from '@/src/theme';
import type { PaginationMeta } from '@/src/types';

export interface InfinityFlatListData<T> {
  data: T[];
  meta: { pagination: PaginationMeta };
}

export interface Props<T>
  extends Omit<FlatListProps<T>, 'data' | 'onEndReached' | 'ListFooterComponent'> {
  data?: InfinityFlatListData<T>;
  isLoading: boolean;
  error: unknown;
  isFetching: boolean;
  refetch: () => void;
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  transformData?: (data: T[]) => T[];
  emptyTitle?: string;
  emptyMessage?: string;
  errorMessage?: string;
  showLoadMoreButton?: boolean;
  loadMoreText?: string;
  skeletonColumns?: number;
  skeletonRows?: number;
}

const useInfinityList = <T,>(
  data: InfinityFlatListData<T> | undefined,
  page: number,
  setPage: (page: number | ((prev: number) => number)) => void,
  refetch: () => void,
  isFetching: boolean,
  isLoading: boolean,
  showLoadMoreButton: boolean
) => {
  const [allItems, setAllItems] = useState<T[]>([]);

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setAllItems(data.data);
      } else {
        setAllItems((prev) => [...prev, ...data.data]);
      }
    }
  }, [data, page]);

  const hasNextPage = data ? page < data.meta.pagination.pageCount : false;

  const isLoadingMore = isFetching && !isLoading;

  const handleRefresh = useCallback(() => {
    setPage(1);
    setAllItems([]);
    refetch();
  }, [refetch, setPage]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isLoadingMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasNextPage, isLoadingMore, setPage]);

  const handleEndReached = useCallback(() => {
    if (!showLoadMoreButton && hasNextPage) {
      handleLoadMore();
    }
  }, [handleLoadMore, showLoadMoreButton, hasNextPage]);

  return {
    allItems,
    hasNextPage,
    isLoadingMore,
    handleRefresh,
    handleLoadMore,
    handleEndReached,
  };
};

const CommonInfinityFlatList = <T extends { id?: number | string }>({
  data,
  isLoading,
  error,
  isFetching,
  refetch,
  page,
  setPage,
  transformData,
  emptyTitle = 'No data available',
  emptyMessage = 'Data will appear here when available.',
  errorMessage = 'Failed to load data',
  showLoadMoreButton = false,
  loadMoreText = 'Load More',
  skeletonColumns = 2,
  skeletonRows = 3,
  renderItem,
  keyExtractor,
  onEndReachedThreshold = 0.1,
  ...flatListProps
}: Props<T>) => {
  const { allItems, hasNextPage, isLoadingMore, handleRefresh, handleLoadMore, handleEndReached } =
    useInfinityList(data, page, setPage, refetch, isFetching, isLoading, showLoadMoreButton);

  if (isLoading && page === 1) {
    return (
      <UiSkeletonGrid
        numColumns={skeletonColumns}
        numRows={skeletonRows}
        itemSpacing={16}
        rowSpacing={11}
      />
    );
  }

  if (error) {
    return (
      <UiErrorState message={errorMessage} onRetry={handleRefresh} retryText="Retry" compact />
    );
  }

  if (!data || allItems.length === 0) {
    return (
      <UiEmptyState
        compact
        title={emptyTitle}
        message={emptyMessage}
        onAction={handleRefresh}
        actionText="Refresh"
      />
    );
  }

  const processedData = transformData ? transformData(allItems) : allItems;

  const renderFooter = () => {
    if (isLoadingMore) {
      return (
        <View style={styles.loadingMore}>
          <ActivityIndicator size="small" color={Colors['sage-500']} />
        </View>
      );
    }

    if (hasNextPage && showLoadMoreButton) {
      return (
        <View style={styles.loadMoreButton}>
          <Text
            style={styles.loadMoreText}
            onPress={handleLoadMore}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Load more ${loadMoreText.toLowerCase()}`}
          >
            {loadMoreText}
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <FlatList
      data={processedData}
      renderItem={renderItem}
      keyExtractor={
        keyExtractor || ((item, index) => (item.id ? item.id.toString() : `item-${index}`))
      }
      ListFooterComponent={renderFooter}
      onEndReached={handleEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={6}
      updateCellsBatchingPeriod={50}
      {...flatListProps}
    />
  );
};

const styles = StyleSheet.create({
  loadingMore: {
    paddingVertical: 16,
    textAlign: 'center',
  },
  loadMoreButton: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loadMoreText: {
    fontSize: 16,
    fontFamily: Typography.rubik.medium,
    color: Colors['sage-700'],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors['sage-200'],
    backgroundColor: Colors['sage-50'],
    textAlign: 'center',
  },
});

export default CommonInfinityFlatList;
