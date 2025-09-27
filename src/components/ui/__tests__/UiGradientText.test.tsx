import { render } from '@testing-library/react-native';
import UiGradientText from '../UiGradientText';

jest.mock('react-native-svg', () => ({
  __esModule: true,
  default: 'Svg',
  Defs: 'Defs',
  Stop: 'Stop',
  LinearGradient: 'LinearGradient',
  Text: 'Text',
}));

describe('UiGradientText', () => {
  const mockGradientStops = [
    { offset: '0%', color: '#ff0000' },
    { offset: '100%', color: '#0000ff' },
  ];

  it('renders correctly with required props', () => {
    const { root } = render(
      <UiGradientText gradientStops={mockGradientStops}>Test Text</UiGradientText>
    );

    expect(root).toBeTruthy();
  });

  it('handles custom font properties', () => {
    const { root } = render(
      <UiGradientText gradientStops={mockGradientStops} fontSize={24} fontWeight="bold">
        Custom Text
      </UiGradientText>
    );

    expect(root).toBeTruthy();
  });
});
