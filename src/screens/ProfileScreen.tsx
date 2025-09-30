import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { theme } from '../styles/theme';
import { useTranslation } from 'react-i18next';

export function ProfileScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  
  const [profile, setProfile] = useState({
    name: 'Anmol',
    email: 'anmol@example.com',
    phone: '+91 98765 43210',
    age: '25',
    bloodGroup: 'O+',
    address: 'New Delhi, India'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to AsyncStorage here
  };

  const ProfileField = ({ label, value, field, keyboardType = 'default' }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.fieldInput}
          value={value}
          onChangeText={(text) => setProfile(prev => ({ ...prev, [field]: text }))}
          keyboardType={keyboardType}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={t('profile')}
        showBack
        onBackPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color={theme.colors.surface} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileCard}>
          <ProfileField label="Name" value={profile.name} field="name" />
          <ProfileField label="Email" value={profile.email} field="email" keyboardType="email-address" />
          <ProfileField label="Phone" value={profile.phone} field="phone" keyboardType="phone-pad" />
          <ProfileField label="Age" value={profile.age} field="age" keyboardType="numeric" />
          <ProfileField label="Blood Group" value={profile.bloodGroup} field="bloodGroup" />
          <ProfileField label="Address" value={profile.address} field="address" />
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Ionicons 
            name={isEditing ? 'save' : 'create'} 
            size={20} 
            color={theme.colors.surface} 
          />
          <Text style={styles.editButtonText}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.md,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  fieldContainer: {
    marginBottom: theme.spacing.md,
  },
  fieldLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    fontWeight: '600',
  },
  fieldValue: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text,
    paddingVertical: theme.spacing.sm,
  },
  fieldInput: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.round,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  editButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    marginLeft: theme.spacing.sm,
  },
});