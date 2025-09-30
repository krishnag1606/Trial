import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Using Feather icons for the specific arrow in the design
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';

interface ActionTilesProps {
  onCheckRecords: () => void;
  onMedicines: () => void;
  onBook: () => void;
}

export function ActionTiles({ onCheckRecords, onMedicines, onBook }: ActionTilesProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Left Column: Check Records Tile */}
      <TouchableOpacity 
        style={[styles.tile, styles.checkRecordsTile]} 
        onPress={onCheckRecords}
        activeOpacity={0.8}
      >
        <View style={styles.iconContainer}>
          <Feather name="arrow-up-right" size={20} color={theme.colors.surface} />
        </View>
        <Text style={styles.largeTileText}>{t('checkRecords').toUpperCase()}</Text>
      </TouchableOpacity>

      {/* Right Column: Contains Medicines and Book tiles */}
      <View style={styles.rightColumn}>
        <TouchableOpacity 
          style={[styles.tile, styles.medicinesTile]} 
          onPress={onMedicines}
          activeOpacity={0.8}
        >
          <Text style={styles.mediumTileText}>{t('medicines').toUpperCase()}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tile, styles.bookTile]} 
          onPress={onBook}
          activeOpacity={0.8}
        >
          <Text style={styles.mediumTileText}>{t('book').toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.lg, // Added more vertical margin
    flexDirection: 'row', // Main axis is horizontal for the two columns
    height: 200, // Fixed height for the entire component
  },
  rightColumn: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    justifyContent: 'space-between', // Distribute space between medicines and book
  },
  tile: {
    borderRadius: 30, // Large, modern border radius
    ...theme.shadows.medium, // A more pronounced shadow
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkRecordsTile: {
    flex: 1,
    backgroundColor: '#52A9FF', // A vibrant blue
    alignItems: 'flex-start', // Align text to the bottom-left
    justifyContent: 'space-between', // Push icon and text to corners
    padding: theme.spacing.lg,
  },
  medicinesTile: {
    flex: 1,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: theme.colors.black,
    marginBottom: theme.spacing.sm, // Gap between medicines and book
  },
  bookTile: {
    flex: 1,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#9A9A9A', // A medium gray
  },
  largeTileText: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.xxxl,
    fontFamily: 'Helvetica-Bold', // Use the bold font
    lineHeight: 30, // Adjust line height for multiline text
  },
  mediumTileText: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.lg,
    fontFamily: 'Helvetica-Bold', // Use the bold font
  },
  iconContainer: {
    backgroundColor: theme.colors.black,
    padding: theme.spacing.sm,
    borderRadius: 100, // Make it a perfect circle
    alignSelf: 'flex-end', // Position it in the top-right of its parent
  },
});