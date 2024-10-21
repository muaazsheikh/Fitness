import React, { useState, useEffect } from "react";
import {
  Alert,
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
import getPTTrainerApi from "../../../api/trainer-profile/getPTTrainerApi";

const MemberPTIntro = ({ navigation }) => {
  const dispatch = useDispatch();
  const itemId = useSelector((state) => state?.work?.sessionId);
  const [trainerDetail, setTrainerDetail] = useState(null); // Initialize as null

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          const response = await getPTTrainerApi(itemId);
          console.log("ptttttt", JSON.stringify(response.data));
          setTrainerDetail(response?.data);
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      }
      fetchMyAPI();
      return () => {};
    }, [itemId])
  );

  const Header = () => (
    <View>
      <TrainerHeader
        text={CONTEXT.ptIntro}
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    </View>
  );

  const renderImages = () => {
    const imagesArray = Array.isArray(
      trainerDetail?.trainerDetails?.mProfileImg
    )
      ? trainerDetail?.trainerDetails?.mProfileImg
      : [trainerDetail?.trainerDetails?.mProfileImg];

    return imagesArray.map((image, index) => (
      <View key={index} style={styles.imagePlaceBackground}>
        <FastImage
          source={{ uri: image.prof_img1_min }}
          style={{...styles.imagePlacePT,height:'100%',width:'100%',borderRadius:999}}
        />
      </View>
    ));
  };

  const Container = () => (
    <>
      <View style={styles.containerUser}>
        {trainerDetail?.trainerDetails?.mProfileImg ? (
          <FastImage
            source={{
              uri: trainerDetail?.trainerDetails?.mProfileImg.prof_img1_min,
            }}
            style={styles.img}
          />
        ) : (
          <Image source={images.User} style={styles.img} />
        )}

        <View
          style={[
            styles.rowDirectionView,
            { alignSelf: "center", marginTop: 10 },
          ]}
        >
          <Text style={styles.userText}>
            {trainerDetail?.trainerDetails?.name}
          </Text>
        </View>

        <View style={styles.rowViewAndIcon}>
          <Text style={[styles.emailText, { color: COLORS.themGreen }]}>
            ({trainerDetail?.trainerDetails?.staffType})
          </Text>
        </View>

        <View style={styles.rowViewAndIcon}>
          <Text style={styles.largeTextStyle}>
            {CONTEXT.experience}:{trainerDetail?.trainerDetails?.experience}{" "}
            {CONTEXT.yrs}
          </Text>
          <Image
            source={icons.star_icon}
            style={[styles.rateIcon, { marginLeft: 4,marginTop:4, tintColor: "gray" }]}
          />
        </View>

        <View style={[styles.imageList, { paddingHorizontal: 35 }]}>
          {trainerDetail?.trainerDetails?.mProfileImg && renderImages()}
        </View>
      </View>
    </>
  );

  const Career = () => (
    <>
      {trainerDetail && (
        <View style={styles.gymView}>
          <View style={styles.rowView}>
            <Image source={images.career} style={styles.rateIcon} />
            <Text style={styles.heading}>{CONTEXT.career}</Text>
          </View>
          <View style={styles.memberView}>
            <FlatList
              data={trainerDetail?.career}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.rowView}>
                  <View style={styles.textContainer}>
                    <Text style={[styles.mediumText, { marginLeft: 10 }]}>
                      • {item}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </>
  );

  const Trainer = () => (
    <>
      {trainerDetail && (
        <View style={styles.gymView}>
          <View style={styles.rowView}>
            <Image source={icons.approach_icon} style={styles.rateIcon} />
            <Text style={styles.heading}>{CONTEXT.trainerApproach}</Text>
          </View>
          <View style={styles.memberView}>
            <FlatList
              data={trainerDetail?.teachingApproach}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.rowView}>
                  <View style={styles.textContainer}>
                    <Text style={[styles.mediumText, { marginLeft: 10 }]}>
                      • {item}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </>
  );

  const Available = () => (
    <>
      {trainerDetail && (
        <View style={styles.gymView}>
          <View style={styles.rowView}>
            <Image source={images.refresh_clock} style={styles.rateIcon} />
            <Text style={styles.heading}>{CONTEXT.available}</Text>
          </View>
          <View style={styles.memberView}>
            {trainerDetail?.availableSessionTime &&
              Object.keys(trainerDetail.availableSessionTime).map(
                (day, index) => (
                  <View key={index} style={styles.rowView}>
                    <Image source={images.ClockIcon} style={styles.icon} />
                    <Text style={styles.heading}>
                      {formatDaySchedule(
                        day,
                        trainerDetail.availableSessionTime[day]
                      )}
                    </Text>
                  </View>
                )
              )}
          </View>
        </View>
      )}
    </>
  );

  const formatDaySchedule = (day, sessions) => {
    if (!sessions || sessions.length === 0) return `${day}: HOLIDAY`;
    const formattedSessions = sessions
      .map((session) => `${session.startTime} - ${session.endTime}`)
      .join(", ");
    return `${day}: ${formattedSessions}`;
  };

  const List = () => (
    <View style={{ gap: 10, marginBottom: "30%" }}>
      {Career()}
      {Trainer()}
      {Available()}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {Container()}
          {List()}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MemberPTIntro;
