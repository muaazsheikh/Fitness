import React, { useEffect, useState } from "react";
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
  StatusBar,
} from "react-native";
import { COLORS, SIZES, icons, images } from "../constant";
import styles from "../component/calendar/Style";
import CustomCalendar from "../component/calendar";
import { CONTEXT } from "../constant/theme";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import FastImage from "react-native-fast-image";
import ConfirmModal from "../component/modal/ConfirmModal";
import SearchBar from "../../../components/search";
import { scale } from "react-native-size-matters";
import getTraineeDataApi from "../../../api/trainer-home/getTraineeData";
import { PrimaryButton } from "../../../components";
import ReserveScheduleModel from "../component/modal/ReserveScheduleModel";
import Spinner from "react-native-loading-spinner-overlay";
import FlashMessage from "../../../components/flash";
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from "react-native-keyboard-aware-scroll-view";
import memberSearchHistory from "../../../api/trainer-home/memberSearchHistory";
import getMemberSearchHistory from "../../../api/trainer-home/getMemberSearchHistory";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [reseveModel, setReseveModel] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [week, setWeeks] = useState(null);
  const [reserveData, setReserveData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const showMessage = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide the message after 3 seconds
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };
  const handleWeeksChange = (weeks) => {
    setWeeks(weeks); // Update weeks state in the parent component
  };

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await getTraineeDataApi(searchQuery);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log("errrrr", JSON.stringify(error));
      }
    }
    getSearchHistory();
    fetchData();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await getTraineeDataApi(searchQuery);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    }, 0);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleNavigation = (nav) => {
    !!searchQuery.length && handleSearchHistory();
    if (nav === "Edit") {
      if (!selectedUser || !selectedDate || !selectedTime || !week) {
        showMessage();
        return;
      }
      const reservations = [];
      for (let i = 0; i < week; i++) {
        const sessionCompleted = selectedUser.sessionCompleted + i + 1;
        const millisecondsInDay = 24 * 60 * 60 * 1000;
        const currentDate = new Date(selectedDate);
        const nextWeekDate = new Date(
          currentDate.getTime() + 7 * i * millisecondsInDay
        ); // Add 7 days for each week
        const formattedDate = nextWeekDate.toISOString().split("T")[0];
        reservations.push({
          id: selectedUser.memberId,
          date: formattedDate,
          time: selectedTime,
          session: `${sessionCompleted}/${selectedUser.sessionCount}`,
          user: selectedUser.name,
        });
      }
      // Set the reservation data
      setReserveData(reservations);
      // Show the modal to confirm the reservation
      setReseveModel(true);
    } else {
      navigation.goBack();
    }
  };
  const handleSearchHistory = async () => {
    try {
      await memberSearchHistory({
        memberId: selectedUser.memberId,
      });
    } catch (error) {
      console.log("handleSearchHistory error", JSON.stringify(error));
    }
  };
  const getSearchHistory = async () => {
    try {
      const response = await getMemberSearchHistory();

      setSearchHistory(response?.data?.history);
    } catch (error) {
      console.log("error", JSON.stringify(error));
    }
  };

  const ReserveData = [
    { id: 1, date: "10.20", time: "10:30am", session: "3/20", user: "Costa" },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleInputChange = _.debounce((text) => {
    setSearchQuery(text);
    // setSearchHistory((prevHistory) => [searchQuery, ...prevHistory]);
  }, 500);

  function renderHeader() {
    return (
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.textReserve}>Reservation</Text>
      </View>
    );
  }

  function renderNewSeasonSection() {
    return (
      <CustomCalendar
        onDateSelect={handleDateSelection}
        onTimeSelect={handleTimeSelection}
        onWeeksChange={handleWeeksChange}
      />
    );
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
            keyExtractor={(item) => item?.id}
            contentContainerStyle={styles.flatlistContainer}
            renderItem={({ item }) => (
              <View style={styles.RecentlyView}>
                <View style={styles.imageView}>
                  <Image
                    source={icons.recent_profile}
                    style={styles.userIcon}
                  />
                </View>
                <View>
                  <Text style={styles.userNameText}>{item?.name}</Text>
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
        onPress={() => {
          handleNavigation("Edit");
        }}
      />
    </View>
  );
  const calculateAge = (birthdate) => {
    const [day, month, year] = birthdate?.split("-").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  const flatListHeight = data.length > 3 ? 250 : "auto";
  function renderUserList() {
    return (
      <View style={{ marginTop: 15 }}>
        <FlatList
          style={{ height: flatListHeight }}
          scrollEnabled={true}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedUser(item)}
              style={[
                styles.userList,
                {
                  borderColor:
                    selectedUser && selectedUser.id === item.id
                      ? COLORS.themGreen
                      : COLORS.transparent,
                },
              ]}
            >
              <View style={styles.imageView}>
                <Image
                  source={icons.recent_profile}
                  style={styles.userIcon}
                />
              </View>
              <View>
                <Text style={styles.nameText}>
                  {`${item?.name} (${item?.gender ? item?.gender + "," : ""} ${
                    item?.birth ? calculateAge(item?.birth) + " (or bday)" : ""
                  })`}
                </Text>
                <View style={styles.textView}>
                  <Image
                    source={icons.Session_icon}
                    style={styles.imageSmall}
                  />
                  <Text style={styles.sessionText}>
                    {CONTEXT.session} {item?.sessionCompleted}/
                    {item?.sessionCount}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.themeGray, flex: 0 }}>
      <StatusBar barStyle={"light-content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          {renderHeader()}
          {renderNewSeasonSection()}
          {!!searchHistory.length && renderRecentSearch()}
          {renderSearchBar()}
          {renderUserList()}
          {Button()}
          {isVisible && (
            <FlashMessage
              bottom={true}
              message={"Please select date, time, and user"}
            />
          )}
          <ConfirmModal
            modalVisible={modalConfirm}
            setModalVisible={setModalConfirm}
            // selectedState={selectedState}
          />

          <ReserveScheduleModel
            visible={reseveModel}
            onRequestClose={() => setReseveModel(false)}
            data={reserveData}
            confirmText={CONTEXT.confirm}
            rejectText={CONTEXT.reject}
            onConfirm={() => {
              setReseveModel(false);
              setModalConfirm(true);
              navigation.goBack();
            }}
            navigation={navigation}
            onReject={() => {
              setReseveModel(false);
              // setModalReject(true);
            }}
          />
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
