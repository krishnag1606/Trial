import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../contexts/AppContext';

export function PredictorsAccordion() {
  const { t, i18n } = useTranslation();
  const { state } = useAppContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('topPredictors')}</Text>
      {state.predictors.map((predictor) => (
        <View key={predictor.id} style={styles.item}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleExpand(predictor.id)}
          >
            <Text style={styles.predictorName}>
              {t(predictor.name.toLowerCase().replace(' ', ''))}
            </Text>
            <Ionicons
              name={expandedId === predictor.id ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
          {expandedId === predictor.id && (
            <View style={styles.content}>
              <Text style={styles.accuracy}>
                Accuracy: {predictor.accuracy}
              </Text>
              <Text style={styles.description}>
                {i18n.language === 'hi' ? predictor.hindiDescription : predictor.description}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  item: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  predictorName: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  accuracy: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});