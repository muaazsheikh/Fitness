import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import styles from "./Style";

const FlashMessage = ({ message, duration = 3000, bottom, top }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, duration);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity, bottom: bottom ? 100 : null, top: top ? 50 : null },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

export default FlashMessage;
