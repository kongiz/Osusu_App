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

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await login({ phone: form.phone.trim(), password: form.password });
      
    } catch (err) {
      Alert.alert('Login Failed', err.message || 'Please check your details and try again.');
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
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to your Osusu account</Text>
          </View>

          
          <View style={styles.form}>
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
              placeholder="Your password"
              secureTextEntry
              error={errors.password}
            />

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              size="lg"
              style={styles.btn}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.footerLink}
          >
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.footerBold}>Create one</Text>
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
