import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import _ from "lodash";
import { COLORS, icons } from "../../../workout/constant";
import { CONTEXT } from "../../../home/constant/theme";
import HeaderComponent from "../../component/HeaderComponent";
import FastImage from "react-native-fast-image";
import { FONTS } from "../../../home-member/constant";
import Swiper from "react-native-swiper";
import {
  addCommentOnThejalContact,
  deleteContactApi,
  editContactCommentApi,
  getThejalContact,
  getThejalContactDetailByID,
} from "../../../../api/profile/getThejalContact";
import Spinner from "react-native-loading-spinner-overlay";
import { images } from "../../../home/constant";
import { MenuProvider } from "react-native-popup-menu";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import moment from "moment";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
} from "react-native-reanimated";

export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

const ThejalContactDetailScreen = ({ navigation, route }) => {
  const data = route.params;
  const [thejalData, setThejalData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [selectedCommnet, setSelectedCommnet] = useState(null);
  const [visibleItemsCount, setVisibleItemsCount] = useState(5);
  const inputRef = useRef();
  const lockedHeight = useSharedValue(0);
  const keyb = useAnimatedKeyboard({
    isStatusBarTranslucentAndroid: true,
  });

  useEffect(() => {
    fetchMyAPI();
  }, []);

  async function fetchMyAPI() {
    try {
      setIsLoading(true);
      const response = await getThejalContactDetailByID(data?.id);
      setIsLoading(false);
      setCommentsList(response?.data?.reply);
      setThejalData(response?.data);
    } catch (error) {
      setIsLoading(false);
      console.log(JSON.stringify(error.response));
    }
  }

  const handleAddComment = async () => {
    setIsLoading(true);
    try {
      if (selectedCommnet != null) {
        const requestParam = {
          comment: input,
          contactId: data?.id,
          commentId: selectedCommnet?.id,
        };
        const response = await editContactCommentApi(requestParam);
        setIsLoading(false);
        setInput("");
        setSelectedCommnet(null);
        fetchMyAPI();
      } else {
        const requestParam = {
          comment: input,
          contactId: data?.id,
        };
        const response = await addCommentOnThejalContact(requestParam);
        setIsLoading(false);
        setInput("");
        fetchMyAPI();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(
        "This is create contact error response",
        JSON.stringify(error.response)
      );
    }
  };

  const onDeleteComment = async (item) => {
    setIsLoading(true);
    try {
      const requestParam = {
        contactId: data?.id,
        commentId: item?.id,
      };
      const response = await deleteContactApi(requestParam);
      setCommentsList((prev) => prev.filter((val) => val.id !== item.id));
      setIsLoading(false);
    } catch (error) {
      console.log(
        "This is contact delete error response",
        JSON.stringify(error.response)
      );
      setIsLoading(false);
    }
  };

  const handleViewMore = () => {
    setVisibleItemsCount((prevCount) => prevCount + 5);
  };

  const translateList = useAnimatedStyle(() => {
    if (lockedHeight.value && lockedHeight.value > keyb.height.value) {
      return {
        top: -lockedHeight.value,
      };
    }

    return {
      top: -keyb.height.value,
    };
  }, [keyb.height.value]);

  const inputAnimatedStyle = useAnimatedStyle(() => {
    if (!keyb.height.value) {
      return {
        marginBottom: 100,
      };
    }
    return {
      marginBottom: 0,
    };
  }, [keyb.height.value]);

  const Header = () => (
    <View style={styles.headerContainer}>
      <HeaderComponent
        title={CONTEXT.contactToThejal}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );

  const ContactCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.postContainer}>
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
          <Text style={styles.postText}>{item?.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderComments = ({ item }) => {
    return (
      <View style={styles.comment}>
        <View style={styles.commentContent}>
          <FastImage
            source={{ uri: data.userDetails?.profile.prof_img1_min }}
            style={styles.commentAvatar}
            defaultSource={images.User}
          />
          <View style={styles.subContainer}>
            <Text style={styles.commentTimeText}>
              <Text style={styles.commentText}>
                {item?.userDetails?.name + "  "}
              </Text>
              {item?.comment}
            </Text>
          </View>
          <Menu rendererProps={{ anchorStyle: styles.anchorStyle }}>
            <MenuTrigger style={styles.menuTriggerView}>
              <Image style={styles.menuIcon} source={images.menuIcon} />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption
                style={styles.menuOptionView}
                onSelect={() => {
                  setInput(item.comment);
                  setSelectedCommnet(item);
                  inputRef.current.focus();
                }}
              >
                <Text style={styles.menuTextColor}>Edit</Text>
              </MenuOption>
              <MenuOption
                style={styles.deleteMenuOptionView}
                onSelect={() => onDeleteComment(item)}
              >
                <Text style={styles.menuTextColor}>Delete comment</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <Text style={styles.timeTextStyle}>
          {moment(item.modifyDate).format("YYYY.MM.DD  |  hh.mm")}
        </Text>
      </View>
    );
  };

  return (
    <MenuProvider>
      <SafeAreaView style={styles.newAccountContainer}>
        <Animated.View style={[translateList, { flex: 1 }]}>
          {Header()}
          <ScrollView showsVerticalScrollIndicator={false}>
            <ContactCard item={data} />
            <FlatList
              data={commentsList?.slice(0, visibleItemsCount)}
              renderItem={renderComments}
              contentContainerStyle={{
                marginBottom: commentsList.length > visibleItemsCount ? 0 : 50,
              }}
              ItemSeparatorComponent={() => <View style={styles.dividerLine} />}
              keyboardShouldPersistTaps="handled"
            />
            {commentsList.length > visibleItemsCount && (
              <TouchableOpacity
                onPress={handleViewMore}
                style={styles.viewMoreContainer}
              >
                <Text style={styles.viewMoreText}>View More...</Text>
              </TouchableOpacity>
            )}
            <Animated.View style={[styles.textInputView, inputAnimatedStyle]}>
              <TextInput
                ref={inputRef}
                value={input}
                placeholder="Write a comment"
                placeholderTextColor="#8A8A8A"
                style={styles.messageTextInput}
                onChangeText={setInput}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleAddComment}
              >
                <Image source={images.send} style={styles.send} />
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
          <Spinner
            visible={isLoading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </Animated.View>
      </SafeAreaView>
    </MenuProvider>
  );
};

export default ThejalContactDetailScreen;

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
  postContainer: {
    width: "93%",
    backgroundColor: "#353638",
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 5,
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
  },

  commentsContainer: {
    flex: 1,
    backgroundColor: "#111",
  },
  comment: {
    paddingHorizontal: 10,
    paddingBottom: 8,
    marginTop: 15,
    gap: 6,
  },
  commentContent: {
    marginLeft: 10,
    width: "85%",
    flexDirection: "row",
    gap: 10,
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 20,
  },
  menuIcon: {
    width: 14,
    height: 3,
    tintColor: "#D9D9D9",
  },
  commentText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: FONTS.ARCHI_REGULAR,
    fontWeight: "800",
  },
  commentTimeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: FONTS.ARCHI_REGULAR,
    lineHeight: 14,
  },
  textToolWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
  },
  textInputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#747474",
    marginBottom: 100,
    height: 45,
    borderRadius: 23,
    borderRadius: 6,
    width: "93%",
    alignSelf: "center",
  },
  messageTextInput: {
    width: "90%",
    alignSelf: "center",
    paddingHorizontal: 10,
    color: "#FFFFFF",
  },
  send: {
    width: 21,
    height: 18,
    tintColor: "#AAAAAA",
  },
  menuTriggerView: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    paddingTop: 5,
  },
  menuTextColor: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 14,
    fontFamily: FONTS.ARCHI_BOLD,
  },
  subContainer: {
    flexDirection: "row",
    width: "90%",
    gap: 2,
  },
  menuOptionView: {
    marginTop: 10,
    paddingStart: 8,
  },
  deleteMenuOptionView: {
    marginTop: 10,
    backgroundColor: "#858585",
    justifyContent: "center",
    padding: 8,
  },
  timeTextStyle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: FONTS.ARCHI_REGULAR,
    marginLeft: 50,
  },
  dividerLine: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#5F5D60",
  },
  viewMoreContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
    paddingTop: 10,
  },
  viewMoreText: {
    color: COLORS.themGreen,
    fontFamily: FONTS.ARCHI_BOLD,
    fontWeight: "700",
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "transparent",
    paddingRight: 15,
    paddingTop: 20,
  },
  optionsWrapper: {
    borderRadius: 12,
    backgroundColor: "#353638",
    paddingVertical: 12,
    shadowColor: "#00000017",
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.01,
    shadowRadius: 1.4,
    elevation: 1,
  },
};
