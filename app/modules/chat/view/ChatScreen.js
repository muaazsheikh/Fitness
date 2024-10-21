import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./Style";
import getChatApi from "../../../api/chat/getChat";
import setChatMessageApi from "../../../api/chat/setChatMessage";
import io from "socket.io-client";
import BackButton from "../../auth/component/back";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, icons, images } from "../../home/constant";
import FastImage from "react-native-fast-image";
import uploadImageApi from "../../../api/assets/uploadImage";
import { launchImageLibrary } from "react-native-image-picker";
import ProgressBar from "react-native-progress/Bar";
import { PrimaryButton } from "../../../components";
import StorageService from "../../../services/storage";

const ChatScreen = ({ route }) => {
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [inputMessage, setInputMessage] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [messagesList, setMessagesList] = React.useState([]);
  const [page, setPage] = React.useState(2);
  const [hasMore, setHasMore] = React.useState(true);
  const flatListRef = React.useRef();
  const [socket, setSocket] = React.useState(null); // Manage socket connection state

  const { conversationId } = route.params;

  React.useEffect(() => {
    if (!loading && messagesList.length > 0) {
      flatListRef?.current?.scrollToEnd({ animated: true });
    }
    fetchMyAPI();
  }, [loading]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" && !image) return;
    const data = await StorageService.getUser();
    const result = JSON.parse(data);
    const requestData = {
      message: inputMessage,
      conversationId,
      token: result.token,
      files: [image] || [],
      senderDetails: data?.userDetails,
    };
    console.log("requestData 61", JSON.stringify(requestData));

    try {
      socket.emit("sendMessage", requestData);
      setInputMessage("");
      setLoading(false);
      setImage(null);
      setTimeout(() => {
        flatListRef?.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      setLoading(false);
      console.log("error:::", error.response.data);
    }
  };

  const handleValue = () => {
    let prevProgress = 0;
    const interval = setInterval(() => {
      prevProgress += 0.1;
      setProgress(prevProgress >= 1 ? 1 : prevProgress);
      if (prevProgress >= 1) {
        setModalVisible(false);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  };

  React.useEffect(() => {
    const newSocket = io("http://44.215.62.250:5000"); // Ensure you initialize socket properly
    const startSocket = async () => {
      setSocket(newSocket);
      const data = await StorageService.getUser();
      newSocket.emit("join chat", conversationId);
      newSocket.emit("setup", { id: data?.memberId || data?.staffId });
      newSocket.on("message received", (newMessageReceived) => {
        if (conversationId === newMessageReceived?.conversationId) {
          setMessagesList((prevLiveMessage) => {
            const updatedMessages = [newMessageReceived, ...prevLiveMessage];
            return updatedMessages;
          });
        }
      });
    };
    startSocket();

    return () => {
      console.log("Disconnected from Socket.io server CLEANUP");
      newSocket.disconnect();
    };
  }, [conversationId]);

  async function fetchMyAPI(page) {
    try {
      const response = await getChatApi(conversationId, page);
      setData(response?.data);

      if (response.data?.messages?.length === 0) {
        setHasMore(false);
      } else {
        setMessagesList((prevMessages) => [
          ...prevMessages,
          ...(response.data?.messages || []),
        ]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log("error:::", error.response.data);
    } finally {
      setLoading(false);
    }
  }

  const UploadModal = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => setModalVisible(false)}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>
            <Text style={styles.modalTextUpload}>File upload</Text>

            <View style={styles.smallContainer}>
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
              {progress > 0.9 ? (
                <PrimaryButton
                  title={"Confirm"}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  color={false}
                  style={90}
                />
              ) : (
                <PrimaryButton
                  title={"Confirm"}
                  onPress={() => {
                    setModalVisible(false);
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

  const openPhotoGallery = () => {
    setProgress(0);
    setImage(null);
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
          const file = {
            uri: assets[0]?.uri,
            name: assets[0]?.fileName,
            filename: assets[0]?.fileName,
            type: assets[0]?.type,
          };
          setModalVisible(true);

          const formData = new FormData();
          formData.append("file", file);
          const imgResponse = await uploadImageApi(formData);
          console.log(JSON.stringify(imgResponse));
          if (imgResponse.status) {
            console.log(JSON.stringify(imgResponse));
            setImage(imgResponse.data);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = async () => {
    if (!loading && hasMore) {
      fetchMyAPI(page);
    }
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : null;
  };

  const SeperatorContainer = () => (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={messagesList}
        renderItem={({ item }) => (
          <View
            style={
              data?.userDetails?.id === item?.senderId
                ? [styles.chatView]
                : { justifyContent: "flex-end" }
            }
          >
            {data?.userDetails?.id === item?.senderId ? (
              <View style={{ alignSelf: "flex-start" }}>
                {item?.profileImg ? (
                  <Image
                    source={{ uri: item?.profileImg?.prof_img1_org }}
                    style={styles.profileImage}
                  />
                ) : (
                  <Image source={images.User} style={styles.profileImage} />
                )}
              </View>
            ) : null}
            <View
              style={[
                data?.userDetails?.id === item?.senderId
                  ? styles.receivedMessage
                  : styles.sentMessage,
              ]}
            >
              {item?.files && item.files[0] && item.files[0].original && (
                <Image
                  source={{ uri: item.files[0].original }}
                  style={styles.chatImage}
                />
              )}
              {item.message && (
                <Text
                  style={[
                    data?.userDetails?.id === item?.senderId
                      ? styles.receivedMessageText
                      : styles.sentMessageText,
                  ]}
                >
                  {item.message}
                </Text>
              )}
            </View>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        inverted
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.inputContainer}>
        <View style={styles.inputBorder}>
          <TouchableOpacity style={{}} onPress={openPhotoGallery}>
            <FastImage
              source={images.gallery}
              style={[styles.sendButtonImage, { marginTop: 5 }]}
            />
          </TouchableOpacity>
          {image && (
            <>
              <Image
                source={{ uri: image?.compressed }}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 5,
                  backgroundColor: "red",
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  left: 60,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => setImage(null)}
              >
                <Text style={[{ color: "black" }]}>X</Text>
                {/* <Ionicons name="close-circle" size={20} color={COLORS.red} /> */}
              </TouchableOpacity>
            </>
          )}
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={(text) => setInputMessage(text)}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.lightGray}
            multiline
          />
        </View>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => handleSendMessage()}
        >
          <Image source={images.send} style={styles.sendButtonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.themeGray }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : -500}
      >
        <View style={{ flex: 1 }}>
          <View style={{ alignSelf: "flex-start", marginLeft: 20 }}>
            <BackButton />
          </View>
          {UploadModal()}
          {SeperatorContainer()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
