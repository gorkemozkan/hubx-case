import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import UiButton from '@/src/components/ui/UiButton';
import { SemanticColors, Spacing, Typography } from '@/src/theme';

export interface Props {
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  style?: ViewStyle;
  compact?: boolean;
}

const UiErrorState: FC<Props> = ({
  message = 'Something went wrong',
  onRetry,
  retryText = 'Try Again',
  style,
  compact = false,
}) => {
  const containerStyles: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    padding: compact ? Spacing.md : Spacing.lg,
  };

  if (compact) {
    return (
      <View style={[containerStyles, style]}>
        <Text style={styles.compactMessage}>{message}</Text>
        {onRetry && (
          <TouchableOpacity
            onPress={onRetry}
            style={styles.compactRetryButton}
            accessibilityRole="button"
            accessibilityLabel={retryText}
          >
            <Text style={styles.compactRetryText}>{retryText}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={[containerStyles, style]}>
      <View style={styles.errorIcon}>
        <Text style={styles.errorIconText}>!</Text>
      </View>
      <Text style={styles.errorTitle}>Oops!</Text>
      <Text style={styles.errorMessage}>{message}</Text>
      {onRetry && <UiButton title={retryText} onPress={onRetry} style={styles.retryButton} />}
    </View>
  );
};

const styles = StyleSheet.create({
  errorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: SemanticColors.error,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  errorIconText: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily: Typography.rubik.semiBold,
    color: SemanticColors.textInverse,
  },
  errorTitle: {
    textAlign: 'center',
    marginBottom: Spacing.sm,
    fontSize: 20,
    lineHeight: 26,
    fontFamily: Typography.rubik.semiBold,
    color: SemanticColors.text,
  },
  errorMessage: {
    textAlign: 'center',
    marginBottom: Spacing.lg,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Typography.rubik.regular,
    color: SemanticColors.textSecondary,
  },
  retryButton: {
    minWidth: 120,
  },
  compactMessage: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Typography.rubik.regular,
    color: SemanticColors.error,
  },
  compactRetryButton: {
    marginTop: Spacing.sm,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  compactRetryText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Typography.rubik.regular,
    color: SemanticColors.link,
  },
});

export default UiErrorState;
