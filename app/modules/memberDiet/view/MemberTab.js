import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./Style";
import Seperator from "../../../components/seperator";
import { scale } from "react-native-size-matters";
import { icons, images } from "../../workout/constant";
import { CONTEXT } from "../../workout/constant/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import { PrimaryButton } from "../../../components";
import { NavigationStrings } from "../../../constants";
import { COLORS } from "../../home/constant";
const MemberTab = ({ navigation }) => {
  const [selectedView, setSelectedView] = React.useState("member");

  const SeperatorContainer = () => (
    <View style={{ flex: 1, backgroundColor: COLORS.themeGray }}>
      <View>
        <Seperator
          title={CONTEXT.diet_placeholder}
          dimesion={150}
          subTitle={CONTEXT.workout_placeholder}
          imageUrl={images.dish_placeholder}
        />
        <PrimaryButton
          imgUrl={icons.notes_edit}
          title={"create"}
          onPress={() =>
            navigation.navigate(NavigationStrings.DIET_CREATE_SCREEN)
          }
          style={90}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.themeGray }}>
        {SeperatorContainer()}
      </SafeAreaView>
    </View>
  );
};

export default MemberTab;
