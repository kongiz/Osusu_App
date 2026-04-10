import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../../constants/theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (form.phone.trim().length < 7) e.phone = 'Enter a valid phone number';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await register({
        name: form.name.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });
      // Navigation handled by RootNavigator watching auth state
    } catch (err) {
      Alert.alert('Registration Failed', err.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (val) => {
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: null }));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.logoText}>⊕</Text>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Join the Osusu community</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Full Name"
              value={form.name}
              onChangeText={set('name')}
              placeholder="Your full name"
              autoCapitalize="words"
              error={errors.name}
            />
            <Input
              label="Phone Number"
              value={form.phone}
              onChangeText={set('phone')}
              placeholder="e.g. 220XXXXXXX"
              keyboardType="phone-pad"
              error={errors.phone}
            />
            <Input
              label="Password"
              value={form.password}
              onChangeText={set('password')}
              placeholder="Min. 6 characters"
              secureTextEntry
              error={errors.password}
            />
            <Input
              label="Confirm Password"
              value={form.confirm}
              onChangeText={set('confirm')}
              placeholder="Repeat your password"
              secureTextEntry
              error={errors.confirm}
            />

            <Button
              title="Create Account"
              onPress={handleRegister}
              loading={loading}
              size="lg"
              style={styles.btn}
            />

            <Text style={styles.terms}>
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.footerLink}
          >
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.footerBold}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flexGrow: 1,
    padding: SIZES.xl,
  },
  back: {
    marginBottom: SIZES.lg,
  },
  backText: {
    fontSize: SIZES.textMd,
    color: COLORS.primary,
    fontWeight: '600',
  },
  header: {
    marginBottom: SIZES.xl,
  },
  logoText: {
    fontSize: 40,
    color: COLORS.accent,
    marginBottom: SIZES.md,
  },
  title: {
    fontSize: SIZES.textDisplay,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: SIZES.textMd,
    color: COLORS.textSecondary,
  },
  form: {
    flex: 1,
  },
  btn: {
    marginTop: SIZES.sm,
    width: '100%',
  },
  terms: {
    marginTop: SIZES.md,
    fontSize: SIZES.textXs,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    alignItems: 'center',
    paddingVertical: SIZES.xl,
  },
  footerText: {
    fontSize: SIZES.textMd,
    color: COLORS.textSecondary,
  },
  footerBold: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
