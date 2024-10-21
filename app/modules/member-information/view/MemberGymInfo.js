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

const MemberGymInfo = ({ navigation }) => {
  const Header = () => (
    <View style={styles.headView}>
      <Image
        source={icons.tab_profile}
        style={[styles.informationImage, { tintColor: COLORS.white }]}
      />
      <Text style={[styles.informationTextStyle, { marginLeft: scale(6) }]}>
        {CONTEXT.gymInfo}
      </Text>
    </View>
  );

  const List = () => (
    <View style={{ gap: 10, marginTop: "8%" }}>
      <TouchableOpacity
        style={styles.listView}
        onPress={() =>
          navigation.navigate(NavigationStrings.MEMBER_CENTER_INFO)
        }
      >
        <Text style={[styles.heading, { marginLeft: scale(6) }]}>
          {CONTEXT.centerIntro}
        </Text>

        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationStrings.MEMBER_PT_LIST)}
        style={styles.listView}
      >
        <Text style={[styles.heading, { marginLeft: scale(6) }]}>
          {CONTEXT.ptIntro}
        </Text>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.listView}
        onPress={() => {
          navigation.navigate(NavigationStrings.EQUIPMENT_DETAILS);
        }}
      >
        <Text style={[styles.heading, { marginLeft: scale(6) }]}>
          {CONTEXT.memberEquip}
        </Text>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() =>
        //   navigation.navigate(NavigationStrings.MEMBER_CENTER_EVENT)
        // }
        onPress={() =>
          navigation.navigate(NavigationStrings.FEEDBACK_TO_CENTER, { type: 3 })
        }
        style={styles.listView}
      >
        <Text style={[styles.heading, { marginLeft: scale(6) }]}>
          {CONTEXT.memberEvent}
        </Text>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() =>
        //   navigation.navigate(NavigationStrings.MEMBER_NOTICE_BOARD)
        // }
        onPress={() =>
          navigation.navigate(NavigationStrings.FEEDBACK_TO_CENTER, { type: 2 })
        }
        style={styles.listView}
      >
        <Text style={[styles.heading, { marginLeft: scale(6) }]}>
          {CONTEXT.memberNotice}
        </Text>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() =>
        //   navigation.navigate(NavigationStrings.MEMBER_CENTER_BULLETIN)
        // }
        onPress={() =>
          navigation.navigate(NavigationStrings.FEEDBACK_TO_CENTER, { type: 0 })
        }
        style={styles.listView}
      >
        <Text style={[styles.heading, { marginLeft: scale(6) }]}>
          {CONTEXT.memberBulletin}
        </Text>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listView}
        onPress={() =>
          navigation.navigate(NavigationStrings.FEEDBACK_TO_CENTER, { type: 1 })
        }
      >
        <Text style={[styles.heading, { marginLeft: scale(6) }]}>
          {CONTEXT.memberFeedback}
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

export default MemberGymInfo;
