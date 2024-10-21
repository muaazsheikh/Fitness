import * as React from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import styles from "./Style";
import Seperator from "../../../components/seperator";
import { scale } from "react-native-size-matters";
import { icons, images } from "../constant";
import { CONTEXT } from "../constant/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import { PrimaryButton } from "../../../components";
import { NavigationStrings } from "../../../constants";
const WorkOutTab = ({ navigation }) => {
  const [selectedView, setSelectedView] = React.useState("trainer");
  const [loading, setLoading] = React.useState(false);

  const handleViewPress = (view) => {
    setSelectedView(view);

    if (view === "member") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);

        navigation.navigate(NavigationStrings.TRAINER_DIET_COMPLETED);
        setSelectedView("trainer");
      }, 1000);
    }
  };

  const SeperatorContainer = () => (
    <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
      {selectedView === "trainer" ? (
        <View>
          <Seperator
            title={CONTEXT.workout_available}
            subTitle={CONTEXT.workout_placeholder}
            imageUrl={images.machine_placeholder}
            dimesion={250}
          />
          <PrimaryButton
            imgUrl={icons.notes_edit}
            title={"create"}
            onPress={() =>
              navigation.navigate(NavigationStrings.WORKOUT_COMPLETED)
            }
            style={90}
          />
        </View>
      ) : (
        <View>
          <Seperator
            title={CONTEXT.diet_placeholder}
            dimesion={150}
            // subTitle={CONTEXT.workout_placeholder}
            imageUrl={images.dish_placeholder}
          />

          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={"Loading..."}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      )}
    </View>
  );
  const WorkoutButton = () => (
    <View
      style={{
        alignSelf: "flex-end",
        marginVertical: scale(80),
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        // flex:1
      }}
    >
      <TouchableOpacity
        style={[
          styles.touchableView,
          selectedView === "trainer" && styles.selectedView,
        ]}
        onPress={() => {
          handleViewPress("trainer");
        }}
      >
        <FastImage
          source={
            selectedView === "trainer" ? images.dumble_tab : images.dumble_color
          }
          style={styles.dumbleImg}
        />
        <Text
          style={[
            styles.text,
            selectedView === "trainer" && styles.selectedText,
          ]}
        >
          {CONTEXT.workout_log}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.touchableView,
          selectedView === "member" && styles.selectedView,
        ]}
        onPress={() => handleViewPress("member")}
      >
        <FastImage
          source={
            selectedView === "member" ? images.banana_color : images.banana_tab
          }
          style={styles.bananaImg}
        />
        <Text
          style={[
            styles.text,
            selectedView === "member" && styles.selectedText,
          ]}
        >
          {CONTEXT.diet_log}
        </Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {SeperatorContainer()}
        {WorkoutButton()}
      </SafeAreaView>
    </View>
  );
};

export default WorkOutTab;
