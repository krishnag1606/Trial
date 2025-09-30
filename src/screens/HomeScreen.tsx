import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header';
import { DoctorCard } from '../components/DoctorCard';
import { PredictCard } from '../components/PredictCard';
import { ScheduleDots } from '../components/ScheduleDots';
import { ActionTiles } from '../components/ActionTiles';
import { PredictorsAccordion } from '../components/PredictorsAccordion';
import { BottomActions } from '../components/BottomActions';
import { theme } from '../styles/theme';
import { useAppContext } from '../contexts/AppContext';
import i18n from '../utils/i18n';

export function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { state, dispatch } = useAppContext();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLanguage);
    dispatch({ type: 'SET_LANGUAGE', payload: newLanguage });
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
              {t('greeting')} {t('howAreYou')}
            </Text>
            <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
              <Text style={styles.languageText}>
                {i18n.language === 'en' ? 'हिंदी' : 'English'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <PredictCard onPress={handlePredict} />
        
        {state.doctors.length > 0 && (
          <DoctorCard 
            doctor={state.doctors[0]} 
            onVideoCall={handleVideoCall}
          />
        )}

        <View style={styles.scheduleSection}>
          <Text style={styles.scheduleTitle}>{t('schedule')}</Text>
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
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  languageButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    ...theme.shadows.small,
  },
  languageText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  scheduleSection: {
    marginVertical: theme.spacing.sm,
  },
  scheduleTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
});