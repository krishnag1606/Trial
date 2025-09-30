// src/screens/HomeScreen.tsx
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionTiles } from '../components/ActionTiles';
import { BottomActions } from '../components/BottomActions';
import { DoctorCard } from '../components/DoctorCard';
import { Header } from '../components/Header';
import { PredictCard } from '../components/PredictCard';
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
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        onNotificationsPress={() => navigation.navigate('Notifications')}
        onProfilePress={() => navigation.navigate('Profile')}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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

        <PredictCard onPress={handlePredict} />
        
        {/* This container correctly clips its children into a single rounded shape */}
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
          onMicrophone={() => console.log('Microphone pressed')}
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
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.sm, // Added some space
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
  compositeCardContainer: {
    marginHorizontal: theme.spacing.md,
    borderRadius: 30, // This creates the overall rounded shape
    overflow: 'hidden', // This clips the children to the container's shape
    // ...theme.shadows.medium,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
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