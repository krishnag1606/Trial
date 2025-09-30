import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';
import { useTranslation } from 'react-i18next';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onVideoCall: () => void;
}

export function DoctorCard({ doctor, onVideoCall }: DoctorCardProps) {
  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={['#4A90E2', '#357ABD']}
      style={styles.card}
    >
      <View style={styles.content}>
        <Image source={{ uri: doctor.avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
        </View>
        <TouchableOpacity style={styles.videoCallButton} onPress={onVideoCall}>
          <Text style={styles.videoCallText}>{t('videoCall')}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.medium,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: theme.spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  specialty: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.sm,
    opacity: 0.9,
  },
  videoCallButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
  },
  videoCallText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
});