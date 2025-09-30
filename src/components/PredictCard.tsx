import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/theme';

interface PredictCardProps {
  onPress: () => void;
}

export function PredictCard({ onPress }: PredictCardProps) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        // Using the image from the new design
        source={{ uri: 'https://www.aha.org/sites/default/files/2024-09/ths-musc-watchman-700x532.jpg' }}
        style={styles.image}
      />
      {/* Semi-transparent overlay to ensure text is readable */}
      <View style={styles.overlay} />
      
      {/* All text content is now absolutely positioned over the image */}
      <View style={styles.content}>
        <Text style={styles.title}>{t('predictYourDisease')}</Text>
        <Text style={styles.accuracy}>UPTO 87% accuracy</Text>
        <Text style={styles.description}>
          Our ML models can predict most viral/index diseases like Malaria, Cardio Vascular disease etc.
        </Text>
      </View>

      {/* The pagination dots at the bottom */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.gray500,
    overflow: 'hidden',
    ...theme.shadows.medium,
    height: 250, // Set a fixed height for the card
  },
  image: {
    width: '50%',
    height: '100%',
    borderRadius: theme.borderRadius.lg,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0)', // A slight dark overlay for better contrast
    borderRadius: theme.borderRadius.lg,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: theme.spacing.md,
    justifyContent: 'center',
    height: '100%',
    width: '65%', // Limit the width of the text container
  },
  title: {
    fontSize: theme.fontSize.xxxl, // Made title larger
    color: theme.colors.primary, 
    fontFamily: 'Helvetica-Bold',
    marginBottom: theme.spacing.sm,
  },
  accuracy: {
    fontSize: theme.fontSize.lg,
    // Changed color to a dark text color for better readability on the image
    color: theme.colors.text, 
    fontFamily: 'Helvetica-Bold',
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.black,
    lineHeight: 18,
    fontFamily: 'Helvetica',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: theme.spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: theme.colors.surface, // Active dot is solid white
  },
});

