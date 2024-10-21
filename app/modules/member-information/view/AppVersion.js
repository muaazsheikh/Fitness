import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScaledSheet, scale } from "react-native-size-matters";
import _ from "lodash";
import { COLORS, icons } from "../../home/constant";
import { FONTS, images } from "../../workout/constant";
import TrainerHeader from "../component/header";
import FastImage from "react-native-fast-image";
import { CONTEXT } from "../../home/constant/theme";
import Spinner from "react-native-loading-spinner-overlay";
import { PrimaryButton } from "../../../components";
import DeviceInfo from "react-native-device-info";
import HeaderComponent from "../component/HeaderComponent";

const AppVersion = ({ navigation }) => {
  const [machinesList, setMachinesList] = useState([]);
  const [freeWeightList, setFreeWeightList] = useState([]);
  const [loading, setLoading] = useState(false);
  const version = DeviceInfo.getVersion();

  const Header = () => (
    <View style={{padding:5}}>
      <HeaderComponent
        title={CONTEXT.app_version}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );

  const List = () => (
    <View>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.userName}>
            {CONTEXT.version} {version}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      {!loading ? (
        <SafeAreaView style={{ flex: 1 }}>
          {Header()}
          <ScrollView showsVerticalScrollIndicator={false}>
            {List()}
            <View
              style={[styles.buttonViewNew, { justifyContent: "flex-end" }]}
            >
              <PrimaryButton
                title={"< Back"}
                style={80}
                edit={true}
                color={true}
                onPress={() => navigation.goBack()}
              />
            </View>
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

export default AppVersion;

const styles = StyleSheet.create({
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
  card: {
    backgroundColor: COLORS.calendarColor,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    width: scale(330),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: "contain",
  },
  imageView: {
    width: 20,
    height: 20,
    marginLeft: 10,
    resizeMode: "contain",
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontFamily: FONTS.ARCHI_REGULAR,
  },
  infoContainer: {
    backgroundColor: COLORS.calendarColor,
    borderRadius: 10,

    width: scale(330),
    alignSelf: "center",
    alignContent: "center",
    paddingVertical: 10,
    gap: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    borderColor: "grey",
    alignItems: "center",
  },
  row: {
    borderTopWidth: 1,
    borderColor: "grey",
    alignSelf: "center",
    width: scale(300),
  },
  infoText: {
    color: "#fff",
    marginLeft: 10,
    fontFamily: FONTS.ARCHI_SEMBOLD,
  },
  buttonViewNew: {
    width: scale(170),
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    marginTop: scale(15),
    marginRight: scale(20),
    gap: 10,
  },
});
