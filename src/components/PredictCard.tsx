import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { useTranslation } from 'react-i18next';

interface PredictCardProps {
  onPress: () => void;
}

export function PredictCard({ onPress }: PredictCardProps) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: 'https://disruptionhub.com/wp-content/uploads/2024/01/What-is-the-impact-of-AI-on-the-doctor-patient-relationship-1536x1024.jpg' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{t('predictYourDisease')}</Text>
        <Text style={styles.accuracy}>{t('accuracy')}</Text>
        <Text style={styles.description}>
          Quick health assessment based on your symptoms
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  image: {
    //align down
    alignSelf: 'flex-end',
    width: '100%',
    height: 190, 
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  accuracy: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});