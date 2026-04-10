import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';   
import { Button } from '../components/Button';      
import { COLORS, SIZES } from '../constants/theme';
import Constants from 'expo-constants';

export default function ProfileScreen() {
  
  const { user, logout } = useAuth();  

    const handleLogout = () => {
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: () => logout() },
          ]
        );
    };

    
  return (
    
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.emoji}>👤</Text>
        <Text style={styles.name}>{user?.name || 'User Name'}</Text>
        <Text style={styles.phone}>{user?.phone || 'Phone Number'}</Text>
        <Button
          title="Logout"
          variant="danger"
          onPress={handleLogout}
          style={styles.btn}
        />
        <Text>Version: {Constants.manifest.version}</Text>
        </View>
    </SafeAreaView>
  )
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
    padding: SIZES.xl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: SIZES.lg,
  },
  name: {
    fontSize: SIZES.textXxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  phone: {
    fontSize: SIZES.textMd,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xl,
  },
  btn: {
    width: '100%',
  },
});