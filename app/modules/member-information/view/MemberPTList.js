import React, { useState } from "react";

import {
  FlatList,
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
import FastImage from "react-native-fast-image";
import { PrimaryButton } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { CONTEXT } from "../../home/constant/theme";
import { useFocusEffect } from "@react-navigation/native";
import getPTTrainerListApi from "../../../api/trainer-profile/getPTTrainerListApi";
import { NavigationStrings } from "../../../constants";
import { updateSessionID } from "../../../redux/workoutSlice";
import Spinner from "react-native-loading-spinner-overlay";
import HeaderComponent from "../component/HeaderComponent";

const MemberPTList = ({ navigation }) => {
  const [PTTrainerListData, setPTTrainerListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [ptSessions, setPtSessions] = useState({
    currentPT: [],
    expiredPT: [],
  });

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        setLoading(true);
        try {
          const response = await getPTTrainerListApi();
          console.log(JSON.stringify(response));
          setPTTrainerListData(response?.data?.trainerList);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(JSON.stringify(error));
        }
      }
      fetchMyAPI();
      return () => {};
    }, [])
  );

  const handleNavigation = (id) => {
    dispatch(updateSessionID(id));
    navigation.navigate(NavigationStrings.MEMBER_PT_INFO);
  };

  const Header = () => (
    <HeaderComponent
      title={CONTEXT.ptIntro}
      onBackPress={() => navigation.goBack()}
    />
  );

  const PTTrainerList = () => (
    <>
      <FlatList
        data={PTTrainerListData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => handleNavigation(item?.id)}
              style={[styles.PTListView]}
            >
              <View style={styles.row}>
                <FastImage source={images.User} style={styles.imagePlacePT} />
                <View>
                  <Text style={styles.heading}>{item?.userDetails?.name}</Text>
                  <View
                    style={[
                      styles.rowViewPT,
                      {
                        marginTop: 5,
                        width: scale(260),
                        alignItems: "center",
                        gap: 12,
                      },
                    ]}
                  >
                    <View style={styles.itemTagStyle}>
                      <FastImage
                        source={icons.star_badge}
                        style={{ height: 20, width: 18 }}
                      />
                      <Text style={[styles.largeTextStyle, { marginTop: 0 }]}>
                        {item?.experiencedYear} {CONTEXT.yrs}
                      </Text>
                    </View>

                    <View style={styles.divider} />
                    <View style={styles.itemTagStyle}>
                      <Image
                        source={icons.star}
                        style={[
                          styles.rateIcon,
                          { marginRight: 0, tintColor: "white" },
                        ]}
                      />
                      <Text style={[styles.largeTextStyle, { marginTop: 0 }]}>
                        {item?.avgRating}
                      </Text>
                    </View>
                    {!!item?.badge && (
                      <>
                        <View style={styles.divider} />
                        <View style={styles.itemTagStyle}>
                          <FastImage
                            source={
                              item?.badge === "Rising Star"
                                ? icons.rising_star
                                : item?.badge === "Team Leader"
                                ? icons.team_leader
                                : item?.badge === "Compet Winner"
                                ? icons.competition_winner
                                : images.competition_experience
                            }
                            style={[
                              styles.rateIcon,
                              { marginRight: 0 },
                              item?.badge === "Rising Star"
                                ? { width: 37, height: 15 }
                                : item?.badge === "Team Leader"
                                ? { width: 22, height: 28 }
                                : { width: 20, height: 20 },
                            ]}
                          />
                          <Text
                            style={[styles.largeTextStyle, { marginTop: 0 }]}
                          >
                            {item?.badge}
                          </Text>
                        </View>
                      </>
                    )}
                  </View>
                </View>
              </View>

              <View
                style={{
                  ...styles.horizontalLine,
                  marginTop: scale(5),
                  color: "#FFFFFF",
                }}
              />
              <View style={[styles.rowViewPT, { marginTop: 15, gap: 5 }]}>
                <Image
                  source={icons.Session_icon}
                  style={[styles.rateIcon, { marginRight: 0 }]}
                />
                <Text style={[styles.userTextStyle, { marginTop: 0 }]}>
                  {item?.sessionCount} {CONTEXT.session}
                </Text>
                <View
                  style={[styles.verticalLine, { marginTop: 0, height: 20 }]}
                />
                <FastImage
                  source={images.user_name}
                  style={[styles.rateIcon, { marginRight: 0 }]}
                />
                <Text style={[styles.userTextStyle, { marginTop: 0 }]}>
                  {item?.membersCount} {CONTEXT.ptMember}
                </Text>
                <View
                  style={[styles.verticalLine, { marginTop: 0, height: 20 }]}
                />
                <FastImage
                  source={images.workout_log}
                  style={[styles.rateIcon, { marginRight: 0 }]}
                />
                <Text style={[styles.userTextStyle, { marginTop: 0 }]}>
                  <Text style={[styles.userTextStyle, { color: "#CCFF00" }]}>
                    {Math.floor(item?.workoutPercentage) + "% "}
                  </Text>
                  {CONTEXT.workout_log}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );

  const List = () => (
    <View style={{ gap: 10, marginBottom: "30%" }}>{PTTrainerList()}</View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {!loading && (
          <>
            {Header()}
            <ScrollView showsVerticalScrollIndicator={false}>
              {List()}
            </ScrollView>
          </>
        )}
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      </SafeAreaView>
    </View>
  );
};

export default MemberPTList;
