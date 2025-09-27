import { FC } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import UiSkeleton from '@/src/components/ui/UiSkeleton';
import { SemanticColors, Spacing } from '@/src/theme';

export interface Props {
  itemWidth?: number;
  itemHeight?: number;
  itemSpacing?: number;
  numItems?: number;
  style?: ViewStyle;
}

const UiSkeletonCarousel: FC<Props> = ({
  itemWidth = 240,
  itemHeight = 164,
  itemSpacing = 16,
  numItems = 3,
  style,
}) => {
  const renderSkeletonItem = (index: number) => (
    <View
      key={index}
      style={[
        styles.skeletonItem,
        {
          width: itemWidth,
          height: itemHeight,
          marginRight: index < numItems - 1 ? itemSpacing : 0,
        },
      ]}
    >
      <UiSkeleton width="100%" height="70%" borderRadius={0} />

      <View style={styles.skeletonOverlay}>
        <UiSkeleton width="80%" height={16} borderRadius={4} style={styles.skeletonTitle} />
        <UiSkeleton width="60%" height={12} borderRadius={4} />
      </View>
    </View>
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      style={style}
    >
      {Array.from({ length: numItems }, (_, index) => renderSkeletonItem(index))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  skeletonItem: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    backgroundColor: SemanticColors.surface,
  },
  skeletonOverlay: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: Spacing.md,
    position: 'absolute',
    backgroundColor: 'rgba(15, 12, 12, 0.3)',
  },
  skeletonTitle: {
    marginBottom: Spacing.xs,
  },
  scrollContainer: {
    paddingHorizontal: Spacing.md,
  },
});

export default UiSkeletonCarousel;
