import React from "react";
import { TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./Style";
import { images } from "../../../home/constant";
import { useNavigation } from '@react-navigation/native';
const BackButton = ({ }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => setTimeout(navigation.goBack, 0)} style={styles.headerContainer}>
      <FastImage
        style={styles.logoImg}
        source={images.back_button}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
