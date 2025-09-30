import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionTiles } from '../components/ActionTiles';
import { BottomActions } from '../components/BottomActions';
import { DoctorCard } from '../components/DoctorCard';
import { Header } from '../components/Header';
import { PredictCard } from '../components/PredictCard'; // --- IMPORT ADDED BACK ---
import { PredictorsAccordion } from '../components/PredictorsAccordion';
import { ScheduleDots } from '../components/ScheduleDots';
import { useAppContext } from '../contexts/AppContext';
import { theme } from '../styles/theme';

export function HomeScreen() {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useAppContext();

  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

  const handleLanguageSelect = (language: 'en' | 'hi') => {
    i18n.changeLanguage(language);
    dispatch({ type: 'SET_LANGUAGE', payload: language });
    setLanguageModalVisible(false);
  };

  const handleVideoCall = () => {
    navigation.navigate('VideoCall', { doctor: state.doctors[0] });
  };
  const handlePredict = () => {
    navigation.navigate('Predict');
  };
  const handleCheckRecords = () => {
    navigation.navigate('Records');
  };
  const handleMedicines = () => {
    navigation.navigate('Medicines');
  };
  const handleBook = () => {
    navigation.navigate('Book');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header
        onNotificationsPress={() => navigation.navigate('Notifications')}
        onProfilePress={() => navigation.navigate('Profile')}
      />
      
      <View style={styles.helpInputContainer}>
        <TextInput
          style={styles.helpInput}
          placeholder="How can I help?....."
          placeholderTextColor={theme.colors.textSecondary}
        />
        <TouchableOpacity style={styles.micButton}>
          <Ionicons name="mic" size={24} color={theme.colors.surface} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greetingSection}>
          <View style={styles.greetingRow}>
            <Text style={styles.greeting}>
              <Text style={styles.greetingHighlight}>{t('greeting')}{t(',')}</Text>
              {'\n'}
              {t('howAreYou')}
            </Text>

            <TouchableOpacity style={styles.languageButton} onPress={() => setLanguageModalVisible(true)}>
              <Text style={styles.languageText}>
                {i18n.language === 'en' ? 'English' : 'हिंदी'}
              </Text>
              <Feather name="chevron-down" size={20} color={theme.colors.primary} style={styles.languageIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- PREDICT CARD ADDED BACK --- */}
        <PredictCard onPress={handlePredict} />

        <View style={styles.compositeCardContainer}>
          {state.doctors.length > 0 && (
            <DoctorCard
              doctor={state.doctors[0]}
              onVideoCall={handleVideoCall}
            />
          )}
          <ScheduleDots />
        </View>

        <ActionTiles
          onCheckRecords={handleCheckRecords}
          onMedicines={handleMedicines}
          onBook={handleBook}
        />

        <PredictorsAccordion />
        
        <BottomActions
          onPredict={handlePredict}
        />
      </ScrollView>

      <Modal
        transparent={true}
        visible={isLanguageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
        animationType="fade"
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setLanguageModalVisible(false)}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleLanguageSelect('en')}>
              <Text style={styles.dropdownItemText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleLanguageSelect('hi')}>
              <Text style={styles.dropdownItemText}>हिंदी</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  greetingSection: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: theme.fontSize.xxl,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.md,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 30,
  },
  greetingHighlight: {
    fontSize: theme.fontSize.xxxl,
    color: theme.colors.primary,
    fontFamily: 'Helvetica-Bold',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xs,
  },
  languageText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
  },
  languageIcon: {
    marginLeft: theme.spacing.xxs,
  },
  helpInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    paddingLeft: theme.spacing.md,
    ...theme.shadows.small,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  helpInput: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  micButton: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.black,
    borderRadius: theme.borderRadius.lg,
    margin: theme.spacing.xs,
  },
  compositeCardContainer: {
    marginHorizontal: theme.spacing.md,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  dropdownContainer: {
    marginTop: 100,
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
    ...theme.shadows.medium,
  },
  dropdownItem: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  dropdownItemText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
});

