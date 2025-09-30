import React from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useTranslation } from 'react-i18next';

interface BottomActionsProps {
  onPredict: () => void;
  onMicrophone: () => void;
}

export function BottomActions({ onPredict, onMicrophone }: BottomActionsProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search symptoms..."
          placeholderTextColor={theme.colors.textSecondary}
        />
        <TouchableOpacity style={styles.micButton} onPress={onMicrophone}>
          <Ionicons name="mic" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.predictButton} onPress={onPredict}>
        <Text style={styles.predictText}>{t('predict')}</Text>
        <Ionicons name="arrow-forward" size={20} color={theme.colors.surface} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  micButton: {
    padding: theme.spacing.sm,
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
  },
  predictText: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    marginRight: theme.spacing.sm,
  },
});