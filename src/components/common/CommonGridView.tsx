import { ReactElement } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View, ViewStyle } from 'react-native';

export interface GridItemProps<T> {
  item: T;
  index: number;
}

export interface Props<T> {
  data: T[];
  style?: ViewStyle;
  numColumns: number;
  itemSpacing?: number;
  scrollEnabled?: boolean;
  keyExtractor: (item: T, index: number) => string;
  renderItem: (props: GridItemProps<T>) => ReactElement;
}

const CommonGridView = <T,>(props: Props<T>) => {
  const { numColumns, itemSpacing = 16 } = props;

  const dataWithPlaceholders = (): (T | null)[] => {
    const data: (T | null)[] = [...props.data];
    const remainder = data.length % numColumns;
    if (remainder !== 0) {
      const placeholdersNeeded = numColumns - remainder;
      for (let i = 0; i < placeholdersNeeded; i++) {
        data.push(null);
      }
    }
    return data;
  };

  const renderItem: ListRenderItem<T | null> = ({ item, index }) => {
    const isLastInRow = (index + 1) % numColumns === 0;

    if (item === null) {
      return <View style={[styles.item, { marginRight: isLastInRow ? 0 : itemSpacing }]} />;
    }

    return (
      <View style={[styles.item, { marginRight: isLastInRow ? 0 : itemSpacing }]}>
        {props.renderItem({ item, index })}
      </View>
    );
  };

  return (
    <FlatList
      data={dataWithPlaceholders()}
      renderItem={renderItem}
      keyExtractor={(item, index) =>
        item === null ? `i-${index}` : props.keyExtractor(item, index)
      }
      numColumns={numColumns}
      style={props.style}
      scrollEnabled={props.scrollEnabled}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
});

export default CommonGridView;
