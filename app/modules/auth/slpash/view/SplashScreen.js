import React from "react";
import { View } from "react-native";
import styles from "./Style";
import { CONTEXT } from "../../../home/constant/theme";
import LogoComp from "../../component/logo";
import FastImage from "react-native-fast-image";
import { images } from "../../../home/constant";

const SplashScreen = () => {
  const renderHeaderTextContainer = () => (
    <View style={styles.imageContent}>
      <LogoComp title={CONTEXT.splashTitle} />
    </View>
  );
  const renderInputContainer = () => (
    <View style={styles.textInputContainer}>
      <FastImage source={images.dumbel} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeaderTextContainer()}
      {renderInputContainer()}
    </View>
  );
};

export default SplashScreen;
