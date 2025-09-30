import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../styles/theme';

export function ScheduleDots() {
  const [selectedDays, setSelectedDays] = useState<number[]>([5, 12, 18, 25]);
  
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dot,
              selectedDays.includes(day) && styles.selectedDot
            ]}
            onPress={() => toggleDay(day)}
          >
            <View style={[
              styles.innerDot,
              selectedDays.includes(day) && styles.selectedInnerDot
            ]} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.sm,
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: theme.spacing.xs,
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
  },
});