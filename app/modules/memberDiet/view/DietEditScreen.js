import * as React from "react";

import { SafeAreaView, ScrollView, View } from "react-native";

import styles from "./Style";

import { COLORS, FONTS, icons, images } from "../../home/constant";
import DietList from "./component/DietListComponent";

const DietEditScreen = ({ navigation }) => {

  const ImageContainer = () => (
    <DietList
      imgUrl={images.diet_img}
      value={"edit"}
      navigation={navigation}
      type={"Breakfast"}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.themeGray }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.newAccountContainer}>{ImageContainer()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DietEditScreen;
