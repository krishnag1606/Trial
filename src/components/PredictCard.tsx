// src/components/PredictCard.tsx
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '../styles/theme';

interface PredictCardProps {
  onPress: () => void;
}

export function PredictCard({ onPress }: PredictCardProps) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <ImageBackground
        source={require('../../assets/images/doctor-patient.png')}
        style={styles.imageBackground}
        // MODIFICATION 1: Apply borderRadius directly to imageStyle
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          // MODIFICATION 2: Adjust gradient colors to achieve a dark blue to semi-transparent effect
          colors={['rgba(0, 77, 153, 0.4)', 'rgba(0, 77, 153, 1)']} // Dark blue with more transparency at the top
          start={{ x: 0, y: 0 }} // Start gradient from top-left
          end={{ x: 0, y: 1 }} // End gradient at bottom-left (vertical gradient)
          style={styles.gradientOverlay}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{t('predictYourDisease')}</Text>
            <Text style={styles.accuracy}>UPTO 87% accuracy</Text>
            <Text style={styles.description}>
              Our ML models can predict most viral/index diseases like Malaria,
              Cardio Vascular disease etc.
            </Text>
          </View>

          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden', // Crucial: Ensures content inside respects the border radius
    ...theme.shadows.medium,
    height: 250,
    backgroundColor: theme.colors.new, // Fallback background if image fails to load
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    // MODIFICATION 3: Remove borderRadius from here if it was present,
    // as it's handled by cardContainer's overflow and imageStyle
  },
  imageStyle: {
    resizeMode: 'cover',
    // MODIFICATION 1 (Continued): Apply borderRadius here as well
    borderRadius: theme.borderRadius.lg,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    // MODIFICATION 4: Ensure gradient respects borderRadius
    borderRadius: theme.borderRadius.lg,
  },
  content: {
    //
  },
  title: {
    fontSize: theme.fontSize.xxxl,
    color: theme.colors.surface,
    fontFamily: 'Helvetica-Bold',
    marginBottom: theme.spacing.sm,
  },
  accuracy: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.surface,
    fontFamily: 'Helvetica-Bold',
    marginBottom: theme.spacing.xs,
    opacity: 0.9,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.surface,
    lineHeight: 18,
    fontFamily: 'Helvetica',
    opacity: 0.85,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: theme.colors.surface,
  },
});