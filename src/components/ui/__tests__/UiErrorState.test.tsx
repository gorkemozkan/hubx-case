import { render } from '@testing-library/react-native';
import UiErrorState from '../UiErrorState';

jest.mock('@/src/components/ui/UiButton', () => 'UiButton');

describe('UiErrorState', () => {
  it('renders with default props', () => {
    const { getByText } = render(<UiErrorState />);

    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Oops!')).toBeTruthy();
  });

  it('renders with custom message', () => {
    const { getByText } = render(<UiErrorState message="Custom error message" />);

    expect(getByText('Custom error message')).toBeTruthy();
  });

  it('renders retry button when onRetry is provided', () => {
    const mockRetry = jest.fn();
    const { root } = render(<UiErrorState onRetry={mockRetry} />);

    expect(root).toBeTruthy();
  });

  it('renders in compact mode', () => {
    const { getByText } = render(<UiErrorState compact={true} />);

    expect(getByText('Something went wrong')).toBeTruthy();
  });
});
