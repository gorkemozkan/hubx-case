import { FC } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Colors, getColorWithOpacity, Typography } from '@/src/theme';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
}

const PaywallSubscriptionTerms: FC<Props> = (props) => {
  return (
    <View style={props.containerStyle}>
      <Text style={styles.disclaimerText}>
        After the 3-day free trial period you'll be charged ₺274.99 per year unless you cancel
        before the trial expires. Yearly Subscription is Auto-Renewable
      </Text>
      <View style={styles.linksContainer}>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Terms</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>•</Text>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Privacy</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>•</Text>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Restore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  disclaimerText: {
    fontSize: 9,
    marginBottom: 6,
    textAlign: 'center',
    fontFamily: Typography.rubik.light,
    color: getColorWithOpacity(Colors.white, 52),
  },
  linksContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  linkText: {
    fontSize: 11,
    fontFamily: Typography.rubik.regular,
    color: getColorWithOpacity(Colors.white, 50),
  },
  separator: {
    fontSize: 11,
    fontFamily: Typography.rubik.regular,
    color: getColorWithOpacity(Colors.white, 50),
  },
});

export default PaywallSubscriptionTerms;
