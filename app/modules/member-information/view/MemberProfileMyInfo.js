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
import { useDispatch, useSelector } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import updateNameApi from "../../../api/trainer-profile/updateName";
import uploadImageApi from "../../../api/assets/uploadImage";
import { profileSuccess } from "../../../redux/getProfileSlice";
import {
  profileUpdateFailure,
  profileUpdateRequest,
  profileUpdateSuccess,
} from "../../../redux/profileUpdateSlice";
import updateProfileApi from "../../../api/profile/updateProfile";
import Spinner from "react-native-loading-spinner-overlay";

const MemberProfileMyInfo = ({ navigation }) => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state?.profile?.user?.data) || {};
  const [imageList, setImageList] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setImageList(profileData?.mProfileImg || {});
  }, [profileData]);

  const formatStartDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear() % 100;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  };

  const formatEndDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear() % 100;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  };

  const startDate = formatStartDate(profileData?.membershipStartDate);
  const endDate = formatEndDate(profileData?.membershipEndDate);

  const onPressAddImage = async () => {
    try {
      launchImageLibrary(
        {
          mediaType: "photo",
          presentationStyle: "pageSheet",
          selectionLimit: 1,
        },
        async (res) => {
          const { assets } = res;
          setLoading(true);

          if (assets && assets.length > 0) {
            const file = {
              uri: assets[0].uri,
              name: assets[0].fileName,
              filename: assets[0].fileName,
              type: assets[0].type,
            };
            const formData = new FormData();
            formData.append("file", file);

            const imgResponse = await uploadImageApi(formData);

            const obj = { ...imageList };
            const orgKey = `prof_img1_org`;
            const minKey = `prof_img1_min`;
            obj[orgKey] = imgResponse?.data?.original;
            obj[minKey] = imgResponse?.data?.compressed;

            setImageList(obj);
            dispatch(profileUpdateRequest());

            const response = await updateProfileApi({
              name: profileData.name,
              phone: profileData.phone,
              email: profileData.email,
              profileImages: obj,
            });
            setLoading(false);
            dispatch(
              profileSuccess({
                data: {
                  name: profileData.name,
                  phone: profileData.phone,
                  email: profileData.email,
                  mProfileImg: profileImages,
                },
              })
            );
            console.log("This is new profile images", JSON.stringify(response));
          }
        }
      );
    } catch (error) {
      setLoading(false);

      dispatch(profileUpdateFailure(error.message));

      console.log(error);
    }
  };

  const profileUpdate = async (profileImages) => {
    try {
      dispatch(profileUpdateRequest());
      const response = await updateProfileApi({
        name: profileData.name,
        phone: profileData.phone,
        email: profileData.email,
        profileImages: profileImages,
      });
      console.log("This is update profile", JSON.stringify(response));
      dispatch(
        profileUpdateSuccess({
          data: {
            name: profileData.name,
            phone: profileData.phone,
            email: profileData.email,
            mProfileImg: imageList,
          },
        })
      );
      dispatch(
        profileSuccess({
          data: {
            name: profileData.name,
            phone: profileData.phone,
            email: profileData.email,
            mProfileImg: profileImages,
          },
        })
      );
      // setLoading(false);
    } catch (error) {
      dispatch(profileUpdateFailure(error.message));
      // setLoading(false);
    }
  };

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

  const renderImages = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Object.values(imageList || {}).map((uri, index) => (
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
  const providerIconMap = {
    apple: images.apple,
    naver: images.naver,
    kakao: images.kakao, // Add more mappings as needed
  };

  const Container = () => (
    <>
      <View style={styles.containerUser}>
        <TouchableOpacity
          onPress={() => onPressAddImage()}
          style={styles.uploadImageContainer}
        >
          <FastImage
            defaultSource={images.User}
            style={styles.userCircleImage}
            imageStyle={{ borderRadius: 999 }}
            source={{ uri: imageList?.prof_img1_min }}
          />
          <View style={styles.editButtonView}>
            <FastImage
              source={icons.profile_edit_icon}
              style={styles.editIconStyle}
            />
          </View>
        </TouchableOpacity>

        <View
          style={[
            styles.rowDirectionView,
            { alignSelf: "center", marginTop: 10 },
          ]}
        >
          <Text style={styles.userText}>{profileData?.name}</Text>
          <Image source={icons.star_bach} style={[styles.informationImage]} />
        </View>
        <View style={styles.hashRowView}>
          <Image
            source={providerIconMap[profileData?.provider]}
            style={[styles.rateIcon, { marginRight: 4 }]}
          />
          <Text style={styles.logText}>
            Logged in with {profileData?.provider}
          </Text>
        </View>

        <View style={styles.rowViewAndIcon}>
          <Image
            source={icons.phone}
            style={[styles.rateIcon, { marginRight: 4 }]}
          />
          <Text style={styles.emailText}>{profileData?.cellphone}</Text>
        </View>

        <View style={styles.rowViewAndIcon}>
          <Image
            source={icons.theme_email}
            style={[styles.rateIcon, { marginRight: 4 }]}
          />
          <Text style={styles.emailText}>{profileData?.email}</Text>
        </View>
        <View style={styles.horizontalLine} />

        <View style={[styles.userHeaderList]}>
          <View style={{ marginLeft: 10 }}>
            <View style={[styles.requestTextView]}>
              <Image source={icons.people} style={[styles.sessionIcon]} />
            </View>
            <Text
              numberOfLines={1}
              style={[styles.largeTextStyle, { width: 70 }]}
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
                {startDate}-{endDate}
              </Text>
            </View>
          </View>

          <View style={styles.verticalLine} />

          <View>
            <View style={[styles.requestTextView]}>
              <View style={styles.extraView}>
                <Image
                  source={icons.Session_icon}
                  style={[styles.sessionIcon, { tintColor: COLORS.white }]}
                />
              </View>
            </View>
            <Text style={styles.largeTextStyle}>
              <Text style={styles.userText}>
                {profileData?.sessionCompleted}
              </Text>
              /{profileData?.sessionCount}
            </Text>
          </View>
        </View>

        <View style={styles.imageList}>{renderImages()}</View>
        <PrimaryButton
          title={"Edit"}
          style={80}
          edit={true}
          color={false}
          imgUrl={icons.edit_white}
          imgStyle={COLORS.black}
          onPress={() =>
            navigation.navigate(NavigationStrings.MEMBER_INFOUPDATE)
          }
        />
      </View>
    </>
  );

  const List = () => (
    <View style={{ gap: 10, marginBottom: "30%" }}>
      <TouchableOpacity
        style={styles.listView}
        onPress={() => navigation.navigate(NavigationStrings.MEMBER_GOAL)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={icons.goal}
            style={[styles.informationImage, { tintColor: COLORS.white }]}
          />
          <Text style={[styles.informationTextStyle, { marginLeft: scale(6) }]}>
            Goals
          </Text>
        </View>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listView}
        onPress={() => navigation.navigate(NavigationStrings.MEMBER_PREFERRED)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={icons.heart_dumb}
            style={[styles.informationImage, { tintColor: COLORS.white }]}
          />
          <Text style={[styles.informationTextStyle, { marginLeft: scale(6) }]}>
            Preferred exercise
          </Text>
        </View>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NavigationStrings.MEMBER_MY_INFORMATION)
        }
        style={styles.listView}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={icons.list_item} style={styles.informationImage} />
          <Text style={[styles.informationTextStyle, { marginLeft: scale(6) }]}>
            My Items
          </Text>
        </View>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {profileData && Container()}
          {profileData && List()}
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

export default MemberProfileMyInfo;
