import * as React from "react";

import { Alert, Text, View } from "react-native";

import styles from "./Style";

// import Seperator from "../../auth/component/seperator";

import { scale, verticalScale } from "react-native-size-matters";
import Spinner from "react-native-loading-spinner-overlay";
import getChatListApi from "../../../api/chat/getChatList";
import ChatList from "./component/ChatList";
import BackButton from "../../auth/component/back";
import { SafeAreaView } from "react-native-safe-area-context";
import Seperator from "../../../components/seperator";
import _ from "lodash";
import SearchBar from "../../../components/search";
import { CONTEXT } from "../../home/constant/theme";

import { useFocusEffect } from "@react-navigation/native";

import { useSelector } from "react-redux";


const ChatListScreen = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [chatData, setChatData] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const shouldRefresh = useSelector((state) => state.refresh.shouldRefresh);


  React.useEffect(() => {
    setLoading(true);
    async function fetchMyAPI() {
      try {
        const response = await getChatListApi();
        setData(response?.data?.response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error:::", error);
      }
    }
    fetchMyAPI();
  }, [shouldRefresh]);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const dataFilter = !searchQuery.length
        ? data
        : data.filter((item) =>
            item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
          );
      setChatData(dataFilter);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, data]);

  const SeperatorContainer = () => {
    return (
      <View
        style={{
          marginTop: verticalScale(10),
          marginBottom: verticalScale(30),
          flex: 1,
        }}
      >
        {chatData ? (
          <ChatList navigation={navigation} data={chatData} />
        ) : (
          !loading && <Seperator title={"No Data Available"} dimesion={150} />
        )}
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      </View>
    );
  };

  function renderSearchBar() {
    return (
      <SearchBar
        placeHolder={CONTEXT.search}
        handleInputChange={setSearchQuery}
      />
    );
  }

  return (
    <SafeAreaView style={styles.newAccountContainer}>
      <View style={styles.backButtonView}>
      </View>
      {renderSearchBar()}
      {SeperatorContainer()}
    </SafeAreaView>
  );
};

export default ChatListScreen;
