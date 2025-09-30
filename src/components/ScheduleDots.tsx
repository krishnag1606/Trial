// ScheduleDots.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export function ScheduleDots() {
  const [selectedDays, setSelectedDays] = useState<number[]>([5, 12, 18, 25]);

  const days = Array.from({ length: 28 }, (_, i) => i + 1); // show small grid (28 to fit two rows)

  const toggleDay = (day: number) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <View style={styles.dotsContainer}>
      {days.map((day) => (
        <TouchableOpacity
          key={day}
          style={[styles.dot, selectedDays.includes(day) && styles.selectedDot]}
          onPress={() => toggleDay(day)}
          activeOpacity={0.8}
        >
          <View style={[styles.innerDot, selectedDays.includes(day) && styles.selectedInnerDot]} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
    // make a flexible grid item that keeps spacing
    marginHorizontal: 4,
  },
  selectedDot: {
    backgroundColor: theme.colors.primary,
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.gray400,
  },
  selectedInnerDot: {
    backgroundColor: theme.colors.surface,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
