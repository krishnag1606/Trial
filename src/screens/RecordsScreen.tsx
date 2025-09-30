import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { theme } from '../styles/theme';
import { useAppContext } from '../contexts/AppContext';
import { useTranslation } from 'react-i18next';

export function RecordsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { state } = useAppContext();

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'Lab Report':
        return 'flask-outline';
      case 'Imaging':
        return 'scan-outline';
      default:
        return 'document-text-outline';
    }
  };

  const renderRecord = ({ item }) => (
    <TouchableOpacity style={styles.recordCard}>
      <View style={styles.recordIcon}>
        <Ionicons name={getRecordIcon(item.type)} size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.recordInfo}>
        <Text style={styles.recordTitle}>{item.title}</Text>
        <Text style={styles.recordDate}>{new Date(item.date).toLocaleDateString()}</Text>
        <Text style={styles.recordSummary}>{item.summary}</Text>
      </View>
      <View style={styles.recordActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="download-outline" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={t('medicalRecords')}
        showBack
        onBackPress={() => navigation.goBack()}
      />
      
      <FlatList
        data={state.records}
        keyExtractor={(item) => item.id}
        renderItem={renderRecord}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  recordCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  recordIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  recordInfo: {
    flex: 1,
  },
  recordTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  recordDate: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  recordSummary: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  recordActions: {
    flexDirection: 'column',
  },
  actionButton: {
    padding: theme.spacing.sm,
  },
});