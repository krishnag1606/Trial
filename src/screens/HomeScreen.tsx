// HomeScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

  // ... (rest of your handler functions remain the same)
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
            {/* --- MODIFICATION START --- */}
            <Text style={styles.greeting}>
              {/* Nested Text component to apply a different color */}
              <Text style={styles.greetingHighlight}>{t('greeting')}{t(',')}</Text>
              {'\n'}
              {t('howAreYou')}
            </Text>
            {/* --- MODIFICATION END --- */}
            <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
              <Text style={styles.languageText}>
                {i18n.language === 'en' ? 'हिंदी' : 'English'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <PredictCard onPress={handlePredict} />
        
        <View style={styles.screen}>
          {state.doctors.length > 0 && (
            <DoctorCard
              doctor={state.doctors[0]}
              onVideoCall={handleVideoCall}
            />
          )}

          <View style={styles.scheduleWrapper}>
            <View style={styles.scheduleSection}>
              <Text style={styles.scheduleTitle}>{t('schedule')}</Text>
              <ScheduleDots />
            </View>
          </View>
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
    fontSize: theme.fontSize.lg, // Use a larger size for the whole block
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.md,
    fontFamily: 'Helvetica-Bold', // This will now work after loading the font
    lineHeight: 30, // Adjust line height for better spacing
  },
  // --- NEW STYLE ADDED ---
  greetingHighlight: {
    fontSize: theme.fontSize.xxxl, // Even larger size for the highlighted part
    color: theme.colors.primary, // This applies the blue color
    fontFamily: 'Helvetica-Bold', // Ensure it also uses the bold font
  },
  // -----------------------
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
  // ... (rest of your styles remain the same)
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.md,
  },
  scheduleWrapper: {
    marginHorizontal: theme.spacing.md,
    marginTop: -56,
  },
  scheduleSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    ...theme.shadows.light,
  },
  scheduleTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
});