import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Small Fix: Changed this from 'नमस्ते' to 'Hello'
      greeting: 'Hello',
      howAreYou: 'How are you feeling today, Anmol?',
      predictYourDisease: 'Predict Your Disease',
      accuracy: 'UPTO 91% accuracy',
      videoCall: 'Video Call',
      schedule: 'Schedule',
      checkRecords: 'CHECK RECORDS',
      medicines: 'MEDICINES',
      book: 'BOOK',
      topPredictors: 'TOP PREDICTORS',
      predict: 'PREDICT',
      tuberculosis: 'TUBERCULOSIS',
      malaria: 'MALARIA',
      dengue: 'DENGUE',
      typhoid: 'TYPHOID',
      heartDisease: 'HEART DISEASE',
      home: 'Home',
      search: 'Search',
      notifications: 'Notifications',
      settings: 'Settings',
      language: 'Language',
      english: 'English',
      hindi: 'Hindi',
      profile: 'Profile',
      doctorDetails: 'Doctor Details',
      bookAppointment: 'Book Appointment',
      medicalRecords: 'Medical Records',
      myMedicines: 'My Medicines',
      diseasePredict: 'Disease Prediction',
      videoCallWith: 'Video Call with',
      endCall: 'End Call',
      mute: 'Mute',
      camera: 'Camera',
      // --- ADDED THIS LINE ---
      bottomActionsDescription: "In India, heart diseases mainly include diseases of the cardiovascular vessels, such as coronary heart disease (CHD), which is the main cause of heart attacks, and cerebrovascular disease (like stroke). Other related conditions include peripheral artery disease, rheumatic heart disease, and congenital heart disease."
    }
  },
  hi: {
    translation: {
      greeting: 'नमस्ते',
      howAreYou: 'आज आप कैसा महसूस कर रहे हैं, अनमोल?',
      predictYourDisease: 'अपनी बीमारी का अनुमान लगाएं',
      accuracy: '91% तक सटीकता',
      videoCall: 'वीडियो कॉल',
      schedule: 'अनुसूची',
      checkRecords: 'रिकॉर्ड जांचें',
      medicines: 'दवाइयां',
      book: 'बुक करें',
      topPredictors: 'शीर्ष भविष्यवाणी',
      predict: 'अनुमान लगाएं',
      tuberculosis: 'तपेदिक',
      malaria: 'मलेरिया',
      dengue: 'डेंगू',
      typhoid: 'टाइफाइड',
      heartDisease: 'हृदय रोग',
      home: 'होम',
      search: 'खोज',
      notifications: 'सूचनाएं',
      settings: 'सेटिंग्स',
      language: 'भाषा',
      english: 'अंग्रेजी',
      hindi: 'हिंदी',
      profile: 'प्रोफ़ाइल',
      doctorDetails: 'डॉक्टर विवरण',
      bookAppointment: 'अपॉइंटमेंट बुक करें',
      medicalRecords: 'मेडिकल रिकॉर्ड',
      myMedicines: 'मेरी दवाइयां',
      diseasePredict: 'रोग पूर्वानुमान',
      videoCallWith: 'वीडियो कॉल',
      endCall: 'कॉल समाप्त करें',
      mute: 'मूक',
      camera: 'कैमरा',
      // --- ADDED THIS LINE ---
      bottomActionsDescription: "भारत में हृदय रोगों में मुख्य रूप से हृदय संबंधी रक्त वाहिकाओं की बीमारियाँ, जैसे कोरोनरी हृदय रोग (CVD) शामिल हैं, जो दिल के दौरे का मुख्य कारण है, और सेरेब्रोवास्कुलर रोग (जैसे स्ट्रोक). अन्य संबंधित स्थितियों में परिधीय धमनी रोग, आमवाती हृदय रोग और जन्मजात हृदय रोग शामिल हैं. इन बीमारियों के जोखिम कारकों में उच्च रक्तचाप, मोटापा, उच्च कोलेस्ट्रॉल, मधुमेह, धूम्रपान और अस्वास्थ्यकर आहार शामिल हैं।"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;