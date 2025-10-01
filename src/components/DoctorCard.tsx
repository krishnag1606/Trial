// src/components/DoctorCard.tsx
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/theme';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onVideoCall: () => void;
}

export function DoctorCard({ doctor, onVideoCall }: DoctorCardProps) {
  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={['#1FA2FF', '#0D68C7']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.card}
    >
      {/* The text content is now the main element in the flow */}
      <View style={styles.content}>
        <Text style={styles.name}>DR. GUPTA</Text>
        <Text style={styles.specialty}>Family Diagnosis</Text>
        <TouchableOpacity style={styles.videoCallButton} onPress={onVideoCall}>
          <Ionicons name="videocam" size={20} color={theme.colors.surface} style={styles.videoIcon} />
          <Text style={styles.videoCallText}>{t('videoCall')}</Text>
        </TouchableOpacity>
      </View>

      {/* It sits on top of the gradient, independent of the text content flow */}
      <Image
        source={require('../../assets/images/doctor.png')}
        style={styles.avatar}
      />
      
      {/* The bookmark button was already absolute, which is fine */}
      <TouchableOpacity style={styles.bookmarkButton}>
        <Feather name="bookmark" size={24} color={theme.colors.surface} />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 170,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: theme.spacing.lg,
    paddingRight: 140, // Space for the absolutely positioned image
  },
  name: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.xxxl,
    fontFamily: 'Helvetica-Bold',
    marginBottom: theme.spacing.xs,
  },
  specialty: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.md,
    fontFamily: 'Helvetica',
    opacity: 0.95,
    marginBottom: theme.spacing.lg,
  },
  videoCallButton: {
    backgroundColor: '#0E0E0E',
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    left: -10,
    top: -15,
  },
  videoIcon: {
    marginRight: theme.spacing.sm,
  },
  videoCallText: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  avatar: {
    position: 'absolute',
    // --- THIS IS THE MODIFIED LINE ---
    bottom: -40, // Changed from 0 to -40 to move it down
    right: -15,
    width: 220,
    height: 220,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  bookmarkButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    padding: theme.spacing.xs,
    zIndex: 10,
  },
});