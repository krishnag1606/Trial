import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { theme } from '../styles/theme';
import { useAppContext } from '../contexts/AppContext';
import { useTranslation } from 'react-i18next';

export function MedicinesScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { state, dispatch } = useAppContext();

  const toggleMedicineOwned = (medicineId: string) => {
    const medicine = state.medicines.find(m => m.id === medicineId);
    if (medicine) {
      const updatedMedicine = { ...medicine, owned: !medicine.owned };
      dispatch({ type: 'UPDATE_MEDICINE', payload: updatedMedicine });
    }
  };

  const renderMedicine = ({ item }) => (
    <View style={styles.medicineCard}>
      <View style={styles.medicineIcon}>
        <Ionicons name="medical" size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.medicineInfo}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text style={styles.medicineDose}>{item.dose} - {item.frequency}</Text>
        <Text style={styles.medicineCategory}>{item.category}</Text>
      </View>
      <Switch
        value={item.owned}
        onValueChange={() => toggleMedicineOwned(item.id)}
        trackColor={{ false: theme.colors.gray300, true: theme.colors.primary }}
        thumbColor={item.owned ? theme.colors.surface : theme.colors.gray200}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={t('myMedicines')}
        showBack
        onBackPress={() => navigation.goBack()}
      />
      
      <FlatList
        data={state.medicines}
        keyExtractor={(item) => item.id}
        renderItem={renderMedicine}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color={theme.colors.surface} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContainer: {
    padding: theme.spacing.md,
  },
  medicineCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  medicineIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  medicineDose: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  medicineCategory: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    right: theme.spacing.md,
    bottom: theme.spacing.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
});