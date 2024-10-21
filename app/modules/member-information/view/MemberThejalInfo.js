import * as React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./Style";
import { scale } from "react-native-size-matters";
import _ from "lodash";
import { COLORS, icons } from "../../home/constant";
import { NavigationStrings } from "../../../constants";
import { PrimaryButton } from "../../../components";
import { CONTEXT } from "../../home/constant/theme";

const MemberThejalInfo = ({ navigation }) => {
  const Header = () => (
    <View style={styles.headView}>
      <Image source={icons.hand_dumb} style={styles.informationImage} />
      <Text style={[styles.informationTextStyle, { marginLeft: scale(10) }]}>
        Thejal info
      </Text>
    </View>
  );

  const List = () => (
    <View style={{ gap: 10, marginTop: "8%" }}>
      <TouchableOpacity
        style={styles.listView}
        onPress={() => navigation.navigate(NavigationStrings.SERVICE_INTRO)}
      >
        <Text style={[styles.heading, { marginLeft: scale(6) }]}>
          {CONTEXT.service_Intro}
        </Text>

        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationStrings.APP_VERSION)}
        style={styles.listView}
      >
        <Text style={[styles.heading, { marginLeft: scale(6) }]}>
          {CONTEXT.app_version}
        </Text>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationStrings.THEJAL_NEWS)}
        style={styles.listView}
      >
        <Text style={[styles.heading, { marginLeft: scale(6) }]}>
          {CONTEXT.more_news}
        </Text>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationStrings.CONTACT_THEJAL)}
        style={styles.listView}
      >
        <Text style={[styles.heading, { marginLeft: scale(6) }]}>
          {CONTEXT.contact_more}
        </Text>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>
      <View style={[styles.buttonViewNew, { justifyContent: "flex-end" }]}>
        <PrimaryButton
          title={"< Back"}
          style={80}
          edit={true}
          color={true}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Header()}
        <ScrollView showsVerticalScrollIndicator={false}>{List()}</ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MemberThejalInfo;
