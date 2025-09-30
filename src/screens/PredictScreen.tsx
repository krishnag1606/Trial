import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { theme } from '../styles/theme';
import { useTranslation } from 'react-i18next';

const symptoms = [
  { id: '1', name: 'Fever', severity: 0 },
  { id: '2', name: 'Cough', severity: 0 },
  { id: '3', name: 'Headache', severity: 0 },
  { id: '4', name: 'Fatigue', severity: 0 },
  { id: '5', name: 'Nausea', severity: 0 },
  { id: '6', name: 'Body Ache', severity: 0 },
];

export function PredictScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [selectedSymptoms, setSelectedSymptoms] = useState(symptoms);
  const [showResult, setShowResult] = useState(false);

  const updateSymptom = (id: string, severity: number) => {
    setSelectedSymptoms(prev =>
      prev.map(symptom =>
        symptom.id === id ? { ...symptom, severity } : symptom
      )
    );
  };

  const calculatePrediction = () => {
    const totalScore = selectedSymptoms.reduce((sum, symptom) => sum + symptom.severity, 0);
    const maxScore = selectedSymptoms.length * 3;
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    let prediction = 'Common Cold';
    let confidence = 75;
    
    if (percentage > 70) {
      prediction = 'Flu';
      confidence = 85;
    } else if (percentage > 50) {
      prediction = 'Viral Infection';
      confidence = 80;
    }
    
    return { prediction, confidence };
  };

  const handlePredict = () => {
    setShowResult(true);
  };

  const renderSymptom = (symptom) => (
    <View key={symptom.id} style={styles.symptomCard}>
      <Text style={styles.symptomName}>{symptom.name}</Text>
      <View style={styles.severityButtons}>
        {[1, 2, 3].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.severityButton,
              symptom.severity === level && styles.selectedSeverity
            ]}
            onPress={() => updateSymptom(symptom.id, level)}
          >
            <Text style={[
              styles.severityText,
              symptom.severity === level && styles.selectedSeverityText
            ]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (showResult) {
    const result = calculatePrediction();
    
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Prediction Result"
          showBack
          onBackPress={() => setShowResult(false)}
        />
        
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <Ionicons name="medical" size={64} color={theme.colors.primary} />
            <Text style={styles.resultTitle}>Prediction</Text>
            <Text style={styles.predictionText}>{result.prediction}</Text>
            <Text style={styles.confidenceText}>
              Confidence: {result.confidence}%
            </Text>
            <Text style={styles.disclaimer}>
              This is a mock prediction for demonstration purposes only. 
              Please consult a healthcare professional for accurate diagnosis.
            </Text>
            
            <TouchableOpacity 
              style={styles.consultButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.consultButtonText}>Consult Doctor</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={t('diseasePredict')}
        showBack
        onBackPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.instructionText}>
          Rate your symptoms on a scale of 1-3 (1: Mild, 2: Moderate, 3: Severe)
        </Text>
        
        {selectedSymptoms.map(renderSymptom)}
        
        <TouchableOpacity style={styles.predictButton} onPress={handlePredict}>
          <Text style={styles.predictButtonText}>{t('predict')}</Text>
          <Ionicons name="arrow-forward" size={20} color={theme.colors.surface} />
        </TouchableOpacity>
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
  scrollContent: {
    padding: theme.spacing.md,
  },
  instructionText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  symptomCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  symptomName: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.text,
  },
  severityButtons: {
    flexDirection: 'row',
  },
  severityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  },
  selectedSeverity: {
    backgroundColor: theme.colors.primary,
  },
  severityText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  selectedSeverityText: {
    color: theme.colors.surface,
  },
  predictButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.round,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  predictButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    marginRight: theme.spacing.sm,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  resultCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  resultTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginVertical: theme.spacing.md,
  },
  predictionText: {
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  confidenceText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  disclaimer: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: theme.spacing.lg,
  },
  consultButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.round,
  },
  consultButtonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
  },
});