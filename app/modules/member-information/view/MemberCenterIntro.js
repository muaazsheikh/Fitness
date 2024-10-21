import React, { useState } from "react";
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
import getCenterIntroApi from "../../../api/profile/getCenterIntro";
import moment from "moment";
import { FONTS } from "../../home-member/constant";
import HeaderComponent from "../component/HeaderComponent";

const MemberCenterIntro = ({ navigation }) => {
  const profileData = useSelector((state) => state?.profile?.user?.data);
  const memberData = profileData?.memberOwnProducts;
  const [centerIntro, setCenterIntro] = useState([]);
  const [imagesList, setImagesList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          const response = await getCenterIntroApi();
          setCenterIntro(response?.data);
          setImagesList(response?.data?.gymBgImages);
          console.log(
            "This is response comming from backend",
            JSON.stringify(response?.data)
          );
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      }
      fetchMyAPI();
      return () => {};
    }, [])
  );

  const Header = () => (
    <HeaderComponent
      title={CONTEXT.centerIntro}
      onBackPress={() => navigation.goBack()}
    />
  );

  const renderImages = () => {
    const numberOfImages = 4; // Change this value based on your requirement
    const imageArray = Array.from(
      { length: numberOfImages },
      (_, index) => index
    );

    return imagesList.map((val, index) => (
      <View key={index} style={styles.imagePlaceBackground}>
        <FastImage
          source={{ uri: val?.url }}
          defaultSource={images.image_placeholder}
          style={{
            ...styles.imagePlacePT,
            width: "100%",
            height: "100%",
            borderRadius: 10,
          }}
        />
      </View>
    ));
  };
  const formatDateTime = (date) => {
    const dateOfBirth = moment(date);
    const todayDate = moment();

    const totalYears = todayDate.diff(dateOfBirth, "years");

    const formatDateTime = moment(date).format("YYYY.MM.DD");
    return formatDateTime + " " + `(${totalYears} years)`;
  };
  const Container = () => {
    return (
      <>
        <View style={styles.containerUser}>
          <FastImage
            source={{ uri: imagesList[0]?.original || imagesList[0]?.uri }}
            defaultSource={images.User}
            style={styles.img}
          />
          <View
            style={[
              styles.rowDirectionView,
              { alignSelf: "center", marginTop: 10 },
            ]}
          >
            <Text style={styles.userText}>{centerIntro?.name}</Text>
          </View>
          <View style={styles.rowViewAndIcon}>
            <FastImage
              source={icons.circle_user_icon}
              style={[styles.userCricleIcon]}
            />
            <Text style={styles.emailText}>
              {CONTEXT.ceo} {centerIntro?.ownerProfile?.name}
            </Text>
          </View>
          <View style={styles.hashRowView}>
            <Text style={styles.logText}>{CONTEXT.establishDate}</Text>
            <Image
              source={images.calendar_color}
              style={[
                styles.rateIcon,
                { marginHorizontal: 4, width: 13, height: 13 },
              ]}
            />
            <Text style={styles.logText}>
              {formatDateTime(centerIntro?.establishDate)}
            </Text>
          </View>

          <View style={[styles.imageList, { paddingHorizontal: 35 }]}>
            {renderImages()}
          </View>
        </View>
      </>
    );
  };

  const RenderStaffComponent = ({ text, icon, gender, count = 0 }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text style={styles.largeTextStyle}>{" ("}</Text>
        <FastImage
          source={icon}
          style={{ width: 10, height: 20, marginTop: 5 }}
        />
        <Text style={styles.largeTextStyle}>
          {count + " " + gender + " " + (count === 1 ? "trainer" : "trainers")}
        </Text>
        <Text style={styles.largeTextStyle}>{")"}</Text>
      </View>
    );
  };

  const List = () => (
    <View style={styles.gymView}>
      <View style={styles.centerIntroView}>
        <Image source={images.location} style={[styles.informationImage]} />
        <Text
          style={[
            styles.largeTextStyle,
            { marginLeft: scale(6), marginTop: 0 },
          ]}
        >
          {CONTEXT.address} {centerIntro?.address1}
        </Text>
      </View>

      <View style={styles.horizontalLine} />
      <View>
        <View style={styles.centerIntroView}>
          <Image
            source={images.refresh_clock}
            style={[styles.informationImage, { tintColor: COLORS.themGreen }]}
          />
          <Text
            style={[
              styles.largeTextStyle,
              { marginLeft: scale(6), marginTop: 0 },
            ]}
          >
            {CONTEXT.operatingHrs}
          </Text>
        </View>

        {centerIntro?.workingHour &&
          Object.entries(centerIntro?.workingHour).map(([key, value]) => (
            <View key={key} style={{ flexDirection: "row", marginTop: 10 }}>
              <Image
                source={images.ClockIcon}
                style={[
                  styles.rateIcon,
                  {
                    marginLeft: 10,
                    width: 13,
                    height: 13,
                    alignSelf: "center",
                  },
                ]}
              />
              <Text style={[styles.largeTextStyle, { marginTop: 0 }]}>
                {key} {value}
              </Text>
            </View>
          ))}
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.centerIntroView}>
        <Image source={images.holiday} style={[styles.informationImage]} />
        <Text
          style={[
            styles.largeTextStyle,
            { marginLeft: scale(6), marginTop: 0 },
          ]}
        >
          {CONTEXT.holiday}
        </Text>
        <View
          style={{
            ...styles.centerIntroView,
            marginTop: 0,
            flexWrap: "wrap",
            width: "85%",
          }}
        >
          {centerIntro?.holidays?.map((val) => {
            return (
              <Text
                style={[
                  styles.largeTextStyle,
                  { marginLeft: scale(6), marginTop: 0 },
                ]}
              >
                {val.name},
              </Text>
            );
          })}
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.centerIntroView}>
        <Image source={images.instagram} style={[styles.informationImage]} />
        <Text
          style={[
            styles.largeTextStyle,
            { marginLeft: scale(6), marginTop: 0 },
          ]}
        >
          {CONTEXT.insta}
          {centerIntro?.instaId ? " @" + centerIntro?.instaId : null}
        </Text>
      </View>
      <View style={styles.horizontalLine} />

      <View style={styles.centerIntroView}>
        <Image
          source={icons.parking_support}
          style={[styles.informationImage]}
        />
        <Text
          style={[
            styles.largeTextStyle,
            { marginLeft: scale(6), marginTop: 0 },
          ]}
        >
          Parking Support:
          {centerIntro?.supportParkingHour
            ? " " +
              centerIntro?.supportParkingHour +
              " " +
              (centerIntro?.supportParkingHour === 1 ? "hour" : "hours")
            : null}
        </Text>
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.centerIntroView}>
        <Image source={images.shower} style={styles.informationImage} />
        <Text
          style={[
            styles.largeTextStyle,
            { marginLeft: scale(6), marginTop: 0 },
          ]}
        >
          {CONTEXT.showerFacility +
            " " +
            (centerIntro?.menShowerFacil + centerIntro?.womenShowerFacil) +
            " booths ("}
        </Text>
        <Image source={images.male_female} style={styles.informationImage} />
        <Text style={[styles.largeTextStyle, { marginTop: 0 }]}>
          {` Male/Female)`}
        </Text>
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.centerIntroView}>
        <Image source={images.staff} style={[styles.informationImage]} />
        <Text
          style={[
            styles.largeTextStyle,
            { marginLeft: scale(6), marginTop: 0 },
          ]}
        >
          {CONTEXT.staff}
          <RenderStaffComponent
            text={`${centerIntro.maleStaffs} male trainers`}
            icon={icons.male_icon}
            gender="male"
            count={centerIntro.maleStaffs}
          />

          <RenderStaffComponent
            text={`${centerIntro.femaleStaffs} female trainer`}
            icon={icons.female_icon}
            gender="female"
            count={centerIntro.femaleStaffs}
          />
        </Text>
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.centerIntroView}>
        <Image source={icons.dumble_icon} style={[styles.informationImage]} />
        {centerIntro?.exercises && (
          <Text
            style={[
              styles.largeTextStyle,
              { marginLeft: scale(6), marginTop: 0 },
            ]}
          >
            {CONTEXT.typeExercise} {centerIntro?.exercises[0]}
          </Text>
        )}
      </View>

      <View style={styles.horizontalLine} />
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Header()}
        <ScrollView
          style={{ marginBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {Container()}
          {List()}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MemberCenterIntro;
