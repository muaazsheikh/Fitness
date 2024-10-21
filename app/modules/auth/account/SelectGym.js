import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { NavigationStrings } from "../../../constants";
import LogoComp from "../component/logo";
import styles from "./view/Style";
import { COLORS, CONTEXT } from "../../home/constant/theme";
import { icons, images } from "../../home/constant";
import StorageService from "../../../services/storage";
import {
  selectGymSuccess,
  selectRequest,
  selectgymFailure,
} from "../../../redux/gymSlice";
import gymSelectApi from "../../../api/auth/GymSelect";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Seperator from "../component/seperator";
import Spinner from "react-native-loading-spinner-overlay";
import FlashMessage from "../../../components/flash";
import TextInputWithIcon from "../component/input";
import { scale } from "react-native-size-matters";
import PrimaryButton from "../../../components/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import centerSaveApi from "../../../api/auth/centerSave";
import CustomModal from "./view/CenterModal";

const SelectGym = ({ navigation }) => {
  // staff: 0,
  // trainer: 1,
  // owner: 2,
  // user: 3,
  // admin: 4,
  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.auth?.user);
  const [selectedRole, setSelectedRole] = useState(1);
  const [memberList, setMemberList] = useState(userData?.data?.memberGyms);
  const [trainerList, setTrainerList] = useState(userData?.data?.trainerGyms);
  const [dataList, setDataList] = useState(userData?.data?.trainerGyms);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const showMessage = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide the message after 3 seconds
  };

  useEffect(() => {
    console.log(dataList);
  }, []);

  const handleViewPress = (view) => {
    setSelectedItem(null);
    setSelectedRole(view);
    if (view === 1) {
      setDataList(trainerList);
    } else {
      setDataList(memberList);
    }
  };

  const loginbutton = async () => {
    if (selectedItem !== null) {
      try {
        dispatch(selectRequest());
        setLoading(true);
        const response = await gymSelectApi(selectedRole, selectedItem?.id);
        await AsyncStorage.setItem("userInfo", JSON.stringify(response));
        setLoading(false);

        StorageService.setUser(response.data || null);

        dispatch(selectGymSuccess(response));
        if (selectedRole === 1) {
          await AsyncStorage.setItem("userType", "trainer");
          navigation.replace(NavigationStrings.TRAINER_TAB);
        } else {
          await AsyncStorage.setItem("userType", "member");
          navigation.replace(NavigationStrings.MEMBER_TAB);
        }
      } catch (error) {
        setLoading(false);
        console.log(JSON.stringify(error.response.data.message));
        dispatch(selectgymFailure(error.message));
      }
    } else {
      setLoading(false);
      showMessage();
    }
  };

  const handleSendButtonPress = async () => {
    try {
      const response = await centerSaveApi(name, address);
      setName("");
      setAddress("");
      console.log(JSON.stringify(response));
      setName("");
      setAddress("");
      setLoading(false);
      setModalVisible(true);
    } catch (error) {
      setLoading(false);
      if (
        error.response.data.statusCode === 404 ||
        error.response.data.statusCode === 400
      ) {
        setModalCancel(true);
      }
      console.log("error:::", error.response.data);
    }
  };
  const renderHeaderTextContainer = () => (
    <View>
      <LogoComp title={CONTEXT.multiplegym + `:`} />
      <View style={{ alignSelf: "center", flexDirection: "row" }}>
        <TouchableOpacity
          style={[
            styles.flexDisableView,
            selectedRole === 1 && styles.flexContainer,
          ]}
          onPress={() => {
            handleViewPress(1);
          }}
        >
          <Text
            style={[styles.text, selectedRole === 1 && styles.deselectText]}
          >
            {CONTEXT.trainer}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.flexDisableView,
            selectedRole === 3 && styles.flexContainer,
          ]}
          onPress={() => {
            handleViewPress(3);
          }}
        >
          <Text
            style={[styles.text, selectedRole === 3 && styles.deselectText]}
          >
            {CONTEXT.member}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => setSelectedItem(item)}
      style={
        selectedItem?.id === item?.id
          ? styles.cardContainer
          : styles.cardContainerLight
      }
    >
      <Image style={styles.imgStyle} source={images.cover_img} />
      <View>
        <Text style={styles.titleText}>{item?.name}</Text>
        <View style={styles.verticalLine} />

        {Object?.keys(item?.workingHour).map((day, index) => (
          <View>
            <View key={index} style={styles.flexRow}>
              <View style={styles.rowViewAndImg}>
                <Image source={images.CalendarIcon} style={styles.smallView} />
                <Text style={styles.smallText}>{day.toUpperCase()}</Text>
              </View>
              <View style={styles.rowViewAndImg}>
                <Image source={images.ClockIcon} style={styles.smallView} />
                <Text style={styles.smallText}>{item?.workingHour[day]}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.flexRow}>
          {/* <View key={index} style={styles.rowViewAndImg}>
              <Image source={images.CalendarIcon} style={styles.smallView} />
              <Text style={styles.smallText}>{item.workingHour}</Text>
            </View> */}
        </View>

        <Text style={[styles.smallText, { color: COLORS.red }]}>
          Closed - <Text style={styles.smallText}>on public holiday</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderInputContainer = () => (
    <SafeAreaView style={{ flex: 1 }}>
      {!dataList?.length > 0 && (
        <Seperator title={"No Data Available"} dimesion={150} />
      )}
      {!memberList && trainerList ? (
        <View
          style={
            {
              // marginBottom: scale(380),
              // backgroundColor: "red",
            }
          }
        >
          <ScrollView>
            <View style={styles.card}>
              <View style={styles.imageContainer}>
                <Image
                  source={images.handSetting} // Replace with your image URL
                  style={styles.image}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.description}>{CONTEXT.youCan}</Text>
              </View>
            </View>

            <View style={styles.horizontalLine} />

            <View style={styles.card}>
              <View style={styles.imageContainer}>
                <Image
                  source={images.infoPlus} // Replace with your image URL
                  style={[styles.image, { width: 56, height: 56 }]}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.description}>{CONTEXT.ifYour}</Text>
              </View>
            </View>

            <View style={styles.textInputContainer}>
              <TextInputWithIcon
                name={true}
                placeholder={CONTEXT.centerName}
                onChangeText={(text) => setName(text)}
                value={name}
                completed={true}
              />
              <TextInputWithIcon
                placeholder={CONTEXT.address}
                onChangeText={(text) => setAddress(text)}
                value={address}
                keyboardType="numeric"
                completed={true}
              />

              <Spinner
                visible={loading}
                textContent={"Loading..."}
                textStyle={{ color: "#FFF" }}
              />
              <CustomModal
                onClose={() => setModalVisible(false)}
                // upperText={"Verification code was sent successfully"}
                visible={modalVisible}
                imageUrl={images.success}
                button={"Confirm"}
                cross={() => setModalVisible(false)}
                text={
                  "The information you added has been recorded \n\nWe will request for  using Thejal "
                }
              />
            </View>
          </ScrollView>
        </View>
      ) : null}

      <View
        style={{
          marginBottom: 0,
        }}
      >
        {dataList ? (
          <FlatList
            data={dataList}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View
            style={
              {
                // marginBottom: scale(380),
                // backgroundColor: "red",
              }
            }
          >
            <ScrollView>
              <View style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image
                    source={images.handSetting} // Replace with your image URL
                    style={styles.image}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.description}>{CONTEXT.youCan}</Text>
                </View>
              </View>

              <View style={styles.horizontalLine} />

              <View style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image
                    source={images.infoPlus} // Replace with your image URL
                    style={[styles.image, { width: 56, height: 56 }]}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.description}>{CONTEXT.ifYour}</Text>
                </View>
              </View>

              <View style={styles.textInputContainer}>
                <TextInputWithIcon
                  name={true}
                  placeholder={CONTEXT.centerName}
                  onChangeText={(text) => setName(text)}
                  value={name}
                  completed={true}
                />
                <TextInputWithIcon
                  placeholder={CONTEXT.address}
                  onChangeText={(text) => setAddress(text)}
                  value={address}
                  keyboardType="numeric"
                  completed={true}
                />

                <Spinner
                  visible={loading}
                  textContent={"Loading..."}
                  textStyle={{ color: "#FFF" }}
                />
                <CustomModal
                  onClose={() => setModalVisible(false)}
                  // upperText={"Verification code was sent successfully"}
                  visible={modalVisible}
                  imageUrl={images.success}
                  button={"Confirm"}
                  cross={() => setModalVisible(false)}
                  text={
                    "The information you added has been recorded \n\nWe will request for  using Thejal "
                  }
                />
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );

  return (
    <View style={styles.newAccountContainer}>
      {isVisible && <FlashMessage top={true} message={"Please select gym"} />}
      {renderHeaderTextContainer()}

      <KeyboardAwareScrollView
        enabled={false}
        behavior="padding"
        style={{ flex: 1 }}
        contentContainerStyle={styles.keyboardAvoidingViewStyle}
      >
        {renderInputContainer()}

        <SafeAreaView style={{ alignItems: "center" }}>
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </SafeAreaView>
      </KeyboardAwareScrollView>
      {dataList.length > 0 ? (
        <TouchableOpacity
          disabled={selectedItem ? false : true}
          onPress={() => loginbutton()}
          style={[
            styles.buttonView,
            { backgroundColor: selectedItem ? COLORS.themGreen : COLORS.gray },
          ]}
        >
          <Text
            style={[
              styles.deselectText,
              { color: !selectedItem ? COLORS.white : null },
            ]}
          >
            {selectedRole === 1 ? CONTEXT.trainer : CONTEXT.member} -
            {selectedItem?.name && (
              <Text> {selectedItem?.name.split(" ")[0]}...</Text>
            )}
            <Text> {CONTEXT.gym_login}</Text>
          </Text>
        </TouchableOpacity>
      ) : null}
      {!dataList && (
        <View style={styles.buttonViewCancel}>
          <PrimaryButton
            title="Cancel"
            style={100}
            color={true}
            //  color={!isEdited? "transparent" : null}
            onPress={() => navigation.goBack()}
          />
          <PrimaryButton
            title="Confirm"
            style={100}
            disabled={name?.length > 0 && address?.length > 0 ? false : true}
            color={name?.length > 0 && address?.length > 0 ? false : true}
            onPress={() => handleSendButtonPress()}
          />
        </View>
      )}
    </View>
  );
};

export default SelectGym;
