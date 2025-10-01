import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { MedicinesScreen } from '../screens/MedicinesScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function EmptyComponent() {
  return null;
}

// --- NEW HELPER COMPONENT for individual blurred icon backgrounds ---
function TabBarIconWithBackground({ name, color, focused }) {
  // Use solid icon when focused, outline otherwise
  const iconName = focused ? name : `${name}-outline`;
  return (
    <View style={styles.iconContainer}>
      <BlurView
        intensity={0}
        style={StyleSheet.absoluteFill}
      />
      <Ionicons name={iconName} size={28} color={color} />
    </View>
  );
}


function CustomTabBarButton({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.predictButton}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={['#29ABE2', '#D400CD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.predictButtonInner}
      >
        <View style={styles.predictButtonCenter}>
          <Ionicons name="sparkles-sharp" size={30} color="#FFF" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        // --- MODIFICATION 1: Differentiate active and inactive icon colors ---
        tabBarActiveTintColor: '#FFFFFF', // Solid white for active
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white for inactive
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 30 : 15,
          left: 20,
          right: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.82)',
          borderRadius: 35,
          height: 70,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
      tabBarBackground={() => (
        <BlurView
          tint="dark"
          intensity={80}
          style={styles.blurView}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // --- MODIFICATION 2: Use the new blurred container component ---
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconWithBackground name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={MedicinesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconWithBackground name="search" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Predict"
        component={EmptyComponent}
        options={{
          tabBarButton: props => (
            <CustomTabBarButton
              {...props}
              onPress={() => navigation.navigate('Predict')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconWithBackground name="notifications" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconWithBackground name="settings" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  // --- MODIFICATION 3: Added styles for the icon container ---
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    bottom: -10,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'none',
  },
  predictButton: {
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7F5DF0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  predictButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  predictButtonCenter: {
    width: 57,
    height: 57,
    borderRadius: 28.5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 35,
    overflow: 'hidden',
  },
});