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
      colors={['#1FA2FF', '#0D68C7']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.card}
    >
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.name}>DR. GUPTA</Text>
          <Text style={styles.specialty}>Family Diagnosis</Text>

          <TouchableOpacity style={styles.videoCallButton} onPress={onVideoCall}>
            <Ionicons name="videocam" size={20} color={theme.colors.surface} style={styles.videoIcon} />
            <Text style={styles.videoCallText}>{t('videoCall')}</Text>
          </TouchableOpacity>
        </View>
        
        <Image
          source={{ uri: doctor.avatar }}
          style={styles.avatar}
        />
        
        <TouchableOpacity style={styles.bookmarkButton}>
          <Feather name="bookmark" size={24} color={theme.colors.surface} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    // --- MODIFICATION START ---
    // Round the top corners to match the parent container
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // Flatten the bottom corners to connect seamlessly
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // --- MODIFICATION END ---
    height: 180,
    width: '100%',
  },
  content: {
    minHeight: 160,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg, // Added a bit more padding
    paddingHorizontal: theme.spacing.md,
    position: 'relative',
  },
  textBlock: {
    flex: 1,
    paddingRight: 140, // Space for the image
    justifyContent: 'center',
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
    right: -38,
    bottom: 0,
    width: 190,
    height: '130%',
    top: 0,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  bookmarkButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    padding: theme.spacing.xs,
  },
});