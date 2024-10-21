import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScaledSheet, scale } from "react-native-size-matters";
import _ from "lodash";
import { COLORS, icons } from "../../home/constant";
import { FONTS, images } from "../../workout/constant";
import TrainerHeader from "../component/header";
import FastImage from "react-native-fast-image";
import { CONTEXT } from "../../home/constant/theme";
import { useFocusEffect } from "@react-navigation/native";
import getEquipmentDetails from "../../../api/profile/getEquipmentDetails";
import Spinner from "react-native-loading-spinner-overlay";
import { PrimaryButton } from "../../../components";
import getContactThejal from "../../../api/profile/getContactThejal";
import HeaderComponent from "../component/HeaderComponent";
import { NavigationStrings } from "../../../constants";

const ContactMoreThejal = ({ navigation }) => {
  const [machinesList, setMachinesList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          setLoading(true);
          const response = await getContactThejal();
          setData(response?.data);
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
    <View style={{ padding: 5 }}>
      <HeaderComponent
        title={CONTEXT.contact_more}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );

  const List = () => (
    <>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={images.logo} // Replace with your logo path
            style={styles.logo}
          />
          <Image
            source={images.contact_user} // Replace with your logo path
            style={[styles.imageView, { marginRight: 10 }]}
          />
          <Text style={styles.userName}>{data?.representativeName}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Image
            source={images.location} // Replace with your logo path
            style={styles.imageView}
          />
          <Text style={styles.infoText}>{data?.address}</Text>
        </View>
        <View style={styles.row} />

        <View style={styles.infoRow}>
          <Image
            source={icons.noteIcon} // Replace with your logo path
            style={styles.imageView}
          />
          <Text style={styles.infoText}>
            {CONTEXT.business_reg} {data?.businessRegNo}
          </Text>
        </View>
        <View style={styles.row} />

        <View style={styles.infoRow}>
          <Image
            source={icons.hosting} // Replace with your logo path
            style={styles.imageView}
          />
          <Text style={styles.infoText}>
            {CONTEXT.hosting} {data?.hosting}
          </Text>
        </View>
        <View style={styles.row} />

        <View style={styles.infoRow}>
          <Image
            source={icons.online} // Replace with your logo path
            style={styles.imageView}
          />
          <Text style={styles.infoText}>
            {CONTEXT.online_sales} {data?.onlineSalesRegNo}
          </Text>
        </View>
        <View style={styles.row} />

        <View style={styles.infoRow}>
          <Image
            source={icons.company} // Replace with your logo path
            style={styles.imageView}
          />
          <Text style={styles.infoText}>
            {CONTEXT.company_name} {data?.companyName}
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.newAccountContainer}>
      {!loading ? (
        <SafeAreaView style={{ flex: 1 }}>
          {Header()}
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* {Container()} */}
            {List()}
            <TouchableOpacity
              style={styles.contactThejalButton}
              onPress={() => navigation.navigate(NavigationStrings.THEJAL_CONTACT)}
            >
              <Text style={styles.infoText}>Contact to Thejal</Text>
            </TouchableOpacity>
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

export default ContactMoreThejal;

const styles = StyleSheet.create({
  newAccountContainer: {
    flex: 1,
    backgroundColor: COLORS.themeGray,
    paddingBottom: scale(100),
  },
  centerIntroView: {
    alignItems: "center",
    gap: 15,
  },
  card: {
    backgroundColor: "#353638",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: "95%",
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
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: FONTS.ARCHI_REGULAR,
  },
  infoContainer: {
    backgroundColor: "#353638",
    borderRadius: 10,
    width: "95%",
    alignSelf: "center",
    alignContent: "center",
    paddingVertical: 10,
    gap: 20,
    marginTop: 8,
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
  contactThejalButton: {
    width: "95%",
    height: 40,
    backgroundColor: "#353638",
    alignSelf: "center",
    marginTop: 30,
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
