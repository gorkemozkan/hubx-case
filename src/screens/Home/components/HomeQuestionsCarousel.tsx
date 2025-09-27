import { Image } from 'expo-image';
import { FC, memo, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CommonCarousel from '@/src/components/common/CommonCarousel';
import UiEmptyState from '@/src/components/ui/UiEmptyState';
import UiErrorState from '@/src/components/ui/UiErrorState';
import UiSkeletonCarousel from '@/src/components/ui/UiSkeletonCarousel';
import { useGetQuestionsQuery } from '@/src/services/questions';
import { SemanticColors, Spacing, Typography } from '@/src/theme';
import type { Question } from '@/src/types';
import { openUrl } from '@/src/utils/url';

const ITEM_WIDTH = 240;
const ITEM_HEIGHT = 164;
const ITEM_SPACING = Spacing.md;

interface QuestionItemProps {
  question: Question;
}

const QuestionItem: FC<QuestionItemProps> = memo((props) => {
  const handlePress = async () => {
    await openUrl(props.question.uri);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.questionItem}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`Question: ${props.question.title}`}
      accessibilityHint="Tap to open in browser"
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: props.question.image_uri,
          }}
          style={styles.questionImage}
          contentFit="cover"
          transition={200}
          placeholder="📸"
          placeholderContentFit="cover"
        />
        <View style={styles.blurOverlay}>
          <Text style={styles.questionTitleText} numberOfLines={2} ellipsizeMode="tail">
            {props.question.title || 'Untitled Question'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const HomeQuestionsCarousel: FC = () => {
  const { data, isLoading, error, refetch } = useGetQuestionsQuery();

  const renderQuestionItem = useCallback(
    (question: Question) => <QuestionItem question={question} />,
    []
  );

  if (isLoading) {
    return (
      <UiSkeletonCarousel
        numItems={3}
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
        itemSpacing={ITEM_SPACING}
      />
    );
  }

  if (error) {
    return (
      <UiErrorState
        compact
        onRetry={refetch}
        retryText="Retry"
        message="Failed to load questions"
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <UiEmptyState
        compact
        onAction={refetch}
        actionText="Refresh"
        title="No questions available"
        message="Questions will appear here when they're added to the system."
      />
    );
  }

  return (
    <View>
      <Text style={styles.title}>Get Started</Text>
      <CommonCarousel
        items={data}
        itemWidth={ITEM_WIDTH}
        spacing={ITEM_SPACING}
        renderItem={renderQuestionItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    fontFamily: Typography.rubik.medium,
    marginBottom: 16,
  },
  questionItem: {
    borderRadius: 12,
    width: ITEM_WIDTH,
    overflow: 'hidden',
    shadowColor: '#000',
    height: ITEM_HEIGHT,
    backgroundColor: SemanticColors.surface,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  questionImage: {
    width: '100%',
    height: '100%',
  },
  blurOverlay: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: Spacing.md,
    position: 'absolute',
  },
  questionTitle: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'left',
    fontFamily: Typography.rubik.medium,
  },
  questionTitleText: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    fontFamily: Typography.rubik.medium,
    color: SemanticColors.textInverse,
  },
  emptyText: {
    textAlign: 'center',
    padding: Spacing.lg,
    color: SemanticColors.textSecondary,
  },
});

export default HomeQuestionsCarousel;
