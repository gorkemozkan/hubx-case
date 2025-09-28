import { FC } from 'react';
import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native';
import UiSkeleton from '@/src/components/ui/UiSkeleton';
import { SemanticColors, Spacing, Typography } from '@/src/theme';

export interface Props {
  itemWidth?: number;
  itemHeight?: number;
  itemSpacing?: number;
  numItems?: number;
  style?: ViewStyle;
  showTitle?: boolean;
  title?: string;
}

const UiSkeletonCarousel: FC<Props> = ({
  itemWidth = 240,
  itemHeight = 164,
  itemSpacing = 16,
  numItems = 3,
  style,
  showTitle = true,
  title = 'Get Started',
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
    <View style={style}>
      {showTitle && (
        <Text style={styles.title}>{title}</Text>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {Array.from({ length: numItems }, (_, index) => renderSkeletonItem(index))}
      </ScrollView>
    </View>
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
    paddingRight: Spacing.md,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    fontFamily: Typography.rubik.medium,
    marginBottom: 16,
  },
});

export default UiSkeletonCarousel;
