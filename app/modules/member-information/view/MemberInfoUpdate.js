import * as React from "react";
import {
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import { CONTEXT } from "../../home/constant/theme";
import {
  profileUpdateFailure,
  profileUpdateRequest,
  profileUpdateSuccess,
} from "../../../redux/profileUpdateSlice";
import updateProfileApi from "../../../api/profile/updateProfile";
import {
  profileFailure,
  profileRequest,
  profileSuccess,
} from "../../../redux/getProfileSlice";
import { getProfileApi } from "../../../api/profile/getProfile";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { launchImageLibrary } from "react-native-image-picker";
import uploadImageApi from "../../../api/assets/uploadImage";
import ProgressBar from "react-native-progress/Bar";
import { FONTS } from "../../home-member/constant";
import FlashMessage from "../../../components/flash";

const MemberInfoUpdate = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.profile?.loading);
  const load = useSelector((state) => state?.profileUpdate?.loading);

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [profileImages, setProfileImages] = React.useState({});
  const [modalUpload, setModalUpload] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [userProfile, setuserProfile] = React.useState({});
  const [message, setMessage] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [imageList, setImageList] = React.useState({});
  React.useEffect(() => {
    console.log("profileImages", JSON.stringify(profileImages));
  }, [profileImages]);
  const showMessage = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide the message after 3 seconds
  };

  React.useEffect(() => {
    async function fetchMyAPI() {
      try {
        dispatch(profileRequest());
        const response = await getProfileApi();
        dispatch(profileSuccess(response));
        setuserProfile(response?.data);
        setName(response?.data?.name);
        setPhone(response?.data?.cellphone);
        setEmail(response?.data?.email);
        setProfileImages(response?.data?.mProfileImg);
      } catch (error) {
        console.log(JSON.stringify(error));
        dispatch(profileFailure(error.message));
      }
    }
    fetchMyAPI();
  }, [handleNavigation]);

  const handleNavigation = () => {
    if (!validateInputs()) {
      profileUpdate(name, phone, email);
      // navigation.navigate(NavigationStrings.DIET_UPDATE);
    }
  };

  const profileUpdate = async (name, phone, email) => {
    try {
      dispatch(profileUpdateRequest());
      const response = await updateProfileApi({
        name,
        phone,
        email,
        profileImages,
      });
      dispatch(
        profileUpdateSuccess({
          data: {
            ...userProfile,
            name,
            phone,
            email,
            mProfileImg: profileImages,
          },
        })
      );
      dispatch(
        profileSuccess({
          data: {
            ...userProfile,
            name,
            phone,
            email,
            mProfileImg: profileImages,
          },
        })
      );
      navigation.goBack();
    } catch (error) {
      navigation.goBack();

      dispatch(profileUpdateFailure(error.message));
    }
  };

  const validateInputs = () => {
    let error = false;

    if (!name.trim()) {
      // alert("Name is required");
      showMessage();
      setMessage("Name is Required");
      error = true;
    } else if (!/^\+?\d{10,13}$/.test(phone)) {
      // alert("Please enter valid phone number");
      showMessage();
      setMessage("Please enter valid phone number");

      error = true;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      // alert("Invalid email format");
      showMessage();
      setMessage("Invalid email format");
      error = true;
    }

    return error;
  };

  const Header = () => <TrainerHeader text="Profile" />;

  const handleValue = () => {
    let prevProgress = 0;
    const interval = setInterval(() => {
      prevProgress += 0.1;
      setProgress(prevProgress >= 1 ? 1 : prevProgress);
      if (prevProgress >= 1) {
        setModalUpload(false);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  };

  const onPressAddImage = async () => {
    try {
      launchImageLibrary(
        {
          mediaType: "photo",
          presentationStyle: "pageSheet",
          selectionLimit: 1,
        },
        async (res) => {
          handleValue();
          const { assets } = res;
          const file = {
            uri: assets[0]?.uri,
            name: assets[0]?.fileName,
            filename: assets[0]?.fileName,
            type: assets[0]?.type,
          };
          setModalUpload(true);
          const formData = new FormData();
          formData.append("file", file);
          const imgResponse = await uploadImageApi(formData);
          const obj = {};
          const orgKey = `prof_img${
            Object.values(profileImages || {}).length / 2 + 1
          }_org`;
          const minKey = `prof_img${
            Object.values(profileImages || {}).length / 2 + 1
          }_min`;
          obj[orgKey] = imgResponse?.data?.original;
          obj[minKey] = imgResponse?.data?.compressed;
          setProfileImages({ ...profileImages, ...obj });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onPressUploadImage = async () => {
    try {
      launchImageLibrary(
        {
          mediaType: "photo",
          presentationStyle: "pageSheet",
          selectionLimit: 1,
        },
        async (res) => {
          handleValue();
          const { assets } = res;
          const file = {
            uri: assets[0]?.uri,
            name: assets[0]?.fileName,
            filename: assets[0]?.fileName,
            type: assets[0]?.type,
          };
          setModalUpload(true);
          const formData = new FormData();
          formData.append("file", file);
          const imgResponse = await uploadImageApi(formData);
          const obj = {};
          const orgKey = `prof_img1_org`;
          const minKey = `prof_img1_min`;
          obj[orgKey] = imgResponse?.data?.original;
          obj[minKey] = imgResponse?.data?.compressed;
          setProfileImages({ ...profileImages, ...obj });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  function removeAndReindex(obj, indexToRemove) {
    const keyMinToRemove = `prof_img${
      indexToRemove ? indexToRemove : indexToRemove + 1
    }_min`;
    const keyOrgToRemove = `prof_img${
      indexToRemove ? indexToRemove : indexToRemove + 1
    }_org`;

    delete obj[keyMinToRemove];
    delete obj[keyOrgToRemove];

    const keys = Object.keys(obj).sort();

    const newObj = {};
    let index = 1;
    for (const key of keys) {
      const matches = key.match(/(prof_img)(\d+)(_min|_org)/);
      if (matches) {
        const baseName = matches[1];
        const number = parseInt(matches[2]);
        const suffix = matches[3];

        if (number > indexToRemove) {
          const newKey = `${baseName}${index}${suffix}`;
          newObj[newKey] = obj[key];
        } else {
          const newKey = `${baseName}${number}${suffix}`;
          newObj[newKey] = obj[key];
        }
        if (suffix === "_org") index++;
      }
    }
    setProfileImages(newObj);
    return newObj;
  }

  const onRemoveImage = (uri, selectedIndex) => {
    removeAndReindex(profileImages, selectedIndex);
  };

  const Container = () => (
    <View style={styles.containerView}>
      <TouchableOpacity
        onPress={() => onPressUploadImage()}
        style={styles.uploadImageContainer}
      >
        <FastImage
          defaultSource={images.User}
          style={styles.userCircleImage}
          imageStyle={{ borderRadius: 999 }}
          source={{ uri: profileImages?.prof_img1_min }}
        />
        <View style={styles.editButtonView}>
          <FastImage
            source={icons.profile_edit_icon}
            style={styles.editIconStyle}
          />
        </View>
      </TouchableOpacity>

      <View style={{ marginTop: scale(15) }}>
        <Text style={styles.titleName}>{CONTEXT.name}</Text>
        <View style={styles.placeholderStyle}>
          <TextInput
            placeholder="Alista Sonkar"
            placeholderTextColor={COLORS.placeholderColor}
            style={styles.heading}
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>

      <Text style={styles.titleName}>Contact no.</Text>
      <View style={styles.placeholderStyle}>
        <TextInput
          placeholder="(581)- 305-7869"
          placeholderTextColor={COLORS.placeholderColor}
          style={styles.heading}
          value={phone}
          keyboardType="phone-pad"
          onChangeText={setPhone}
        />
      </View>

      <Text style={styles.titleName}>Email</Text>
      <View style={styles.placeholderStyle}>
        <TextInput
          placeholder="emma.mathew@gmail.com"
          placeholderTextColor={COLORS.placeholderColor}
          style={styles.heading}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.imageList}>{renderImages()}</View>
    </View>
  );

  const UploadModal = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalUpload}
      onRequestClose={() => {
        setModalUpload(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalUpload(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => setModalUpload(false)}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>
            <Text style={styles.modalTextUpload}>File upload</Text>

            <View style={[styles.smallModalContainer, { alignSelf: "center" }]}>
              <View
                style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}
              ></View>
              <View style={{ alignSelf: "center" }}>
                <View>
                  <ProgressBar
                    progress={progress}
                    color={COLORS.themGreen}
                    width={200}
                  />
                </View>

                <FastImage
                  source={images.RightConfirm}
                  style={[styles.imageHolder, { marginTop: -5, marginLeft: 5 }]}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 1,
                  justifyContent: "space-around",
                  marginTop: -2,
                }}
              ></View>
            </View>

            <View style={{ marginTop: 10 }}>
              {progress > 0.9 ? (
                <PrimaryButton
                  title={"Confirm"}
                  onPress={() => {
                    setModalUpload(false);
                  }}
                  color={false}
                  style={90}
                />
              ) : (
                <PrimaryButton
                  title={"Confirm"}
                  onPress={() => {
                    setModalUpload(false);
                    setProgress(0);
                  }}
                  color={true}
                  style={90}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const renderImages = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {profileImages &&
          Object.values(profileImages || {}).map((uri, index) => (
            <>
              {index % 2 === 0 ? (
                <View key={index} style={[{ marginLeft: 15 }]}>
                  <FastImage
                    source={{ uri: uri }}
                    style={[styles.imagePlace, { borderRadius: 10 }]}
                    defaultSource={images.image_placeholder}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      onRemoveImage(uri, index);
                    }}
                    style={[
                      styles.editView,
                      {
                        top: scale(-1),
                        right: 0,
                        backgroundColor: COLORS.Lightred,
                      },
                    ]}
                  >
                    <Image
                      source={icons.CrossButton}
                      style={styles.rejectedIcon}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
          ))}
        {Object.values(profileImages || {}).length < 9 ? (
          <TouchableOpacity
            style={styles.AddIconStyle}
            onPress={onPressAddImage}
          >
            <Text style={[styles.headerText, { fontSize: 40 }]}>+</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    );
  };

  const List = () => (
    <View style={{ gap: 10, marginBottom: "30%" }}>
      <TouchableOpacity
        style={styles.listView}
        onPress={() => {
          navigation.navigate(NavigationStrings.MEMBER_GOAL);
        }}
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
            {CONTEXT.my_item}
          </Text>
        </View>
        <Image source={icons.right_arrow} style={styles.rightIcon} />
      </TouchableOpacity>

      <View style={styles.buttonViewNew}>
        <PrimaryButton
          title={"< Back"}
          style={80}
          edit={true}
          color={true}
          onPress={() => navigation.goBack()}
        />
        <PrimaryButton
          title={"Save"}
          style={80}
          edit={true}
          color={false}
          onPress={handleNavigation}
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
          {UploadModal()}
          <Spinner
            visible={loading || load}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
          {isVisible && <FlashMessage top={true} message={message} />}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MemberInfoUpdate;
