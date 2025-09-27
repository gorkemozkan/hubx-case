import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, FlatListProps, Text, View } from 'react-native';
import UiEmptyState from '@/src/components/ui/UiEmptyState';
import UiErrorState from '@/src/components/ui/UiErrorState';
import UiSkeletonGrid from '@/src/components/ui/UiSkeletonGrid';
import { Colors, Typography } from '@/src/theme';
import type { PaginationMeta } from '@/src/types';

export interface InfinityFlatListData<T> {
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
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
  pageSize?: number;
  transformData?: (data: T[]) => T[];
  emptyStateProps?: {
    title?: string;
    message?: string;
    actionText?: string;
  };
  errorStateProps?: {
    message?: string;
    retryText?: string;
  };
  skeletonProps?: {
    numColumns?: number;
    numRows?: number;
    itemSpacing?: number;
    rowSpacing?: number;
  };
  showLoadMoreButton?: boolean;
  loadMoreText?: string;
  onEndReachedThreshold?: number;
}

function useInfinityListState<T>(
  data: InfinityFlatListData<T> | undefined,
  page: number,
  setPage: (page: number | ((prev: number) => number)) => void,
  refetch: () => void
) {
  const [allItems, setAllItems] = useState<T[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setAllItems(data.data);
      } else {
        setAllItems((prev) => [...prev, ...data.data]);
      }
      setHasMoreData(page < data.meta.pagination.pageCount);
    }
  }, [data, page]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    setAllItems([]);
    setHasMoreData(true);
    refetch();
  }, [refetch, setPage]);

  return {
    allItems,
    hasMoreData,
    handleRefresh,
  };
}

function useInfinityListActions<T>(
  data: InfinityFlatListData<T> | undefined,
  page: number,
  setPage: (page: number | ((prev: number) => number)) => void,
  hasMoreData: boolean,
  isFetching: boolean,
  isLoading: boolean,
  showLoadMoreButton: boolean
) {
  const hasNextPage = hasMoreData && data ? page < data.meta.pagination.pageCount : false;
  const isLoadingMore = isFetching && !isLoading;

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isLoadingMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasNextPage, isLoadingMore, setPage]);

  const handleEndReached = useCallback(() => {
    if (!showLoadMoreButton) {
      handleLoadMore();
    }
  }, [handleLoadMore, showLoadMoreButton]);

  return {
    hasNextPage,
    isLoadingMore,
    handleLoadMore,
    handleEndReached,
  };
}

function InfinityFlatListContent<T extends { id?: number | string }>({
  data,
  allItems,
  transformData,
  hasNextPage,
  isLoadingMore,
  handleLoadMore,
  handleEndReached,
  showLoadMoreButton,
  loadMoreText,
  renderItem,
  keyExtractor,
  onEndReachedThreshold,
  ...flatListProps
}: {
  data?: InfinityFlatListData<T>;
  allItems: T[];
  transformData?: (data: T[]) => T[];
  hasNextPage: boolean;
  isLoadingMore: boolean;
  handleLoadMore: () => void;
  handleEndReached: () => void;
  showLoadMoreButton?: boolean;
  loadMoreText?: string;
  renderItem: FlatListProps<T>['renderItem'];
  keyExtractor?: FlatListProps<T>['keyExtractor'];
  onEndReachedThreshold?: number;
} & Omit<
  FlatListProps<T>,
  'data' | 'onEndReached' | 'ListFooterComponent' | 'renderItem' | 'keyExtractor'
>) {
  const processedData = transformData ? transformData(allItems) : allItems;

  const renderFooter = () => {
    if (isLoadingMore) {
      return (
        <View style={footerStyles.loadingMore}>
          <ActivityIndicator size="small" color={Colors['sage-500']} />
        </View>
      );
    }

    if (hasNextPage && showLoadMoreButton) {
      return (
        <View style={footerStyles.loadMoreButton}>
          <Text
            style={footerStyles.loadMoreText}
            onPress={handleLoadMore}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Load more ${loadMoreText?.toLowerCase() || 'items'}`}
          >
            {loadMoreText || 'Load More'}
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
      onEndReached={hasNextPage ? handleEndReached : undefined}
      onEndReachedThreshold={onEndReachedThreshold}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={6}
      updateCellsBatchingPeriod={50}
      {...flatListProps}
    />
  );
}

function CommonInfinityFlatList<T extends { id?: number | string }>({
  data,
  isLoading,
  error,
  isFetching,
  refetch,
  page,
  setPage,
  pageSize = 25,
  transformData,
  emptyStateProps,
  errorStateProps,
  skeletonProps,
  showLoadMoreButton = false,
  loadMoreText = 'Load More',
  onEndReachedThreshold = 0.1,
  renderItem,
  keyExtractor,
  ...flatListProps
}: Props<T>) {
  const { allItems, hasMoreData, handleRefresh } = useInfinityListState(
    data,
    page,
    setPage,
    refetch
  );

  const { hasNextPage, isLoadingMore, handleLoadMore, handleEndReached } = useInfinityListActions(
    data,
    page,
    setPage,
    hasMoreData,
    isFetching,
    isLoading,
    showLoadMoreButton
  );

  if (isLoading && page === 1) {
    return (
      <UiSkeletonGrid
        numColumns={skeletonProps?.numColumns || 2}
        numRows={skeletonProps?.numRows || 3}
        itemSpacing={skeletonProps?.itemSpacing || 16}
        rowSpacing={skeletonProps?.rowSpacing || 11}
      />
    );
  }

  if (error) {
    return (
      <UiErrorState
        message={errorStateProps?.message || 'Failed to load data'}
        onRetry={handleRefresh}
        retryText={errorStateProps?.retryText || 'Retry'}
        compact
      />
    );
  }

  if (!data || allItems.length === 0) {
    return (
      <UiEmptyState
        title={emptyStateProps?.title || 'No data available'}
        message={emptyStateProps?.message || 'Data will appear here when available.'}
        onAction={handleRefresh}
        actionText={emptyStateProps?.actionText || 'Refresh'}
        compact
      />
    );
  }

  return (
    <InfinityFlatListContent
      data={data}
      allItems={allItems}
      transformData={transformData}
      hasNextPage={hasNextPage}
      isLoadingMore={isLoadingMore}
      handleLoadMore={handleLoadMore}
      handleEndReached={handleEndReached}
      showLoadMoreButton={showLoadMoreButton}
      loadMoreText={loadMoreText}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={onEndReachedThreshold}
      {...flatListProps}
    />
  );
}

const footerStyles = {
  loadingMore: {
    paddingVertical: 16,
    alignItems: 'center' as const,
  },
  loadMoreButton: {
    paddingVertical: 16,
    alignItems: 'center' as const,
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
    textAlign: 'center' as const,
  },
};

export default CommonInfinityFlatList;
