import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ScaledSheet, scale } from "react-native-size-matters";
import _ from "lodash";
import { COLORS } from "../../home/constant";
import { FONTS, images } from "../../workout/constant";
import TrainerHeader from "../component/header";
import FastImage from "react-native-fast-image";
import { CONTEXT } from "../../home/constant/theme";
import { useFocusEffect } from "@react-navigation/native";
import getEquipmentDetails from "../../../api/profile/getEquipmentDetails";
import Spinner from "react-native-loading-spinner-overlay";
import HeaderComponent from "../component/HeaderComponent";

const EquipmentDetails = ({ navigation }) => {
  const [machinesList, setMachinesList] = useState([]);
  const [freeWeightList, setFreeWeightList] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          setLoading(true);
          const response = await getEquipmentDetails();
          setFreeWeightList(response?.data.equipments?.freeWeight);
          setMachinesList(response?.data.equipments?.machine);
        } catch (error) {
          console.log(JSON.stringify(error));
        } finally {
          setLoading(false);
        }
      }
      fetchMyAPI();
      return () => {};
    }, [])
  );

  const Header = () => (
    <HeaderComponent
      title={CONTEXT.memberEquip}
      onBackPress={() => navigation.goBack()}
    />
  );

  const renderMachine = ({ item, index }) => {
    return (
      <View style={styles.imagePlaceBackground}>
        <View style={styles.imageView}>
          <FastImage
            source={images.image_placeholder}
            style={styles.imagePlacePT}
          />
          <Text style={styles.emptyImageText}>img-{index + 1}</Text>
        </View>
        <Text style={styles.userTextStyle}>{item?.title}</Text>
      </View>
    );
  };

  const Container = () => (
    <View style={styles.containerUser}>
      <Text style={styles.userText}>Machines:</Text>
      <View style={styles.horizontalLine} />
      <View style={{ marginTop: 20, flex: 1 }}>
        <FlatList
          data={machinesList}
          renderItem={renderMachine}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );

  const List = () => (
    <View style={styles.gymView}>
      <FlatList
        data={freeWeightList}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.machineListContainer}>
              <View style={styles.centerIntroView}>
                <Image
                  source={images.dumble_color}
                  style={styles.machineImage}
                />
                <Text style={styles.largeTextStyle}>{item?.title}:</Text>
                <Text style={styles.machineQuentityText}>
                  {item?.quantity} {item?.unit ? item?.unit : ""}
                </Text>
              </View>
              {index + 1 !== freeWeightList.length && (
                <View style={styles.horizontalLine} />
              )}
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      {!loading ? (
        <SafeAreaView style={{ flex: 1 }}>
          {Header()}
          <ScrollView showsVerticalScrollIndicator={false}>
            {Container()}
            {List()}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      )}
    </View>
  );
};

export default EquipmentDetails;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.themeGray,
  },
  gymView: {
    marginTop: scale(18),
    width: scale(330),
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.lightBlack,
    borderRadius: scale(5),
    alignSelf: "center",
  },
  machineListContainer: {
    width: scale(330),
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.lightBlack,
    borderRadius: scale(5),
    alignSelf: "center",
  },
  machineImage: {
    width: scale(49),
    height: scale(24),
    resizeMode: "contain",
  },
  informationTextStyle: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
  },
  imagePlaceBackground: {
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    gap: 10,
    marginStart: 5,
  },
  imagePlacePT: {
    width: 45,
    height: 45,
    alignItems: "center",
  },
  containerUser: {
    flex: 1,
    width: scale(330),
    backgroundColor: COLORS.gray1,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  img: { width: 60, height: 60, alignSelf: "center" },
  userTextStyle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
    textAlign: "center",
  },
  emptyImageText: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "500",
  },
  userText: {
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_SEMBOLD,
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.ARCHI_MEDIUM,
    fontWeight: "500",
  },
  hashView: {
    width: scale(100),
    backgroundColor: COLORS.themeGray,
    alignSelf: "center",
    paddingVertical: scale(3),
    borderRadius: scale(5),
    marginTop: scale(8),
  },
  requestTextView: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  sessionIcon: {
    width: scale(25),
    height: scale(25),
    resizeMode: "contain",
  },
  largeTextStyle: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.ARCHI_MEDIUM,
    alignSelf: "center",
    fontWeight: "500",
  },
  machineQuentityText: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.ARCHI_REGULAR,
    alignSelf: "center",
    fontWeight: "800",
  },
  horizontalLine: {
    borderWidth: 0.7,
    borderColor: COLORS.gray,
    width: "100%",
    alignSelf: "center",
    marginTop: scale(15),
  },
  newAccountContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.themeGray,
    paddingBottom: scale(100),
  },
  centerIntroView: {
    alignItems: "center",
    gap: 15,
  },
  imageView: {
    backgroundColor: "grey",
    paddingBottom: 10,
    paddingTop: 15,
    borderRadius: 12,
    gap: 5,
    paddingHorizontal: 20,
  },
});
