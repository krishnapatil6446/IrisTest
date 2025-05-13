import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Animated, Text } from 'react-native';

export default function Index() {
  // Set up animated value for the loading bar
  const [loadingProgress] = useState(new Animated.Value(0));
  
  useEffect(() => {
    // Make sure the status bar is set to black
    if (StatusBar.setBarStyle) {
      StatusBar.setBarStyle('light-content', true);
    }
    
    // Start the loading animation when the component mounts
    Animated.timing(loadingProgress, {
      toValue: 1,
      duration: 3000, // 3 seconds to complete
      useNativeDriver: false, // Required for width animations
    }).start();
  }, []);
  
  // Calculate the width of the loading bar based on the progress value
  const loadingBarWidth = loadingProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '80%'], // Go from 0% to 80% of container width
  });

  return (
    <View style={styles.container}>
      {/* Make the status bar black too */}
      <StatusBar backgroundColor="black" barStyle="light-content" />
      
      {/* Error Message */}
      <Text style={styles.errorText}>VERSION NOT SUPPORTED</Text>
      
      {/* Horizontal loading bar */}
      <View style={styles.loadingBarContainer}>
        <Animated.View 
          style={[
            styles.loadingBar,
            { width: loadingBarWidth }
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF3B30', // iOS error red color
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  loadingBarContainer: {
    width: '80%',
    height: 6,
    backgroundColor: '#333', // Dark gray background for the loading bar container
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 10,
  },
  loadingBar: {
    height: '100%',
    backgroundColor: 'white', // White loading bar
  }
});