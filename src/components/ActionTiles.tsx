import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useTranslation } from 'react-i18next';

interface ActionTilesProps {
  onCheckRecords: () => void;
  onMedicines: () => void;
  onBook: () => void;
}

export function ActionTiles({ onCheckRecords, onMedicines, onBook }: ActionTilesProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.tile, styles.recordsTile]} onPress={onCheckRecords}>
          <Ionicons name="document-text-outline" size={24} color={theme.colors.primary} />
          <Text style={styles.recordsText}>{t('checkRecords')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.tile, styles.medicinesTile]} onPress={onMedicines}>
          <Text style={styles.medicinesText}>{t('medicines')}</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={[styles.tile, styles.bookTile]} onPress={onBook}>
        <Text style={styles.bookText}>{t('book')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  tile: {
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordsTile: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    marginRight: theme.spacing.sm,
    paddingVertical: theme.spacing.lg,
  },
  medicinesTile: {
    flex: 1,
    backgroundColor: theme.colors.black,
    paddingVertical: theme.spacing.lg,
  },
  bookTile: {
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.md,
  },
  recordsText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    marginTop: theme.spacing.xs,
  },
  medicinesText: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  bookText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
});