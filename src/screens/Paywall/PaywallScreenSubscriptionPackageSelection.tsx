import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import UiButton from '@/src/components/ui/UiButton';
import PaywallScreenSubscriptionPackages, {
  SubscriptionPackage,
} from '@/src/screens/Paywall/PaywallScreenSubscriptionPackages';
import { Colors, Typography } from '@/src/theme';

const PaywallScreenSubscriptionPackageSelection = () => {
  const [selectedPackage, setSelectedPackage] = useState<SubscriptionPackage>(
    {} as SubscriptionPackage
  );

  return (
    <View style={styles.container}>
      <PaywallScreenSubscriptionPackages
        onSelect={setSelectedPackage}
        selectedPackage={selectedPackage}
      />
      <UiButton
        style={styles.tryButton}
        title="Try free for 3 days"
        textStyle={styles.tryButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 26,
  },
  tryButtonText: {
    fontSize: 16,
    color: Colors.white,
    letterSpacing: -0.24,
    fontFamily: Typography.rubik.medium,
  },
  tryButton: {
    borderRadius: 14,
  },
});

export default PaywallScreenSubscriptionPackageSelection;
