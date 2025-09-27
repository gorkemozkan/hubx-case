import { FC, ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import UiButton from '@/src/components/ui/UiButton';
import { SemanticColors, Spacing, Typography } from '@/src/theme';

export interface Props {
  title?: string;
  message?: string;
  illustration?: ReactNode;
  actionText?: string;
  onAction?: () => void;
  style?: ViewStyle;
  compact?: boolean;
  testID?: string;
}

const UiEmptyState: FC<Props> = ({
  title = 'Nothing here yet',
  message = 'When data is available, it will appear here.',
  illustration,
  actionText,
  onAction,
  style,
  compact = false,
  testID = 'empty-state',
}) => {
  const containerStyles: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    padding: compact ? Spacing.md : Spacing.xl,
    minHeight: compact ? 80 : 160,
  };

  if (compact) {
    return (
      <View style={[containerStyles, style]} testID={testID}>
        <Text style={styles.compactTitle}>{title}</Text>
        {message && <Text style={styles.compactMessage}>{message}</Text>}
        {onAction && actionText && (
          <UiButton title={actionText} onPress={onAction} style={styles.compactButton} />
        )}
      </View>
    );
  }

  return (
    <View style={[containerStyles, style]} testID={testID}>
      {illustration && <View style={styles.illustrationContainer}>{illustration}</View>}

      {!illustration && (
        <View style={styles.defaultIllustration}>
          <Text style={styles.defaultIllustrationEmoji}>📭</Text>
        </View>
      )}

      <Text style={styles.title}>{title}</Text>

      <Text style={[styles.message, { marginBottom: onAction ? Spacing.lg : 0 }]}>{message}</Text>

      {onAction && actionText && (
        <UiButton title={actionText} onPress={onAction} style={styles.actionButton} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  compactTitle: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    fontFamily: Typography.rubik.regular,
    color: SemanticColors.textSecondary,
  },
  compactMessage: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: Typography.rubik.regular,
    color: SemanticColors.textTertiary,
  },
  compactButton: {
    marginTop: Spacing.md,
  },
  illustrationContainer: {
    marginBottom: Spacing.lg,
  },
  defaultIllustration: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    backgroundColor: SemanticColors.backgroundSecondary,
  },
  defaultIllustrationEmoji: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: Typography.rubik.bold,
    color: SemanticColors.textSecondary,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 30,
    marginBottom: Spacing.sm,
    color: SemanticColors.text,
    fontFamily: Typography.rubik.semiBold,
  },
  message: {
    fontSize: 16,
    maxWidth: 280,
    lineHeight: 22,
    textAlign: 'center',
    color: SemanticColors.textSecondary,
    fontFamily: Typography.rubik.regular,
  },
  actionButton: {
    minWidth: 140,
  },
});

export default UiEmptyState;
