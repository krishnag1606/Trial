// src/components/ScheduleDots.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/theme';

export function ScheduleDots() {
  const { t } = useTranslation();
  const [selectedDays, setSelectedDays] = useState<number[]>([2, 11]);
  const days = Array.from({ length: 14 }, (_, i) => i + 1); 

  const toggleDay = (day: number) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <View style={styles.scheduleSection}>
      <View style={styles.scheduleHeader}>
        <Text style={styles.scheduleTitle}>{t('schedule')}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dotsContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dot, selectedDays.includes(day) && styles.selectedDot]}
            onPress={() => toggleDay(day)}
            activeOpacity={0.8}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scheduleSection: {
    backgroundColor: '#F0F0F0',
    // --- MODIFICATION START ---
    // Flatten the top corners to connect with the DoctorCard
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    // Round the bottom corners to match the parent container
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // --- MODIFICATION END ---
    paddingTop: theme.spacing.lg, // Added more space
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    borderBlockColor: theme.colors.border,
    borderBottomWidth: 5,
    borderBottomColor: '#0D68C7',
    borderLeftColor: '#0D68C7',
    borderLeftWidth: 5,
    borderRightColor: '#0D68C7',
    borderRightWidth: 5,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  scheduleTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  seeAllText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    fontFamily: 'Helvetica',
  },
  dotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.xs,
  },
  dot: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    marginBottom: theme.spacing.sm,
    marginHorizontal: 4,
  },
  selectedDot: {
    backgroundColor: theme.colors.primary,
  },
});