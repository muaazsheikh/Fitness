import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { NavigationStrings } from "../../../../constants";
import CustomButton from "../../component/button";
import LogoComp from "../../component/logo";
import styles from "./Style";
import { COLORS, CONTEXT } from "../../../home/constant/theme";
import { images } from "../../../home/constant";

const AcccountSelect = ({ navigation }) => {
  const [selectedView, setSelectedView] = useState("trainer");

  const handleViewPress = (view) => {
    setSelectedView(view);
  };
  const renderHeaderTextContainer = () => (
    // <LogoComp title={CONTEXT.multiplegym} />
    <LogoComp title={CONTEXT.accountTitle} />
  );

  const renderInputContainer = () => (
    <View style={styles.textInputContainer}>
      <View style={{ alignSelf: "center", marginBottom: 50 }}>
        <TouchableOpacity
          style={[
            styles.touchableView,
            selectedView === "trainer" && styles.selectedView,
          ]}
          onPress={() => {
            handleViewPress("trainer");
          }}
        >
          <Text
            style={[
              styles.text,
              selectedView === "trainer" && styles.selectedText,
            ]}
          >
            {CONTEXT.trainer}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.touchableView,
            selectedView === "member" && styles.selectedView,
          ]}
          onPress={() => {
            handleViewPress("member");
          }}
        >
          <Text
            style={[
              styles.text,
              selectedView === "member" && styles.selectedText,
            ]}
          >
            {CONTEXT.member}
          </Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        title={CONTEXT.next}
        onPress={() =>
          navigation.navigate(NavigationStrings.WELCOME_SCREEN, {})
        }
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
          {renderInputContainer()}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default AcccountSelect;
