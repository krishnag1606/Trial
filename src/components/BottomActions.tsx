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
  
  // Text from the image
  const descriptionText = "भारत में हृदय रोगों में मुख्य रूप से हृदय संबंधी रक्त वाहिकाओं की बीमारियाँ, जैसे कोरोनरी हृदय रोग (CVD) शामिल हैं, जो दिल के दौरे का मुख्य कारण है, और सेरेब्रोवास्कुलर रोग (जैसे स्ट्रोक). अन्य संबंधित स्थितियों में परिधीय धमनी रोग, आमवाती हृदय रोग और जन्मजात हृदय रोग शामिल हैं. इन बीमारियों के जोखिम कारकों में उच्च रक्तचाप, मोटापा, उच्च कोलेस्ट्रॉल, मधुमेह, धूम्रपान और अस्वास्थ्यकर आहार शामिल हैं।";

  return (
    <View style={styles.wrapper}>
      {/* --- ADDED: Grey container for the entire predict section --- */}
      <View style={styles.card}>
        <Text style={styles.descriptionText}>{descriptionText}</Text>
        
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
  },
  // --- NEW: Style for the grey container ---
  card: {
    backgroundColor: '#cac6c6ff', // Light grey background
    borderRadius: 20,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  // --- NEW: Style for the description text ---
  descriptionText: {
    color: theme.colors.black,
    fontSize: theme.fontSize.md,
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
    fontFamily: 'Helvetica-Bold'
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
    width: '100%', // Button takes the full width inside the card
  },
  predictText: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    marginRight: theme.spacing.sm,
    textTransform: 'uppercase', // Text is uppercase in the image
  },
});