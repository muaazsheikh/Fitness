import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
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
import HeaderComponent from "../../component/HeaderComponent";
import FastImage from "react-native-fast-image";
import { FONTS } from "../../../home-member/constant";
import Swiper from "react-native-swiper";
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
import {
  addCommentOnBoard,
  addReplyOnComment,
  deleteBoardCommentApi,
  editBoardCommentApi,
  getBoardDetailApis,
} from "../../../../api/profile/gymBoardApis";

export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

const headersList = [
  "Center  Bulletin Board",
  "Feedback to the Center",
  "Notice Board",
  "Events",
];

const FeedbackCenterDetailScreen = ({ navigation, route }) => {
  const data = route.params.item;
  const type = route.params.type;
  const [thejalData, setThejalData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [selectedCommnet, setSelectedCommnet] = useState(null);
  const [selectedCommnetForReply, setSelectedCommnetForReply] = useState(null);
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
      const response = await getBoardDetailApis(data?.id, type);
      console.log(
        "This is create contact  response 79",
        JSON.stringify(response.data)
      );
      setIsLoading(false);
      setCommentsList(response?.data?.boardComments || []);
      setThejalData(response?.data);
    } catch (error) {
      setIsLoading(false);
      console.log("THis is get error", error);
    }
  }

  const handleAddComment = async () => {
    setIsLoading(true);
    try {
      if (selectedCommnet != null && selectedCommnetForReply == null) {
        const requestParam = {
          comment: input,
          commentId: selectedCommnet?.id,
          boardId: data?.id,
          type,
        };

        const response = await editBoardCommentApi(requestParam);
        setIsLoading(false);
        setInput("");
        setSelectedCommnet(null);
        fetchMyAPI();
      } else if (selectedCommnet === null && selectedCommnetForReply !== null) {
        const requestParam = {
          comment: input,
          parentCommentId: selectedCommnetForReply?.id,
          boardId: data?.id,
          type,
        };
        const response = await addReplyOnComment(requestParam);
        setIsLoading(false);
        setInput("");
        setSelectedCommnet(null);
        fetchMyAPI();
      } else {
        const requestParam = {
          comment: input,
          boardId: data?.id,
          type,
        };

        const response = await addCommentOnBoard(requestParam);
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
      const response = await deleteBoardCommentApi(data?.id, item?.id, type);
      // setCommentsList((prev) => prev.filter((val) => val.id !== item.id));
      fetchMyAPI();
      setIsLoading(false);
    } catch (error) {
      console.log("This is contact delete error response", error);
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
        title={headersList[type]}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );

  const ContactCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap:10
            }}
          >
            <FastImage source={icons.close_account} style={styles.closeIcon} />
            <Text style={styles.postTitle}>{item?.userDetails?.name}fsdfsdfsdfdsfdf </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap:6
            }}
          >
            <FastImage source={images.eyeIcon} style={{width:15,height:11}} />
            <Text style={styles.postTitle}>{item?.views}</Text>
          </View>
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
            source={{ uri: item?.userDetails?.profile?.prof_img1_min }}
            style={styles.commentAvatar}
            defaultSource={images.User}
          />
          <View style={styles.subContainer}>
            <Text style={styles.commentTimeText}>
              <Text style={styles.commentText}>
                {item?.gymStaffInfo?.name + "  "}
              </Text>
              {item?.comment + ".  "}
              {type != 1 ? (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    setSelectedCommnetForReply(item);
                    setInput("");
                    inputRef.current.focus();
                  }}
                >
                  <FastImage
                    source={images.replyIcon}
                    style={{ width: 10, height: 10 }}
                  />
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 12,
                      fontFamily: FONTS.ARCHI_REGULAR,
                    }}
                  >
                    Reply
                  </Text>
                </TouchableOpacity>
              ) : null}
            </Text>
          </View>
          {item.isCreatedByCurrentUser && (
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
          )}
        </View>
        <View
          style={{
            width: "85%",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginLeft: 45,
            gap: 50,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Text style={styles.timeTextStyle}>
            {moment(item.modifyDate).format("YYYY.MM.DD  |  hh.mm")}
          </Text>
        </View>

        <View style={{ marginTop: 12 }}>
          <FlatList
            data={item.comments}
            renderItem={({ item }) => {
              return (
                <View style={styles.commentReplyContainer}>
                  <View style={styles.commentReplyDetailView}>
                    <FastImage
                      source={{
                        uri: item?.userDetails?.profile?.prof_img1_min,
                      }}
                      style={styles.commentAvatar}
                      defaultSource={images.User}
                    />
                    <View style={styles.subContainer}>
                      <Text style={styles.commentTimeText}>
                        <Text style={styles.commentText}>
                          {item?.gymStaffInfo?.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "800",
                            fontFamily: FONTS.ARCHI_REGULAR,
                            color: "#00C2FF",
                          }}
                        >
                          {`(Auther) `}
                        </Text>
                        <Text style={styles.commentText}>
                          {"@" + item.authorDetails.gymStaffName + " "}
                        </Text>
                        {item?.comment + ". "}
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            gap: 5,
                            alignItems: "center",
                            alignItems: "center",
                          }}
                          onPress={() => {
                            setSelectedCommnetForReply(item);
                            setInput("");
                            inputRef.current.focus();
                          }}
                        >
                          <FastImage
                            source={images.replyIcon}
                            style={{ width: 11, height: 10 }}
                          />
                          <Text
                            style={{
                              color: COLORS.white,
                              fontSize: 12,
                              fontFamily: FONTS.ARCHI_REGULAR,
                            }}
                          >
                            Reply
                          </Text>
                        </TouchableOpacity>
                      </Text>
                    </View>
                    {item.isCreatedByCurrentUser && (
                      <Menu rendererProps={{ anchorStyle: styles.anchorStyle }}>
                        <MenuTrigger style={styles.menuTriggerView}>
                          <Image
                            style={styles.menuIcon}
                            source={images.menuIcon}
                          />
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
                            <Text style={styles.menuTextColor}>
                              Delete comment
                            </Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    )}
                  </View>
                  <View
                    style={{
                      width: "85%",
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                      marginLeft: 35,
                      gap: 20,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.commentReplyTimeText}>
                      {moment(item.modifyDate).format("YYYY.MM.DD  |  hh.mm")}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
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

export default FeedbackCenterDetailScreen;

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
    justifyContent:'space-between',
    gap: 10,
    paddingHorizontal:2
  },
  closeIcon: {
    height: 23,
    width: 19,
  },
  postTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.ARCHI_REGULAR,
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
  },
  commentContent: {
    marginLeft: 10,
    width: "85%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
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
    lineHeight: 18,
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
    marginTop: 6,
  },
  dividerLine: {
    height: 1,
    width: "91%",
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
  commentReplyContainer: {
    borderTopWidth: 1,
    borderColor: "#5F5D60",
    paddingVertical: 12,
    width: "85%",
    alignSelf: "center",
  },
  commentReplyDetailView: {
    marginLeft: 2,
    width: "85%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  commentReplyTimeText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: FONTS.ARCHI_REGULAR,
    marginTop: 6,
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
