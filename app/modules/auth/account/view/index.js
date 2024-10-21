import React from "react";
import { View } from "react-native";
import AcccountSelect from "./AcccountSelect";
import styles from "./Style";

const AccountContainer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AcccountSelect navigation={navigation} />
    </View>
  );
};

export default AccountContainer;
