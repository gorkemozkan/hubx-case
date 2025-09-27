import { LinearGradient } from 'expo-linear-gradient';
import { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import UiSkeleton from '@/src/components/ui/UiSkeleton';
import { Colors, getColorWithOpacity, Spacing } from '@/src/theme';

export interface Props {
  numColumns?: number;
  numRows?: number;
  itemSpacing?: number;
  rowSpacing?: number;
  style?: ViewStyle;
}

const UiSkeletonGrid: FC<Props> = ({
  numColumns = 2,
  numRows = 3,
  itemSpacing = 16,
  rowSpacing = 11,
  style,
}) => {
  const renderSkeletonItem = (index: number) => (
    <View
      key={index}
      style={[
        styles.skeletonItem,
        {
          marginHorizontal: itemSpacing / 2,
          marginBottom: rowSpacing,
        },
      ]}
    >
      <LinearGradient
        locations={[1, 0]}
        end={{ x: 0, y: 0 }}
        start={{ x: 1, y: 1 }}
        style={styles.gradient}
        colors={[Colors.white, Colors['sage-50']]}
      />

      <View style={styles.skeletonContent}>
        <UiSkeleton width={100} height={16} borderRadius={4} style={styles.skeletonTitle} />
        <UiSkeleton width={60} height={12} borderRadius={4} />
      </View>

      <View style={styles.skeletonImage}>
        <UiSkeleton width="100%" height="100%" borderRadius={4} />
      </View>
    </View>
  );

  const renderRow = (rowIndex: number) => (
    <View
      key={rowIndex}
      style={[
        styles.row,
        {
          marginHorizontal: -itemSpacing / 2,
        },
      ]}
    >
      {Array.from({ length: numColumns }, (_, colIndex) =>
        renderSkeletonItem(rowIndex * numColumns + colIndex)
      )}
    </View>
  );

  return (
    <View style={style}>{Array.from({ length: numRows }, (_, index) => renderRow(index))}</View>
  );
};

const styles = StyleSheet.create({
  skeletonItem: {
    flex: 1,
    height: 152,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: getColorWithOpacity(Colors['gray-700'], 10),
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  skeletonContent: {
    padding: Spacing.md,
  },
  skeletonTitle: {
    marginBottom: Spacing.xs,
  },
  skeletonImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '60%',
    height: '60%',
  },
  row: {
    flexDirection: 'row',
  },
});

export default UiSkeletonGrid;
