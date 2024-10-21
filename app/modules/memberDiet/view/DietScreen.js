import * as React from "react";

import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import styles from "./Style";
import DietHeader from "./component/header";
import { COLORS, FONTS, images } from "../../home/constant";
import FastImage from "react-native-fast-image";
import RatingContainer from "./component/ratingComponent";
import CalendarModal from "./component/modal/CalendarModal";
import { PrimaryButton } from "../../../components";
import { icons } from "../../workout/constant";
import { NavigationStrings } from "../../../constants";

const DietScreen = ({ navigation }) => {
  const [defaultRating, setDefaultRating] = React.useState(2);
  const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);
  const [modalCalender, setModalCalender] = React.useState(false);
  const [shareVisible, setShareVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [share, setShare] = React.useState(false);

  const handleShareChange = (shareStatus) => {
    setShare(shareStatus);
  };
  const handleNavigation = (shareStatus) => {
    if (!share) {
      navigation.navigate(NavigationStrings.DIET_UPDATE);
    } else {
      navigation.navigate(NavigationStrings.DIET_EDIT);
    }
  };
  const Header = () => (
    <View
      style={{
        flex: 1,
        zIndex: 1,
      }}
    >
      <DietHeader
        onShareChange={handleShareChange}
        visible={true}
        onPress={() => setModalCalender(true)}
      />
    </View>
  );

  const ImageContainer = () => (
    <View
      style={{
        flex: 1,
      }}
    >
      <FastImage source={images.diet_img} style={styles.dietImg} />
    </View>
  );

  const RateContainer = () => (
    <RatingContainer
      navigation={navigation}
      maxRating={maxRating}
      defaultRating={defaultRating}
      setDefaultRating={(rating) => setDefaultRating(rating)}
    />
  );
  const ModalContainer = () => (
    <CalendarModal
      modalVisible={modalCalender}
      setModalVisible={setModalCalender}
      // selectedState={selectedState}
    />
  );
  const ButtonContainer = () => (
    <View
      style={{
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 30,
        alignSelf: "flex-end",
      }}
    >
      <PrimaryButton
        title={"Back"}
        style={100}
        color={true}
        imgUrl={icons.left_arrow}
        // onPress={() => handleButton()}
      />
      <PrimaryButton
        title={"Save"}
        style={100}
        onPress={() => handleNavigation()}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.themeGray }}>
      <ScrollView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.newAccountContainer}>
            {Header()}
            {ImageContainer()}
            {RateContainer()}
            {ButtonContainer()}
            {ModalContainer()}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DietScreen;
