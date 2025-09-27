import { render } from '@testing-library/react-native';
import UiEmptyState from '../UiEmptyState';

jest.mock('@/src/components/ui/UiButton', () => 'UiButton');

describe('UiEmptyState', () => {
  it('renders with default props', () => {
    const { getByText } = render(<UiEmptyState />);

    expect(getByText('Nothing here yet')).toBeTruthy();
    expect(getByText('When data is available, it will appear here.')).toBeTruthy();
  });

  it('renders with custom title and message', () => {
    const { getByText } = render(<UiEmptyState title="Custom Title" message="Custom message" />);

    expect(getByText('Custom Title')).toBeTruthy();
    expect(getByText('Custom message')).toBeTruthy();
  });

  it('renders action button when provided', () => {
    const mockAction = jest.fn();
    const { getByTestId } = render(<UiEmptyState actionText="Take Action" onAction={mockAction} />);

    expect(getByTestId('empty-state')).toBeTruthy();
  });

  it('renders in compact mode', () => {
    const { getByTestId } = render(<UiEmptyState compact={true} />);

    expect(getByTestId('empty-state')).toBeTruthy();
  });
});
