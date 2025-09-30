import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { StorageService, StorageKeys } from '../utils/storage';
import seedData from '../../assets/data/seed.json';

interface Medicine {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  owned: boolean;
  category: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  qualifications: string;
  experience: string;
  availability: string;
  rating: number;
  consultationFee: string;
}

interface Record {
  id: string;
  title: string;
  date: string;
  type: string;
  summary: string;
}

interface Predictor {
  id: string;
  name: string;
  accuracy: string;
  description: string;
  hindiDescription: string;
}

interface Appointment {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
}

interface AppState {
  medicines: Medicine[];
  doctors: Doctor[];
  records: Record[];
  predictors: Predictor[];
  appointments: Appointment[];
  notifications: Notification[];
  language: string;
  userProfile: any;
}

type AppAction = 
  | { type: 'SET_MEDICINES'; payload: Medicine[] }
  | { type: 'ADD_MEDICINE'; payload: Medicine }
  | { type: 'UPDATE_MEDICINE'; payload: Medicine }
  | { type: 'DELETE_MEDICINE'; payload: string }
  | { type: 'SET_RECORDS'; payload: Record[] }
  | { type: 'ADD_RECORD'; payload: Record }
  | { type: 'SET_APPOINTMENTS'; payload: Appointment[] }
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'INITIALIZE_DATA'; payload: Partial<AppState> };

const initialState: AppState = {
  medicines: [],
  doctors: [],
  records: [],
  predictors: [],
  appointments: [],
  notifications: [],
  language: 'en',
  userProfile: null
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'INITIALIZE_DATA':
      return { ...state, ...action.payload };
    case 'SET_MEDICINES':
      return { ...state, medicines: action.payload };
    case 'ADD_MEDICINE':
      return { ...state, medicines: [...state.medicines, action.payload] };
    case 'UPDATE_MEDICINE':
      return {
        ...state,
        medicines: state.medicines.map(m => m.id === action.payload.id ? action.payload : m)
      };
    case 'DELETE_MEDICINE':
      return {
        ...state,
        medicines: state.medicines.filter(m => m.id !== action.payload)
      };
    case 'SET_RECORDS':
      return { ...state, records: action.payload };
    case 'ADD_RECORD':
      return { ...state, records: [...state.records, action.payload] };
    case 'SET_APPOINTMENTS':
      return { ...state, appointments: action.payload };
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, action.payload] };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => 
          n.id === action.payload ? { ...n, read: true } : n
        )
      };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  initializeData: () => Promise<void>;
  resetData: () => Promise<void>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const initializeData = async () => {
    try {
      // Load data from storage or use seed data
      const medicines = await StorageService.getItem<Medicine[]>(StorageKeys.MEDICINES) || seedData.medicines;
      const records = await StorageService.getItem<Record[]>(StorageKeys.RECORDS) || seedData.records;
      const appointments = await StorageService.getItem<Appointment[]>(StorageKeys.APPOINTMENTS) || seedData.appointments;
      const notifications = await StorageService.getItem<Notification[]>(StorageKeys.NOTIFICATIONS) || seedData.notifications;
      const language = await StorageService.getItem<string>(StorageKeys.LANGUAGE) || 'en';

      dispatch({
        type: 'INITIALIZE_DATA',
        payload: {
          medicines,
          doctors: seedData.doctors,
          records,
          predictors: seedData.predictors,
          appointments,
          notifications,
          language
        }
      });
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };

  const resetData = async () => {
    try {
      await StorageService.clear();
      dispatch({
        type: 'INITIALIZE_DATA',
        payload: {
          medicines: seedData.medicines,
          doctors: seedData.doctors,
          records: seedData.records,
          predictors: seedData.predictors,
          appointments: seedData.appointments,
          notifications: seedData.notifications,
          language: 'en'
        }
      });
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  // Save data to storage when state changes
  useEffect(() => {
    StorageService.setItem(StorageKeys.MEDICINES, state.medicines);
  }, [state.medicines]);

  useEffect(() => {
    StorageService.setItem(StorageKeys.RECORDS, state.records);
  }, [state.records]);

  useEffect(() => {
    StorageService.setItem(StorageKeys.APPOINTMENTS, state.appointments);
  }, [state.appointments]);

  useEffect(() => {
    StorageService.setItem(StorageKeys.NOTIFICATIONS, state.notifications);
  }, [state.notifications]);

  useEffect(() => {
    StorageService.setItem(StorageKeys.LANGUAGE, state.language);
  }, [state.language]);

  return (
    <AppContext.Provider value={{ state, dispatch, initializeData, resetData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}