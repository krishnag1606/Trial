import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { VideoCallScreen } from '../screens/VideoCallScreen';
import { PredictScreen } from '../screens/PredictScreen';
import { RecordsScreen } from '../screens/RecordsScreen';
import { BookScreen } from '../screens/BookScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
      }}
    >
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen 
        name="VideoCall" 
        component={VideoCallScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="Predict" component={PredictScreen} />
      <Stack.Screen name="Records" component={RecordsScreen} />
      <Stack.Screen name="Medicines" component={RecordsScreen} />
      <Stack.Screen name="Book" component={BookScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}