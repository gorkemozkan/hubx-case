import { ReactNode, useCallback, useRef } from 'react';
import { Dimensions, FlatList, View } from 'react-native';

interface Props<T> {
  items: T[];
  itemWidth?: number;
  spacing?: number;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
}

const { width: screenWidth } = Dimensions.get('window');

function CommonCarousel<T>({
  itemWidth = screenWidth,
  spacing = 0,
  initialIndex = 0,
  keyExtractor,
  ...props
}: Props<T>) {
  const flatListRef = useRef<FlatList>(null);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const getItemLayout = useCallback(
    (_: ArrayLike<T> | null | undefined, index: number) => ({
      length: itemWidth + spacing,
      offset: (itemWidth + spacing) * index,
      index,
    }),
    [itemWidth, spacing]
  );

  const renderCarouselItem = useCallback(
    ({ item, index }: { item: T; index: number }) => (
      <View
        style={{
          width: itemWidth,
          marginRight: index < props.items.length - 1 ? spacing : 0,
        }}
      >
        {props.renderItem(item, index)}
      </View>
    ),
    [itemWidth, spacing, props.items.length, props.renderItem]
  );

  if (props.items.length === 0) {
    return null;
  }

  return (
    <FlatList
      horizontal
      ref={flatListRef}
      data={props.items}
      renderItem={renderCarouselItem}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={false}
      snapToInterval={itemWidth + spacing}
      snapToAlignment="start"
      decelerationRate="fast"
      viewabilityConfig={viewabilityConfig}
      getItemLayout={getItemLayout}
      initialScrollIndex={initialIndex}
      contentContainerStyle={{
        paddingRight: spacing,
      }}
    />
  );
}

export default CommonCarousel;
