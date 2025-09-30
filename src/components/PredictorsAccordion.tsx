import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContext } from '../contexts/AppContext';
import { theme } from '../styles/theme';

export function PredictorsAccordion() {
  const { t, i18n } = useTranslation();
  const { state } = useAppContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('topPredictors').toUpperCase()}</Text>
      </View>

      {state.predictors.map((predictor) => {
        const isExpanded = expandedId === predictor.id;

        return (
          <View key={predictor.id} style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.header}
              onPress={() => toggleExpand(predictor.id)}
              activeOpacity={0.7}
            >
              {/* --- CORRECTION 1: Display name directly --- */}
              {/* This correctly displays "HEART DISEASE" with a space */}
              <Text style={styles.predictorName}>
                {predictor.name.toUpperCase()}
              </Text>

              {/* --- CORRECTION 2: Removed special logic for the last item's icon --- */}
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={22}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.content}>
                <Text style={styles.accuracy}>
                  Accuracy: {predictor.accuracy}
                </Text>
                <Text style={styles.description}>
                  {i18n.language === 'hi'
                    ? predictor.hindiDescription
                    : predictor.description}
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.lg,
  },
  titleContainer: {
    borderBottomWidth: 3, // Thicker line under the title
    borderBottomColor: theme.colors.black,
    paddingBottom: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontFamily: 'Helvetica-Bold', // Use bold font
    color: theme.colors.text,
    textTransform: 'uppercase', // Match the design
  },
  // Replaces the old 'item' card style
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border, // Light separator line
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm, // More vertical padding for a spacious feel
  },
  predictorName: {
    fontSize: theme.fontSize.xl, // Larger font size
    fontFamily: 'Helvetica', // Regular font weight
    color: theme.colors.text,
    textTransform: 'uppercase', // Match the design
  },
  content: {
    // Removed the top border, padding is now used for separation
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xs, // Slight indent for content
  },
  accuracy: {
    fontSize: theme.fontSize.md,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
    fontFamily: 'Helvetica-Bold',
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    fontFamily: 'Helvetica',
  },
});
