import { render } from '@testing-library/react-native';
import UiImage from '../UiImage';

describe('UiImage', () => {
  it('renders correctly', () => {
    const { root } = render(<UiImage source={{ uri: 'https://example.com/image.jpg' }} />);
    expect(root).toBeTruthy();
  });

  it('handles showSkeleton prop', () => {
    const { root } = render(
      <UiImage source={{ uri: 'https://example.com/image.jpg' }} showSkeleton={true} />
    );

    expect(root).toBeTruthy();
  });
});
