import { ImageProps as ExpoImageProps, Image } from 'expo-image';
import { FC, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import { SemanticColors } from '@/src/theme';

export interface Props {
  width?: number;
  height?: number;
  style?: ViewStyle;
  blurHash?: string;
  aspectRatio?: number;
  skeletonColor?: string;
  showSkeleton?: boolean;
  previewUrl?: string | null;
  accessibilityLabel?: string;
  placeholder?: string | number;
  source: ExpoImageProps['source'];
  contentFit?: ExpoImageProps['contentFit'];
  cachePolicy?: ExpoImageProps['cachePolicy'];
}

const UiImage: FC<Props> = ({
  contentFit = 'cover',
  showSkeleton = false,
  skeletonColor = SemanticColors.surfaceAlt,
  cachePolicy = 'memory-disk',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [hasError, setHasError] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const getDimensions = (): { width?: number; height?: number; aspectRatio?: number } => {
    if (props.width && props.height) {
      return { width: props.width, height: props.height };
    }
    if (props.aspectRatio) {
      return { aspectRatio: props.aspectRatio };
    }
    return { width: props.width, height: props.height };
  };

  const dimensions = getDimensions();

  const imageStyle: ViewStyle = {
    ...dimensions,
    backgroundColor: showSkeleton ? skeletonColor : 'transparent',
    ...props.style,
  };

  if (hasError && props.placeholder) {
    return (
      <View style={imageStyle}>
        <Image source={props.placeholder} style={styles.image} contentFit={contentFit} />
      </View>
    );
  }

  const placeholderSource = props.previewUrl
    ? { uri: props.previewUrl }
    : props.placeholder
      ? props.placeholder
      : props.blurHash
        ? { blurhash: props.blurHash }
        : undefined;

  return (
    <View style={imageStyle}>
      <Image
        transition={300}
        style={styles.image}
        source={props.source}
        onError={handleError}
        contentFit={contentFit}
        onLoadEnd={handleLoadEnd}
        cachePolicy={cachePolicy}
        accessibilityRole="image"
        onLoadStart={handleLoadStart}
        placeholder={placeholderSource}
        accessibilityLabel={props.accessibilityLabel}
      />
      {isLoading && showSkeleton && (
        <View style={styles.skeleton}>
          <ActivityIndicator size="small" color={SemanticColors.textSecondary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  skeleton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: SemanticColors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UiImage;
