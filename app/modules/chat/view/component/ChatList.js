import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { icons, images } from "../../../home/constant";
import styles from "./Style";
import { NavigationStrings } from "../../../../constants";
import moment from "moment";
import FastImage from "react-native-fast-image";
import getChatConversationApi from "../../../../api/chat/getChatConversation";

const ChatList = ({ data, navigation }) => {
  const formatMessageTimestamp = (timestamp) => {
    const now = moment();
    const messageTime = moment(timestamp);
    const diffInDays = now.diff(messageTime, "days");

    if (diffInDays === 0) {
      const diffInMinutes = now.diff(messageTime, "min");

      if (diffInMinutes < 60) {
        return `${diffInMinutes} min ago`;
      } else {
        return `${moment(timestamp).fromNow()}`;
      }
    } else if (diffInDays === 1) {
      return `Yesterday at ${moment(timestamp).format("hh:mm")}`;
    } else if (diffInDays < 7) {
      return moment(timestamp).format("dddd");
    } else {
      return moment(timestamp).format("MMM DD");
    }
  };

  const renderItem = ({ item, index }) => {
    let conversationId = item?.conversationId;
    return (
      <TouchableOpacity
        onPress={async () => {
          if (!conversationId) {
            const { data } = await getChatConversationApi(item?.id, item?.type);
            conversationId = data?.id;
          }
          navigation.navigate(NavigationStrings.CHAT, {
            conversationId,
          });
        }}
      >
        <View style={styles.chatItem}>
          {item?.profileImg?.prof_img1_org ? (
            <Image
              source={{ uri: item.profileImg.prof_img1_org }}
              style={styles.profileImage}
            />
          ) : (
            <Image source={images.User} style={styles.profileImage} />
          )}

          <View style={styles.chatContent}>
            <View style={styles.trainerInfo}>
              <Text style={styles.profileName}>
                {!!item.name ? item.name : "User"}
              </Text>
              {item.sessionDetails ? (
                <View style={styles.sessionInfo}>
                  <FastImage
                    source={icons.Session_icon}
                    style={styles.sessionIcon}
                  />
                  <Text style={styles.largeTextStyle}>
                    {item?.sessionDetails?.sessionCompleted}/
                    {item?.sessionDetails?.sessionCount}
                  </Text>
                </View>
              ) : null}
              {conversationId?<Text style={styles.lastMessageTime}>
                {formatMessageTimestamp(item?.messageDetails?.lastMessageTime)}
              </Text>:null}
            </View>

            <View style={styles.messageInfo}>
              {item.messageDetails && (
                <>
                  <Text style={styles.lastMessage}>
                    {item?.messageDetails?.lastMessage}
                  </Text>
                  {item?.messageDetails?.unreadMessageCount > 0 && (
                    <View style={styles.unReadView}>
                      <Text style={styles.unreadMessageCount}>
                        {item?.messageDetails?.unreadMessageCount}
                      </Text>
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item?.id}
      ItemSeparatorComponent={() => (
        <View style={{ backgroundColor: "gray", height: 0.7 }} />
      )}
    />
  );
};

export default ChatList;
