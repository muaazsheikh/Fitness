import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import SettingHeader from "../component/header";
import styles from "./Style";
import { COLORS, icons, images } from "../../home/constant";
import { scale } from "react-native-size-matters";
import { PrimaryButton } from "../../../components";
import FastImage from "react-native-fast-image";
import getPTClassNotiSetting from "../../../api/profile/getPTClassNotiSetting";
import CustomModal from "../../auth/component/modal";

const timeData = [
  { id: 1, text: "None", unit: "day", value: 0 },
  { id: 2, text: "10 minutes berfore", unit: "min", value: 10 },
  { id: 3, text: "30 minutes berfore", unit: "min", value: 30 },
  { id: 4, text: "3 hour berfore", unit: "hour", value: 3 },
  { id: 5, text: "1 hour berfore", unit: "hour", value: 1 },
  { id: 6, text: "2 hour berfore", unit: "hour", value: 2 },
  { id: 7, text: "3 hour berfore", unit: "hour", value: 3 },
  { id: 8, text: "8 hour berfore", unit: "hour", value: 8 },
  { id: 9, text: "1 day berfore", unit: "day", value: 1 },
];

const PtClassNotify = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstAlert, setfirstAlert] = useState(timeData[0]);
  const [secondAlert, setSecondAlert] = useState(timeData[0]);
  const [thirdAlert, setThirdAlert] = useState(timeData[0]);
  const [isAdded, setIsAdded] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleDateSelection = (data) => {
    if (isEnabled === 1) {
      setfirstAlert(data);
    } else if (isEnabled === 2) {
      setSecondAlert(data);
    } else {
      setThirdAlert(data);
    }
    setIsEnabled(null);
  };

  const onConfrimAlert = async () => {
    try {
      setLoading(true);
      const requestData = {
        alerts: [
          {
            value: firstAlert.value,
            unit: firstAlert.unit,
          },
          {
            value: secondAlert.value,
            unit: secondAlert.unit,
          },
          {
            value: thirdAlert.value,
            unit: thirdAlert.unit,
          },
        ],
      };
      const response = await getPTClassNotiSetting(requestData);
      // navigation.goBack()
      setIsModalVisible(true);
    } catch (error) {
      console.log(JSON.stringify(error?.response));
    } finally {
      setLoading(false);
    }
  };

  const Header = () => (
    <View style={styles.headerBackView}>
      <SettingHeader text="PT Class Notification Settings" />
    </View>
  );

  const renderTimeItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDateSelection(item)}>
      <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
        <Text style={styles.emailText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  const Container = () => (
    <>
      <View style={[styles.placeholderStyle, { marginTop: scale(15) }]}>
        <Text style={styles.titleName}>Set notification time</Text>
        <View style={styles.borderBottomView} />
        <View style={styles.rowDirectionView}>
          <View style={styles.rowView}>
            <Image source={icons.notification_bell} style={styles.rateIcon} />
            <Text style={styles.heading}>Alert</Text>
          </View>
          <TouchableOpacity
            style={styles.rowView}
            onPress={() => setIsEnabled(1)}
          >
            <Text style={styles.emailText}>{firstAlert?.text}</Text>
            <View style={{ marginLeft: 10 }}>
              <Image source={icons.up_icon} style={styles.rejectedIcon} />
              <Image source={icons.down_icon} style={styles.rejectedIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.borderBottomView} />
        <View style={styles.rowDirectionView}>
          <View style={styles.rowView}>
            <Image source={icons.notification_bell} style={styles.rateIcon} />
            <Text style={styles.heading}>Second Alert</Text>
          </View>
          <TouchableOpacity
            style={styles.rowView}
            onPress={() => setIsEnabled(2)}
          >
            <Text style={styles.emailText}>{secondAlert?.text}</Text>
            <View style={{ marginLeft: 10 }}>
              <Image source={icons.up_icon} style={styles.rejectedIcon} />
              <Image source={icons.down_icon} style={styles.rejectedIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.borderBottomView} />
        <TouchableOpacity
          disabled={!isAdded}
          style={styles.rowDirectionView}
          onPress={() => {
            if (isAdded) {
              setIsAdded(false);
            } else {
              setIsEnabled(3);
            }
          }}
        >
          <View style={styles.rowView}>
            <Image source={icons.notification_bell} style={styles.rateIcon} />
            <Text style={styles.heading}>{`${
              isAdded ? "Add Alert" : "Third Alert"
            }`}</Text>
          </View>
          <TouchableOpacity
            style={styles.rowView}
            onPress={() => {
              setIsEnabled(3);
            }}
            disabled={isAdded}
          >
            <Text style={styles.emailText}>{thirdAlert?.text}</Text>
            <View style={{ marginLeft: 10 }}>
              <Image source={icons.up_icon} style={styles.rejectedIcon} />
              <Image source={icons.down_icon} style={styles.rejectedIcon} />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {!!isEnabled && (
        <View
          style={[
            styles.placeholderStyle,
            {
              width: scale(220),
              alignSelf: "flex-end",
              marginRight: scale(28),
            },
          ]}
        >
          <FlatList
            data={timeData}
            renderItem={renderTimeItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}

      {!isEnabled && (
        <View style={styles.buttonViewNew}>
          <PrimaryButton
            title={"Cancel"}
            style={80}
            edit={true}
            color={true}
            onPress={() => {
              navigation.goBack("");
            }}
          />
          <PrimaryButton
            title={"Confirm"}
            style={80}
            edit={true}
            color={false}
            onPress={onConfrimAlert}
          />
        </View>
      )}
    </>
  );

  const modalContent = () => (
    // <Modal
    //   visible={isModalVisible}
    //   animationType="slide"
    //   transparent={true}
    //   onRequestClose={() => setIsModalVisible(false)}
    // >
    //   <View style={styles.modalContainer}>
    //     <View
    //       style={[
    //         styles.placeholderStyle,
    //         { height: scale(130), justifyContent: "center" },
    //       ]}
    //     >
    //       <TouchableOpacity
    //         style={styles.crossimg}
    //         onPress={() => setIsModalVisible(false)}
    //       >
    //         <FastImage source={icons.CrossButton} style={styles.icon} />
    //       </TouchableOpacity>
    //       <Text style={[styles.informationTextStyle, { textAlign: "center" }]}>
    //         You can only set up to a {"\n"}maximum of 3 alerts
    //       </Text>
    //     </View>
    //   </View>
    // </Modal>
    <CustomModal
      visible={isModalVisible}
      imageUrl={images.success}
      text={"PT Class Notification Alert Has Been Set!"}
      cross={() => setIsModalVisible(false)}
    />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"light-content"} />
        {Header()}

        <ScrollView>
          {modalContent()}
          {Container()}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PtClassNotify;
