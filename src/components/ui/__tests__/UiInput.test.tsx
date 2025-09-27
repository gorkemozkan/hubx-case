import { fireEvent, render } from '@testing-library/react-native';
import UiInput from '../UiInput';

jest.mock('@/src/components/icons/Search', () => 'SearchIcon');

describe('UiInput', () => {
  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = render(<UiInput placeholder="Search plants..." />);

    expect(getByPlaceholderText('Search plants...')).toBeTruthy();
  });

  it('handles text input correctly', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <UiInput placeholder="Search..." onChangeText={mockOnChangeText} />
    );

    const input = getByPlaceholderText('Search...');
    fireEvent.changeText(input, 'test input');

    expect(mockOnChangeText).toHaveBeenCalledWith('test input');
  });

  it('handles value prop correctly', () => {
    const { getByDisplayValue } = render(<UiInput placeholder="Search..." value="initial value" />);

    expect(getByDisplayValue('initial value')).toBeTruthy();
  });
});
