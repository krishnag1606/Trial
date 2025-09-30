import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { MedicinesScreen } from '../screens/MedicinesScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { theme } from '../styles/theme';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

function EmptyComponent() {
  return null;
}

function CustomTabBarButton({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.predictButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.predictButtonInner}>
        <Ionicons name="medical" size={28} color={theme.colors.surface} />
      </View>
    </TouchableOpacity>
  );
}

export function BottomTabNavigator() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          ...theme.shadows.small,
        },
        tabBarLabelStyle: {
          fontSize: theme.fontSize.xs,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('home'),
        }}
      />
      <Tab.Screen
        name="Search"
        component={MedicinesScreen}
        options={{
          title: t('search'),
        }}
      />
      <Tab.Screen
        name="Predict"
        component={EmptyComponent}
        options={{
          title: '',
          tabBarButton: (props) => (
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
          title: t('notifications'),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('settings'),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  predictButton: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  predictButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
    borderWidth: 4,
    borderColor: theme.colors.surface,
  },
});