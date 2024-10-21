import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NavigationStrings } from "../../../../constants";
import CustomButton from "../../component/button";
import LogoComp from "../../component/logo";
import styles from "./Style";
import { CONTEXT } from "../../../home/constant/theme";
import FastImage from "react-native-fast-image";
import { images } from "../../../home/constant";
const clothingData = [
  { id: "1", category: "T-Shirts" },
  { id: "2", category: "Jeans" },
  { id: "3", category: "Jackets" },
  { id: "4", category: "Dresses" },
  { id: "5", category: "Shoes" },
  // Add more categories as needed
];

const GymScreen = ({ navigation }) => {
  const [selectedView, setSelectedView] = useState(null);

  const clothingCategories = [
    { id: 1, name: "Gold-Gym", image: images.gymImage },
    { id: 2, name: "Frozen Gym", image: images.gymImage },
    { id: 3, name: "Lion Gym", image: images.gymImage },
    { id: 1, name: "Srk Gym", image: images.gymImage },
    { id: 2, name: "Farhan Gym", image: images.gymImage },
    { id: 3, name: "Ideal Gym", image: images.gymImage },
    // Add more categories with their respective images and names
  ];

  const renderHeaderTextContainer = () => <LogoComp title={CONTEXT.gymTitle} />;

  const renderTrainerContainer = () => (
    <View style={styles.textInputContainer}>
      <View style={styles.container}>
        <Text style={styles.textTrainer}>{CONTEXT.trainer}</Text>
        <FlatList
          data={clothingCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCategoryPress(item.id)}>
              <View style={styles.categoryContainer}>
                <FastImage source={item.image} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
  const renderMemberContainer = () => (
    <View style={styles.textInputContainer}>
      <View style={styles.container}>
        <Text style={styles.textTrainer}>{CONTEXT.member}</Text>
        <FlatList
          data={clothingCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCategoryPress(item.id)}>
              <View style={styles.categoryContainer}>
                <FastImage source={item.image} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <CustomButton
        title={"Trainer- Frozen Gym Login"}
        onPress={() => navigation.navigate(NavigationStrings.WELCOME_SCREEN)}
      />
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <ScrollView
        enabled={false}
        behavior="padding"
        style={{ flex: 1 }}
        contentContainerStyle={styles.keyboardAvoidingViewStyle}
      >
        <SafeAreaView style={{ alignItems: "center" }}>
          {renderHeaderTextContainer()}
          {renderTrainerContainer()}
          {renderMemberContainer()}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default GymScreen;
