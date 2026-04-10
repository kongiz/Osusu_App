import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { Button } from '../../components/Button';

const { width } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.container}>
        {/* Top hero area */}
        <View style={styles.hero}>
          {/* Logo mark */}
          <View style={styles.logoMark}>
            <Text style={styles.logoSymbol}>⊕</Text>
          </View>

          <Text style={styles.appName}>Osusu</Text>
          <Text style={styles.tagline}>Save together.{'\n'}Grow together.</Text>

          {/* Decorative circles suggesting community */}
          <View style={styles.bubbles}>
            {['A', 'F', 'M', 'K', 'S'].map((letter, i) => (
              <View
                key={i}
                style={[
                  styles.bubble,
                  { marginLeft: i > 0 ? -10 : 0 },
                ]}
              >
                <Text style={styles.bubbleLetter}>{letter}</Text>
              </View>
            ))}
            <Text style={styles.bubblesLabel}>  +240 members in The Gambia</Text>
          </View>
        </View>

        {/* Bottom card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Community savings,{'\n'}made simple.</Text>
          <Text style={styles.cardDesc}>
            Create or join an Osusu group, track contributions, and manage payouts — all in one place.
          </Text>

          <Button
            title="Get Started"
            onPress={() => navigation.navigate('Register')}
            size="lg"
            style={styles.btnPrimary}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginTextBold}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.xl,
    paddingTop: SIZES.xl,
  },
  logoMark: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.md,
  },
  logoSymbol: {
    fontSize: 36,
    color: COLORS.accent,
  },
  appName: {
    fontSize: 42,
    fontWeight: '800',
    color: COLORS.textOnPrimary,
    letterSpacing: -1,
    marginBottom: SIZES.sm,
  },
  tagline: {
    fontSize: SIZES.textXl,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: SIZES.xl,
  },
  bubbles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.sm,
  },
  bubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  bubbleLetter: {
    fontSize: SIZES.textSm,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  bubblesLabel: {
    fontSize: SIZES.textXs,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: SIZES.sm,
  },

  // Bottom card
  card: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: SIZES.xl,
    paddingBottom: SIZES.xxl,
    ...SHADOWS.elevated,
  },
  cardTitle: {
    fontSize: SIZES.textXxl,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: SIZES.sm,
    lineHeight: 32,
  },
  cardDesc: {
    fontSize: SIZES.textMd,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SIZES.xl,
  },
  btnPrimary: {
    width: '100%',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: SIZES.lg,
  },
  loginText: {
    fontSize: SIZES.textMd,
    color: COLORS.textSecondary,
  },
  loginTextBold: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
