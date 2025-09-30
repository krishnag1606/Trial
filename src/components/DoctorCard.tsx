// DoctorCard.tsx
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
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#1FA2FF', '#0D68C7']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.card}
      >
        <View style={styles.content}>
          <View style={styles.textBlock}>
            <Text style={styles.name}>{doctor.name}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>

            <TouchableOpacity style={styles.videoCallButton} onPress={onVideoCall}>
              <Text style={styles.videoCallText}>{t('videoCall')}</Text>
            </TouchableOpacity>
          </View>

          {/* Doctor image - positioned absolutely to overlap */}
          <Image
            source={{ uri: doctor.avatar }}
            style={styles.avatar}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: theme.spacing.md,
    marginBottom: 56, // For the overlapping schedule panel below
  },
  card: {
    borderRadius: 20,
    ...theme.shadows.medium,
    overflow: 'hidden', // Ensures content doesn't spill out of rounded corners
  },
  content: {
    minHeight: 140,
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    paddingVertical: theme.spacing.md, // Add vertical padding to the content
    position: 'relative', // For absolutely positioning the avatar
  },
  textBlock: {
    flex: 1, // Take up available space, pushing image to the right
    paddingLeft: theme.spacing.md, // Left padding for the text content
    paddingRight: 120, // Reserve space for the overlapping avatar image
    justifyContent: 'center',
  },
  name: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.xl, // Make name larger
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  specialty: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.md, // Make specialty text a bit larger
    opacity: 0.95,
    marginBottom: theme.spacing.md, // More space below specialty
  },
  videoCallButton: {
    backgroundColor: '#0E0E0E',
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.lg, // More padding for a wider button
    paddingVertical: theme.spacing.sm, // More vertical padding
    borderRadius: 25, // More rounded for a pill shape
  },
  videoCallText: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.md, // Larger text for button
    fontWeight: '600',
  },
  avatar: {
    position: 'absolute',
    right: -20, // Nudge right to overlap more
    top: 0,   // Nudge up to overlap the top edge
    width: 200, // Fixed width for the image
    height: '140%', // Make it taller than the card to overlap more
    resizeMode: 'cover', // Cover mode to fill the space
  },
});
