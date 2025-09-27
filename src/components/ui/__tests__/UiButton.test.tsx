import { fireEvent, render } from '@testing-library/react-native';
import UiButton from '../UiButton';

jest.mock('@/src/utils/haptic', () => ({
  triggerHaptic: jest.fn(),
}));

describe('UiButton', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(<UiButton title="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(<UiButton title="Test Button" onPress={mockOnPress} />);

    fireEvent.press(getByRole('button'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('has correct accessibility role', () => {
    const { getByRole } = render(<UiButton title="Test Button" />);
    const button = getByRole('button');

    expect(button.props.accessibilityRole).toBe('button');
  });
});
