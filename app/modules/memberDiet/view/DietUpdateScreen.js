// DietUpdateScreen.tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import DietHeader from "./component/header";
import { COLORS, icons, images } from "../../home/constant";
import CalendarModal from "./component/modal/CalendarModal";
import DietList from "./component/DietListComponent";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import { NavigationStrings } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  dietListFailure,
  dietListRequest,
  dietListSuccess,
} from "../../../redux/getDietSlice";
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import Seperator from "../../../components/seperator";
import { CONTEXT } from "../../home/constant/theme";
import getMemberDietListApi from "../../../api/member-diet/getMemberDietList";
import DietListUpdate from "./component/TrainerDietListComponent";

const DietUpdateScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.dietList.user);
  const [dataUpdate, setDataUpdate] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleUpdate = () => {
    setUpdate(true);
  };

  // useEffect(() => {}, [dataUpdate]);

  // useEffect(() => {}, [loading]);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}.${day}`;
  };

  const [modalCalender, setModalCalender] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectDate, setSelectDate] = React.useState(new Date());
  const [meal, setMeal] = React.useState("All");
  const [dinner, setDinner] = React.useState(null);
  const [lunch, setLunch] = React.useState(null);
  const [snacks, setSnacks] = React.useState(null);
  const [breakfast, setBreakfast] = React.useState(null);
  const [all, setAll] = useState(null);
  const shouldRefresh = useSelector((state) => state.refresh.shouldRefresh);

  const handleDateSelect = (date) => {
    setSelectDate(date);
    setSelectedDate(date);
    setModalCalender(false);
  };
  const handleValueChange = (value) => {
    setMeal(value);
    if (value === "1") {
      setDataUpdate(breakfast);
    } else if (value === "2") {
      setDataUpdate(lunch);
    } else if (value === "3") {
      setDataUpdate(dinner);
    } else if (value === "4") {
      setDataUpdate(snacks);
    } else {
      setDataUpdate(all);
    }
  };

  const handleShareChange = (shareStatus) => {
    setShare(shareStatus);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (shouldRefresh) {
        // setSelectDate('')
      }
      fetchMyAPI();

      return () => {};
    }, [selectedDate, update, shouldRefresh])
  );

  async function fetchMyAPI() {
    try {
      setLoading(true);
      dispatch(dietListRequest());
      const response = await getMemberDietListApi(selectedDate);
      console.log(JSON.stringify(response.data));
      const breakfast = response?.data?.filter(
        (item) => item?.meal === "Breakfast"
      );
      const lunch = response?.data?.filter((item) => item?.meal === "Lunch");

      const dinner = response?.data?.filter((item) => item?.meal === "Dinner");
      const snacks = response?.data?.filter((item) => item?.meal === "Snacks");
      const all = response?.data?.filter((item) => item);
      setDataUpdate(all);
      setDinner(dinner);
      setBreakfast(breakfast);
      setLunch(lunch);
      setSnacks(snacks);
      setAll(all);
      setLoading(false);

      dispatch(dietListSuccess(response));
      setUpdate(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      dispatch(dietListFailure(error.message));
    }
  }
  const Header = () => (
    <View style={[styles.updateHeader, { width: 300 }]}>
      <DietHeader
        onShareChange={handleShareChange}
        visible={false}
        date={formattedDate(selectDate)}
        onValueChange={handleValueChange}
        onPress={() => setModalCalender(true)}
      />
    </View>
  );

  const renderItem = ({ item }) => {
    if (item?.dietLogs?.trainerLogs) {
      return (
        <DietListUpdate
          value={item?.value}
          imgUrl={item?.images?.original}
          type={item?.type}
          memberName={item?.memberDetails?.name}
          trainerName={item?.trainerDetails?.name}
          navigation={navigation}
          sharedToTrainer={item?.sharedToTrainer}
          contentNote={item?.notes}
          dietLogDate={formattedDate(item?.dietLogDate)}
          meal={item?.meal}
          data={item}
          dietLogs={item?.dietLogs}
          trainer={true}
          id={item?.id}
        />
      );
    } else {
      return (
        <DietList
          value={item?.value}
          imgUrl={item?.images}
          type={item?.type}
          navigation={navigation}
          sharedToTrainer={item?.sharedToTrainer}
          contentNote={item?.dietLogs?.memberNotes}
          dietLogDate={item?.dietLogDate}
          meal={item?.meal}
          dietLogs={item?.dietLogs}
          id={item?.id}
          onUpdate={handleUpdate}
        />
      );
    }
  };

  const ModalContainer = () => (
    <CalendarModal
      modalVisible={modalCalender}
      setModalVisible={setModalCalender}
      selectedDate={selectedDate}
      onSelectDate={handleDateSelect}
    />
  );

  const keyExtractor = (item) => item.id.toString();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.themeGray }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.newAccountContainer}>
          {Header()}
          {/* {dataUpdate && ( */}
          <FlatList
            extraData={update}
            data={dataUpdate}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
          {/* )} */}

          {dataUpdate?.length < 1 && !loading && (
            <Seperator
              imageUrl={images.dish_placeholder}
              title={CONTEXT.diet_placeholder}
              dimesion={150}
            />
          )}

          {ModalContainer()}
          {/* {renderPluseiconModel()} */}
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </View>
      </ScrollView>
      <View style={[styles.addYellowview, { flexDirection: "row" }]}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          {!modalVisible ? (
            <FastImage
              source={icons.plus_icon}
              style={[styles.modelIcon, { tintColor: COLORS.black }]}
            />
          ) : (
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{ height: "100%", paddingLeft: 10 }}
            >
              <Text style={styles.minus}> – </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        {modalVisible && (
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              navigation.navigate(NavigationStrings.DIET_CREATE_SCREEN);
            }}
          >
            <Text style={styles.modalText}>Create New Diet log</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DietUpdateScreen;
