import * as React from "react";

import {
  FlatList,
  Image,
  ImageBackground,
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
import { NavigationStrings } from "../../../constants";
import getInformationApi from "../../../api/trainer-profile/getInformationApi";
import Spinner from "react-native-loading-spinner-overlay";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import uploadImageApi from "../../../api/assets/uploadImage";
import updateNameApi from "../../../api/trainer-profile/updateName";
import { CONTEXT } from "../../home/constant/theme";

const TrainerInformation = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(null);
  const shouldRefresh = useSelector((state) => state.refresh.shouldRefresh);
  const [imageList, setImageList] = React.useState({});

  const handleNavigation = (nav) => {
    if (nav === "Edit") {
      navigation.navigate(NavigationStrings.TRAINER_INFO_EDIT);
    } else {
      navigation.goBack();
    }
  };

  const Header = () => (
    <View style={{}}>
      <TrainerHeader
        text="Profile"
        imageUrl={icons.Notifyicon}
        Notify={true}
        navigation={navigation}
      />
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          setLoading(true);
          const response = await getInformationApi();
          console.log(
            "This is trainer data",
            JSON.stringify(response?.data?.trainerDetails)
          );
          setUserInfo(response?.data?.trainerDetails || {});
          setImageList(response?.data?.trainerDetails?.mProfileImg || {});
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(JSON.stringify(error));
        }
      }
      fetchMyAPI();
      return () => {};
    }, [shouldRefresh])
  );

  const onPressAddImage = async () => {
    try {
      launchImageLibrary(
        {
          mediaType: "photo",
          presentationStyle: "pageSheet",
          selectionLimit: 1,
        },
        async (res) => {
          setLoading(true);
          const { assets } = res;
          const file = {
            uri: assets[0]?.uri,
            name: assets[0]?.fileName,
            filename: assets[0]?.fileName,
            type: assets[0]?.type,
          };
          const formData = new FormData();
          formData.append("file", file);
          const imgResponse = await uploadImageApi(formData);
          const obj = imageList;
          const orgKey = `prof_img1_org`;
          const minKey = `prof_img1_min`;
          obj[orgKey] = imgResponse.data.original;
          obj[minKey] = imgResponse.data.compressed;
          const response = await updateNameApi(userInfo?.name, imageList);
          setLoading(false);
        }
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const List = () => (
    <View style={{ gap: 10 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationStrings.TRAINER_ADD_INFO)}
        style={styles.listView}
      >
        <View style={{ flexDirection: "row" }}>
          <Image source={icons.tab_profile} style={styles.informationImage} />
          <Text style={[styles.informationTextStyle, { marginLeft: scale(6) }]}>
            Information
          </Text>
        </View>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationStrings.TRAINER_TIMES)}
        style={styles.listView}
      >
        <View style={{ flexDirection: "row" }}>
          <Image source={images.ClockIcon} style={styles.informationImage} />
          <Text style={[styles.informationTextStyle, { marginLeft: scale(6) }]}>
            {CONTEXT.available_session}
          </Text>
        </View>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationStrings.TRAINER_SESSION)}
        style={styles.listView}
      >
        <View style={{ flexDirection: "row" }}>
          <Image source={images.circularImg} style={styles.informationImage} />
          <Text style={[styles.informationTextStyle, { marginLeft: scale(6) }]}>
            Session Coaching Method
          </Text>
        </View>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>
    </View>
  );

  const renderImages = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {userInfo?.mProfileImg &&
          Object?.values(userInfo?.mProfileImg).map((uri, index) => (
            <>
              {index % 2 === 0 ? (
                <View
                  key={index}
                  style={[styles.itemContainer, { marginLeft: 20 }]}
                >
                  <FastImage
                    source={{ uri: uri }}
                    style={[styles.imagePlace, { borderRadius: 10 }]}
                    defaultSource={images.image_placeholder}
                  />
                </View>
              ) : null}
            </>
          ))}
      </ScrollView>
    );
  };
  const Container = () => (
    <>
      <View style={styles.containerUser}>
        <TouchableOpacity onPress={() => onPressAddImage()}>
          <ImageBackground
            defaultSource={images.User}
            style={styles.img}
            imageStyle={{ borderRadius: 999 }}
            source={{ uri: imageList?.prof_img1_min }}
          >
            <View style={styles.editButtonView}>
              <FastImage
                source={icons.profile_edit_icon}
                style={styles.editIconStyle}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.userText}>{userInfo?.name}</Text>
        <View style={styles.hashView}>
          <Text style={styles.userTextStyle}># {userInfo?.userCode}</Text>
        </View>
        <View style={[styles.userHeaderList]}>
          <View style={{ marginLeft: 10 }}>
            <View style={[styles.requestTextView]}>
              <Image source={icons.people} style={[styles.sessionIcon]} />
            </View>
            <Text style={[styles.largeTextStyle]}>
              {userInfo?.coachingPeople} People
            </Text>
          </View>

          <View style={styles.verticalLine} />

          <View>
            <View style={[styles.requestTextView]}>
              <Image source={icons.Session_icon} style={[styles.sessionIcon]} />
            </View>
            <Text style={[styles.largeTextStyle, { marginLeft: scale(6) }]}>
              {userInfo?.coachingSessions} Session
            </Text>
          </View>

          <View style={styles.verticalLine} />

          <View>
            <View style={[styles.requestTextView]}>
              <View style={[styles.extraView, { borderWidth: 0 }]}>
                <Image source={icons.star_icon} style={styles.sessionIcon} />
              </View>
            </View>
            <Text style={[styles.largeTextStyle, { marginLeft: scale(6) }]}>
              {userInfo?.favoriteCount} Favorites
            </Text>
          </View>
        </View>
        {userInfo && <View style={styles.imageList}>{renderImages()}</View>}
        <PrimaryButton
          title={"Edit"}
          style={90}
          edit={true}
          color={false}
          imgStyle={"black"}
          imgUrl={icons.edit_white}
          onPress={() => handleNavigation("Edit")}
        />
      </View>
    </>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.themeGray }}>
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
    </ScrollView>
  );
};

export default TrainerInformation;
