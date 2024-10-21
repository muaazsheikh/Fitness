import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import _ from "lodash";
import { COLORS, icons } from "../../../workout/constant";
import { PrimaryButton } from "../../../../components";
import HeaderComponent from "../../component/HeaderComponent";
import FastImage from "react-native-fast-image";
import { FONTS, images } from "../../../home-member/constant";
import Swiper from "react-native-swiper";
import ProgressBar from "react-native-progress/Bar";
import { launchImageLibrary } from "react-native-image-picker";
import uploadImageApi from "../../../../api/assets/uploadImage";
import Spinner from "react-native-loading-spinner-overlay";
import { scale } from "react-native-size-matters";
import { NavigationStrings } from "../../../../constants";
import {
  createBoardApi,
  deleteBoardApi,
  editBoardApi,
  getBoardApis,
} from "../../../../api/profile/gymBoardApis";

import { FAB } from "react-native-elements";

const headersList = [
  "Center  Bulletin Board",
  "Feedback to the Center",
  "Notice Board",
  "Events",
];

const FeedbackToCenter = ({ navigation, route }) => {
  const routeData = route.params;
  const [listData, setListData] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const [pickedImageList, setPickedImageList] = React.useState([]);
  const [isEdit, setIsEdit] = React.useState(false);
  const [selectedContact, setSelectedContact] = React.useState(null);
  const [modalUpload, setModalUpload] = React.useState(false);
  const [showCreateView, setShowCreateView] = React.useState(false);

  useEffect(() => {
    fetchMyAPI();
  }, []);

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

  const openPhotoGallery = () => {
    setProgress(0);
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
          console.log(res);
          if (assets && assets.length > 0) {
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
            if (imgResponse.status) {
              // setPickedImageList((prevList) => [...prevList, imgResponse.data]);
              setPickedImageList((prevList) => [imgResponse.data]);
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigation = async (nav) => {};

  async function fetchMyAPI() {
    try {
      setIsLoading(true);
      const response = await getBoardApis(routeData.type);
      setIsLoading(false);
      // console.log("THis is feedback list api", JSON.stringify(response));
      setListData(response?.data?.boardData);
    } catch (error) {
      setIsLoading(false);
      console.log(JSON.stringify(error.response));
    }
  }

  const handleCreateContact = async () => {
    setIsLoading(true);
    try {
      const requestParam = {
        title: titleInput,
        content: contentInput,
        files: pickedImageList || null,
        type: routeData.type,
        suggestionType: "Cleaning",
      };
      const response = await createBoardApi(requestParam);
      setIsLoading(false);
      clearEdit();
      fetchMyAPI();
    } catch (error) {
      setIsLoading(false);
      console.log(
        "This is create contact error response",
        JSON.stringify(error.response)
      );
    }
  };

  const handleDelete = async (item) => {
    setIsLoading(true);
    try {
      const response = await deleteBoardApi(item.id, routeData.type);
      setListData((prev) => prev.filter((val) => val.id !== item.id));
      setIsLoading(false);
    } catch (error) {
      console.log(
        "This is contact delete error response",
        JSON.stringify(error.response)
      );
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    setIsLoading(true);
    const requestParam = {
      title: titleInput,
      content: contentInput,
      files: pickedImageList || null,
      type: routeData.type,
      suggestionType: "Cleaning", // Cleaning ,Equipment and Machine Repair Etc.
    };

    try {
      const response = await editBoardApi(
        selectedContact?.item.id,
        requestParam
      );

      setListData((prev) => {
        const newArray = [];
        prev.map((val) => {
          if (val.id === selectedContact?.item.id) {
            // const obj = {};
            // obj.title = titleInput;
            // obj.content = contentInput;
            // obj.imgs = pickedImageList;
            newArray.push({
              ...val,
              title: titleInput,
              content: contentInput,
              imgs: pickedImageList,
            });
          } else {
            newArray.push(val);
          }
        });
        return newArray;
      });
      setIsLoading(false);
      clearEdit();
    } catch (error) {
      console.log(
        "This is contact edit error response",
        JSON.stringify(error.response)
      );
      setIsLoading(false);
    }
  };

  const Header = () => (
    <View style={styles.headerContainer}>
      <HeaderComponent
        title={headersList[routeData.type]}
        onBackPress={() => navigation.goBack()}
      />
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

  const Button = (item) => (
    <View style={styles.buttonView}>
      <PrimaryButton
        title="Delete"
        style={90}
        edit={true}
        color={true}
        onPress={() => handleDelete(item.item)}
      />
      <PrimaryButton
        title="Edit"
        style={90}
        edit={true}
        color={false}
        onPress={() => {
          setSelectedContact(item);
          setIsEdit(true);
          setTitleInput(item?.item?.title);
          setContentInput(item?.item?.content);
          setPickedImageList(item?.item?.imgs);
        }}
      />
    </View>
  );
  const clearEdit = () => {
    setIsEdit(false);
    setShowCreateView(false);
    setTitleInput("");
    setContentInput("");
    setPickedImageList([]);
  };
  const CreateButton = () => (
    <View style={styles.buttonView}>
      <PrimaryButton
        title="Cancel"
        style={90}
        edit={true}
        color={true}
        onPress={() => clearEdit()}
      />
      <PrimaryButton
        title="Save"
        style={90}
        edit={true}
        color={false}
        onPress={() => (isEdit ? handleEdit() : handleCreateContact())}
      />
    </View>
  );

  const ContactCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.postContainer}
        onPress={() => {
          navigation.navigate(NavigationStrings.FEEDBACK_TO_CENTER_DETAIL, {
            item,
            type: routeData.type,
          });
        }}
      >
        <View style={styles.postHeader}>
          <FastImage source={icons.close_account} style={styles.closeIcon} />
          <Text style={styles.postTitle}>{item?.userDetails?.name}</Text>
        </View>
        <View style={styles.postImageContainer}>
          {item?.imgs && item?.imgs?.length >= 1 ? (
            <>
              <Swiper
                index={0}
                activeDotColor={COLORS.themGreen}
                dotColor="#000"
                style={{ height: 300 }}
                showsPagination={true}
                loop={false}
              >
                {item?.imgs &&
                  item?.imgs?.map((item, index) => {
                    return (
                      <View style={styles.slide} key={index.toString()}>
                        <FastImage
                          source={{ uri: item?.original }}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </View>
                    );
                  })}
              </Swiper>
            </>
          ) : (
            <FastImage source={icons.gallery} style={styles.addPostImage} />
          )}
        </View>
        <View style={styles.postTextContainer}>
          <Text style={styles.postText}>{item?.title}</Text>
          <Text style={styles.postContect}>{item?.content}</Text>
        </View>
        {item?.isCreatedByCurrentUser && <Button item={item} />}
      </TouchableOpacity>
    );
  };

  const CreatePostComponent = () => {
    return (
      <View style={styles.postContainer}>
        <TouchableOpacity
          style={styles.postImageContainer}
          onPress={() => openPhotoGallery()}
        >
          {pickedImageList?.length ? (
            <FastImage
              source={{ uri: pickedImageList[0]?.original }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="stretch"
            />
          ) : (
            <>
              <FastImage
                source={images.add_placeholder_image}
                style={styles.postImage}
              />
              <Text
                style={{ color: COLORS.white, marginTop: 20, fontSize: 20 }}
              >
                Upload image
              </Text>
            </>
          )}
        </TouchableOpacity>
        <View style={styles.postTextContainer}>
          <TextInput
            value={titleInput}
            style={styles.titleInputStyle}
            onChangeText={setTitleInput}
            placeholder="Writec a title"
            placeholderTextColor="#717171"
          />
          <TextInput
            value={contentInput}
            style={styles.postTextInput}
            onChangeText={setContentInput}
            placeholder="Write a description"
            multiline={true}
            placeholderTextColor="#717171"
          />
        </View>
        <CreateButton />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.newAccountContainer}>
      {Header()}
      {!isLoading && (
        <>
          {listData.length && isEdit === false && !showCreateView ? (
            <FlatList
              data={listData}
              renderItem={({ item }) => {
                return <ContactCard item={item} />;
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 150,
              }}
            />
          ) : (
            CreatePostComponent()
          )}
        </>
      )}

      {!showCreateView && listData.length ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowCreateView(true)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      ) : null}

      {UploadModal()}
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
    </SafeAreaView>
  );
};

export default FeedbackToCenter;

const styles = StyleSheet.create({
  newAccountContainer: {
    flex: 1,
    backgroundColor: COLORS.themeGray,
  },
  headerContainer: {
    padding: 5,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
  },
  buttonView: {
    alignSelf: "flex-end",
    marginRight: 20,
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  postContainer: {
    width: "93%",
    backgroundColor: "#353638",
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 10,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  closeIcon: {
    height: 23,
    width: 19,
  },
  postTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.ARCHI_REGULAR,
    width: "90%",
  },
  postImageContainer: {
    backgroundColor: "#939393",
    height: 230,
    width: "100%",
    marginTop: 13,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  postImage: {
    height: 63,
    width: 75,
  },
  addPostImage: {
    height: 62,
    width: 71,
  },
  postTextContainer: {
    width: "100%",
    marginTop: 15,
    gap: 10,
  },
  postText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.ARCHI_REGULAR,
    fontWeight: "800",
  },
  postContect: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.ARCHI_REGULAR,
    fontWeight: "700",
  },
  titleInputStyle: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: FONTS.ARCHI_REGULAR,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4E4E4E",
    padding: 10,
    marginTop: 3,
  },
  postTextInput: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: FONTS.ARCHI_REGULAR,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4E4E4E",
    height: 105,
    padding: 10,
    marginTop: 2,
  },
  imageHolder: {
    width: scale(17),
    height: scale(17),
    resizeMode: "contain",
  },
  smallModalContainer: {
    width: 250,
    height: 30,
    justifyContent: "center",
    marginVertical: 30,
    borderRadius: 10,
  },
  modalTextUpload: {
    textAlign: "center",
    fontSize: 20,
    color: COLORS.white,
    fontFamily: FONTS.ARCHI_BOLD,
    marginLeft: scale(4),
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: scale(300),
    backgroundColor: COLORS.lightBlack,
    alignSelf: "center",
    padding: "16@ms",
    paddingVertical: scale(20),
    borderRadius: scale(8),
    elevation: 5,
  },
  button: {
    width: 55,
    height: 55,
    backgroundColor: COLORS.themGreen,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    position: "absolute",
    bottom: 130,
    right: 20,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 35,
    fontWeight: "500",
  },
});
