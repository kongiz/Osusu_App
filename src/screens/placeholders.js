import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants/theme';

export function GroupsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.emoji}>👥</Text>
        <Text style={styles.title}>Groups</Text>
        <Text style={styles.sub}>Coming in Step 2</Text>
      </View>
    </SafeAreaView>
  );
}

export function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.emoji}>🔔</Text>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.sub}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.emoji}>👤</Text>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.sub}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: SIZES.md,
  },
  title: {
    fontSize: SIZES.textXxl,
    fontWeight: '700',
    color: COLORS.text,
  },
  sub: {
    fontSize: SIZES.textMd,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
});
