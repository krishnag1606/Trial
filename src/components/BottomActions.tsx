import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/theme';

interface BottomActionsProps {
  onPredict: () => void;
}

export function BottomActions({ onPredict }: BottomActionsProps) {
  const { t } = useTranslation();
  
  // --- MODIFICATION 1: The hardcoded text has been removed ---
  // const descriptionText = "भारत में हृदय रोगों में..."; // This line is now deleted

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* --- MODIFICATION 2: Using the t() function to get translated text --- */}
        <Text style={styles.descriptionText}>{t('bottomActionsDescription')}</Text>
        
        <TouchableOpacity style={styles.predictButton} onPress={onPredict}>
          <Text style={styles.predictText}>{t('predict').toUpperCase()}</Text>
          <Ionicons name="arrow-forward" size={20} color={theme.colors.surface} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.md,
    // Note: You might want to remove marginBottom: '30%' if it causes layout issues.
    // It's better to control spacing from the parent ScrollView contentContainerStyle.
  },
  card: {
    backgroundColor: '#aeacacff', // A slightly lighter grey
    borderRadius: 20,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.small,
    marginBottom: theme.spacing.xxxl, // Increased space at the bottom
  },
  descriptionText: {
    color: theme.colors.black,
    fontSize: theme.fontSize.md,
    lineHeight: 24,
    marginBottom: theme.spacing.xl, // Increased space
    fontFamily: 'Helvetica-Bold',
    textAlign: 'left',
  },
  predictButton: {
    backgroundColor: theme.colors.black,
    borderRadius: theme.borderRadius.round,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
    width: '100%',
  },
  predictText: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    marginRight: theme.spacing.sm,
    textTransform: 'uppercase',
  },
});