import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  Modal,
  Image,
  FlatList,
  TextInput,
  Alert,
  StatusBar,
} from "react-native";
import { COLORS, SIZES, icons, images } from "../constant";
import styles from "../component/calendar/Style";
import CustomCalendar from "../component/calendar";
import { CONTEXT } from "../constant/theme";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import FastImage from "react-native-fast-image";
import UserReserveModel from "../component/modal/UserReserveModel";
import ConfirmModal from "../component/modal/ConfirmModal";
import SearchBar from "../../../components/search";

const HomeScreen = () => {
  const navigation = useNavigation();
  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [reseveModel, setReseveModel] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalReject, setModalReject] = useState(false);

  const [data, setData] = useState([
    { id: 1, name: "Mathew kim" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Mathew kim" },
    { id: 4, name: "Jhone dim" },
    { id: 5, name: "Tom Seno" },
  ]);
  const ReserveData = [
    { id: 1, date: "10.20", time: "10:30am", session: "3/20", user: "Costa" },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleInputChange = _.debounce((text) => {
    setSearchQuery(text);
    setSearchHistory((prevHistory) => [searchQuery, ...prevHistory]);
  }, 500);

  function renderHeader() {
    return (
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.textReserve}>Reservation</Text>
      </View>
    );
  }

  function renderNewSeasonSection() {
    return <CustomCalendar />;
  }

  function renderRecentSearch() {
    return (
      <>
        <Text style={styles.recentHeadingText}>{CONTEXT.RecentlySearched}</Text>

        <View style={styles.recentSearchView}>
          <TouchableOpacity style={styles.arrowView}>
            <FastImage source={images.left_arrow} style={styles.arrowImg} />
          </TouchableOpacity>
          <FlatList
            data={searchHistory}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.flatlistContainer}
            renderItem={({ item }) => (
              <View style={styles.RecentlyView}>
                <View style={styles.imageView}>
                  <Image
                    source={icons.tab_profile}
                    style={styles.userIcon}
                    tintColor={COLORS.white}
                  />
                </View>
                <View>
                  <Text style={styles.userNameText}>{item}</Text>
                </View>
              </View>
            )}
          />
          <TouchableOpacity style={styles.arrowView}>
            <FastImage source={images.right_arrow} style={styles.arrowImg} />
          </TouchableOpacity>
        </View>
      </>
    );
  }

  function renderSearchBar() {
    return (
      <SearchBar
        title={CONTEXT.SearchTrain}
        placeHolder={CONTEXT.search}
        handleInputChange={handleInputChange}
      />
    );
  }

  function renderUserList() {
    return (
      <ScrollView style={{ height: 135, flexGrow: 1 }}>
        <View>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setReseveModel(true)}
                style={styles.userList}
              >
                <View style={styles.imageView}>
                  <Image
                    source={icons.tab_profile}
                    style={styles.userIcon}
                    tintColor={COLORS.white}
                  />
                </View>
                <View>
                  <Text style={styles.nameText}>
                    {item.name}(F, 24(or bday))
                  </Text>
                  <View style={styles.textView}>
                    <Image
                      source={icons.Session_icon}
                      style={styles.imageSmall}
                    />
                    <Text style={styles.sessionText}>{CONTEXT.session}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.themeGray, flex: 0 }}>
      <StatusBar barStyle={"light-content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {renderHeader()}
        {renderNewSeasonSection()}
        {searchQuery && renderRecentSearch()}
        {renderSearchBar()}
        {renderUserList()}

        <ConfirmModal
          modalVisible={modalConfirm}
          setModalVisible={setModalConfirm}
          // selectedState={selectedState}
        />

        <UserReserveModel
          visible={reseveModel}
          onRequestClose={() => setReseveModel(false)}
          data={ReserveData}
          confirmText={CONTEXT.confirm}
          rejectText={CONTEXT.reject}
          onConfirm={() => {
            setReseveModel(false);
            setModalConfirm(true);
          }}
          onReject={() => {
            setReseveModel(false);
            // setModalReject(true);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
