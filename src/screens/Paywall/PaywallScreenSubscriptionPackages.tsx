import { LinearGradient } from 'expo-linear-gradient';
import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, getColorWithOpacity, SemanticColors, Typography } from '@/src/theme';

export interface SubscriptionPackage {
  id: string;
  name: string;
  description: string;
  bestChoice: boolean;
}

interface Props {
  onSelect: (subscriptionPackage: SubscriptionPackage) => void;
  selectedPackage: SubscriptionPackage;
}

const packages: SubscriptionPackage[] = [
  {
    id: '1',
    name: '1 Month',
    description: '$2.99/month, auto renewable',
    bestChoice: false,
  },
  {
    id: '2',
    name: '1 Year',
    description: 'First 3 days free, then $529,99/year',
    bestChoice: true,
  },
];

const PaywallScreenSubscriptionPackages: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      {packages.map((p) => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.onSelect(p)}
          key={p.id}
          style={[
            styles.packageContainer,
            p.id === props.selectedPackage.id && styles.packageContainerSelected,
          ]}
        >
          {p.id === props.selectedPackage.id && (
            <LinearGradient
              locations={[0, 0.5]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradientBackground}
              colors={[
                getColorWithOpacity(Colors['green-500'], 24),
                getColorWithOpacity(Colors['green-500'], 0),
              ]}
            />
          )}
          {p.bestChoice && (
            <View style={styles.bestChoiceBadge}>
              <Text style={styles.bestChoiceBadgeText}>Save 50%</Text>
            </View>
          )}
          <View
            style={[
              styles.radioButton,
              p.id === props.selectedPackage.id && styles.radioButtonSelected,
            ]}
          >
            {p.id === props.selectedPackage.id && <View style={styles.radioButtonSelectedInner} />}
          </View>
          <View style={styles.packageContent}>
            <Text style={styles.packageTitle}>{p.name}</Text>
            <Text style={styles.packageDescription}>{p.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  packageTitle: {
    fontSize: 16,
    letterSpacing: 0,
    color: Colors.white,
    fontFamily: Typography.rubik.medium,
  },
  packageDescription: {
    fontSize: 12,
    letterSpacing: 0,
    fontFamily: Typography.rubik.light,
    color: getColorWithOpacity('FFFFFF', 70),
  },
  packageContent: {
    gap: 1,
    flex: 1,
  },
  packageContainer: {
    gap: 12,
    borderWidth: 1,
    display: 'flex',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: getColorWithOpacity(Colors.white, 30),
    backgroundColor: getColorWithOpacity(Colors.white, 5),
  },
  packageContainerSelected: {
    backgroundColor: 'transparent',
    borderColor: SemanticColors.primary,
  },
  gradientBackground: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 14,
    position: 'absolute',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: getColorWithOpacity(Colors.white, 8),
  },
  radioButtonSelected: {
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: SemanticColors.primary,
  },
  radioButtonSelectedInner: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: Colors.white,
  },
  bestChoiceBadge: {
    top: 0,
    right: 0,
    zIndex: 1,
    paddingRight: 9,
    paddingLeft: 12,
    paddingVertical: 4,
    position: 'absolute',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
    backgroundColor: SemanticColors.primary,
  },
  bestChoiceBadgeText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: Typography.rubik.medium,
  },
});

export default PaywallScreenSubscriptionPackages;
