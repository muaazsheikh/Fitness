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
import { images } from "../../workout/constant";
import TrainerHeader from "../component/header";
import { PrimaryButton } from "../../../components";
import { NavigationStrings } from "../../../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  profileFailure,
  profileRequest,
  profileSuccess,
} from "../../../redux/getProfileSlice";
import { getProfileApi } from "../../../api/profile/getProfile";
import Spinner from "react-native-loading-spinner-overlay";
import { DrawerActions } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

const MemberProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.profile?.loading);
  const profileData = useSelector((state) => state?.profile?.user?.data);
  // const memberData = profileData?.memberOwnProducts;
  React.useEffect(() => {
    async function fetchMyAPI() {
      try {
        dispatch(profileRequest());
        const response = await getProfileApi();
        dispatch(profileSuccess(response));
      } catch (error) {
        console.log(JSON.stringify(error));
        dispatch(profileFailure(error.message));
      }
    }
    fetchMyAPI();
  }, []);

  const formatStartDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear() % 100;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  };

  const formatEndDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear() % 100; // Get the last two digits of the year
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  };

  const startDate = formatStartDate(profileData?.membershipStartDate);
  const endDate = formatEndDate(profileData?.membershipEndDate);

  const Header = () => (
    <View>
      <TrainerHeader
        text="Profile"
        imageUrl={icons.setting}
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    </View>
  );

  const List = () => (
    <View style={{ gap: 10 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationStrings.MEMBER_GYM_INFO)}
        style={styles.listView}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={icons.tab_profile}
            style={[styles.informationImage, { tintColor: COLORS.white }]}
          />
          <Text style={[styles.informationTextStyle, { marginLeft: scale(6) }]}>
            Gym Info
          </Text>
        </View>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NavigationStrings.MEMBER_THEJAL_INFO)
        }
        style={styles.listView}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={icons.hand_dumb} style={styles.informationImage} />
          <Text style={[styles.informationTextStyle, { marginLeft: scale(6) }]}>
            Thejal Info
          </Text>
        </View>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>
    </View>
  );

  const Container = () => (
    <>
      <View style={styles.containerUser}>
        <FastImage
          defaultSource={images.User}
          style={styles.img}
          source={{ uri: profileData?.mProfileImg?.prof_img1_min }}
        />
        <View
          style={[
            styles.rowDirectionView,
            { alignSelf: "center", marginTop: 10 },
          ]}
        >
          <Text style={styles.userText}>{profileData?.name}</Text>
          <Image source={icons.star_bach} style={[styles.informationImage]} />
        </View>
        <View style={styles.hashView}>
          <Text style={styles.userTextStyle}># {profileData?.userCode}</Text>
        </View>
        <View style={[styles.userHeaderList]}>
          <View>
            <View style={[styles.requestTextView]}>
              <Image source={icons.people} style={[styles.sessionIcon]} />
            </View>
            <Text
              numberOfLines={2}
              style={[
                styles.largeTextStyle,
                { width: 70, textAlign: "center" },
              ]}
            >
              {profileData?.gymDetails?.name}
            </Text>
          </View>

          <View style={styles.verticalLine} />

          <View>
            <View style={[styles.requestTextView]}>
              <Image source={icons.id_card} style={[styles.sessionIcon]} />
            </View>
            <View style={[styles.rowDirectionView, { alignSelf: "center" }]}>
              <Image
                source={images.CalendarIcon}
                style={[styles.icon, { marginRight: 5 }]}
              />
              <Text style={[styles.heading, { fontSize: 15 }]}>
                {startDate || 0}-{endDate || 0}
              </Text>
            </View>
          </View>

          <View style={styles.verticalLine} />

          <View>
            <View style={[styles.requestTextView]}>
              <Image
                source={icons.Session_icon}
                style={[styles.sessionIcon, { tintColor: COLORS.white }]}
              />
            </View>
            <Text style={styles.largeTextStyle}>
              <Text style={styles.userText}>
                {profileData?.sessionCompleted}
              </Text>
              /{profileData?.sessionCount}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 8 }}>
          <PrimaryButton
            title={"My Info"}
            style={90}
            edit={true}
            color={false}
            onPress={() =>
              navigation.navigate(NavigationStrings.MEMBER_PROFILE_MYINFO)
            }
          />
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Header()}
        <ScrollView>
          {Container()}
          {List()}
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MemberProfile;
