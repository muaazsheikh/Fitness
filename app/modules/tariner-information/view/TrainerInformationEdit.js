import * as React from "react";
import {
  FlatList,
  Image,
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
import { COLORS, FONTS, icons } from "../../home/constant";
import { images } from "../../workout/constant";
import TrainerHeader from "../component/header";
import FastImage from "react-native-fast-image";
import { PrimaryButton } from "../../../components";
import { NavigationStrings } from "../../../constants";
import getInformationApi from "../../../api/trainer-profile/getInformationApi";
import Spinner from "react-native-loading-spinner-overlay";
import updateNameApi from "../../../api/trainer-profile/updateName";
import { launchImageLibrary } from "react-native-image-picker";
import uploadImageApi from "../../../api/assets/uploadImage";
import ProgressBar from "react-native-progress/Bar";
import { CONTEXT } from "../../home/constant/theme";

const TrainerInformationEdit = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(null);
  const [modalUpload, setModalUpload] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [imageList, setImageList] = React.useState({});
  const [name, setName] = React.useState("");

  const handleNavigation = (nav) => {
    if (nav === "Edit") {
      informationUpdate();
    } else {
      navigation.goBack();
    }
  };

  const Header = () => (
    <View style={{}}>
      <TrainerHeader text="" imageUrl={icons.Notifyicon} />
    </View>
  );

  React.useEffect(() => {
    async function fetchMyAPI() {
      try {
        setLoading(true);
        const response = await getInformationApi();
        console.log(response);
        setName(response?.data?.trainerDetails.name);
        setUserInfo(response?.data?.trainerDetails || {});
        setImageList(response?.data?.trainerDetails?.mProfileImg || {});
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(JSON.stringify(error));
      }
    }
    fetchMyAPI();
  }, []);

  const informationUpdate = async () => {
    setLoading(true);
    try {
      const response = await updateNameApi(name, imageList);
      console.log(response);
      navigation.navigate(NavigationStrings.TRAINER_INFO);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(JSON.stringify(error));
    }
  };

  const handleValue = () => {
    let prevProgress = 0;
    const interval = setInterval(() => {
      prevProgress += 0.1;
      setProgress(prevProgress >= 1 ? 1 : prevProgress);
      if (prevProgress >= 1) {
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
          const obj = imageList;
          const orgKey = `prof_img${
            Object.values(imageList || {}).length / 2 + 1
          }_org`;
          const minKey = `prof_img${
            Object.values(imageList || {}).length / 2 + 1
          }_min`;
          obj[orgKey] = imgResponse.data.original;
          obj[minKey] = imgResponse.data.compressed;
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
    setImageList(newObj);
    return newObj;
  }

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

            <View style={styles.smallModalContainer}>
              <View
                style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.ARCHI_SEMBOLD,
                  }}
                ></Text>
              </View>
              <View style={{ alignSelf: "center", flexDirection: "row" }}>
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
              <PrimaryButton
                title={"Confirm"}
                onPress={() => {
                  setModalUpload(false);
                }}
                style={90}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const onRemoveImage = (uri, selectedIndex) => {
    removeAndReindex(imageList, selectedIndex);
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
        {userInfo &&
          Object.values(imageList).map((uri, index) => (
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
        <TouchableOpacity style={styles.AddIconStyle} onPress={onPressAddImage}>
          <Text style={[styles.headerText, { fontSize: 40 }]}>+</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const Container = () => (
    <>
      <View style={{}}>
        <FastImage
          defaultSource={images.User}
          style={[styles.img, { marginVertical: 10, borderRadius: 999 }]}
          source={{ uri: userInfo?.mProfileImg?.prof_img1_min }}
        />
        <TextInput
          value={name}
          onChangeText={setName}
          style={[
            styles.listView,
            { color: COLORS.white, fontFamily: FONTS.ARCHI_BOLD, fontSize: 20 },
          ]}
        />
        <View style={styles.imageList}>{renderImages()}</View>
      </View>
    </>
  );
  const Button = () => (
    <View style={styles.buttonView}>
      <PrimaryButton
        title={"<  Back"}
        style={90}
        edit={true}
        color={true}
        onPress={() => handleNavigation("")}
      />
      <PrimaryButton
        title={"Save"}
        style={90}
        edit={true}
        color={false}
        onPress={() => handleNavigation("Edit")}
      />
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Header()}
        <ScrollView>
          {Container()}
          {List()}
          {Button()}
          {UploadModal()}
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

export default TrainerInformationEdit;
