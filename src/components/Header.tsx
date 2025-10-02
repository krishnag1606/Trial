import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// Using Feather icons to better match the target design
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';

// Updated props to match the new design
type HeaderProps = {
  onNotificationsPress: () => void;
  onProfilePress: () => void;
  // This prop will determine which icon has the grey background
  activeIcon?: 'notifications' | 'profile';
};

export function Header({
  onNotificationsPress,
  onProfilePress,
  activeIcon = 'profile', // Defaulting to 'profile' as active, like in the design
}: HeaderProps) {
  const navigation = useNavigation();

  // A handler for the back button to automatically navigate back
  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    // The main container that positions the left and right elements
    <View style={styles.container}>
      {/* Left side: Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Feather name="chevron-left" size={40} color={theme.colors.text} />
      </TouchableOpacity>

      {/* Right side: Icon Group in a Pill Container */}
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={[
            styles.rightIconWrapper,
            activeIcon === 'notifications' && styles.activeIcon, // Apply active style conditionally
          ]}
          onPress={onNotificationsPress}>
          <Feather
            name="bell"
            size={30}
            color={theme.colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.rightIconWrapper,
            activeIcon === 'profile' && styles.activeIcon, // Apply active style conditionally
          ]}
          onPress={onProfilePress}>
          <Feather
            name="user"
            size={30}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    // The header itself is transparent, only the buttons have a background
    backgroundColor: 'transparent', 
    // Added marginTop to push the header down from the top edge
    marginTop: theme.spacing.md,
  },
  backButton: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.xs,
    // A 50% border radius on a square makes a perfect circle
    borderRadius: 50, 
    ...theme.shadows.light, // Using a shadow from your theme
  },
  rightContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    // A large radius creates the pill shape
    borderRadius: 50, 
    ...theme.shadows.light,
    // This is important to make the inner active background respect the border radius
    overflow: 'hidden', 
  },
  rightIconWrapper: {
    padding: theme.spacing.sm,
  },
  activeIcon: {
    // This is the light grey background for the active icon
    backgroundColor: theme.colors.border || '#EFEFEF', // Using a color from your theme or a fallback
  },
});

