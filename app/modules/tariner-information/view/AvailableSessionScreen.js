import * as React from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import styles from "./Style";
import TrainerHeader from "../component/header";
import { PrimaryButton } from "../../../components";
import { scale } from "react-native-size-matters";
import { NavigationStrings } from "../../../constants";
import getInformationApi from "../../../api/trainer-profile/getInformationApi";
import Spinner from "react-native-loading-spinner-overlay";
import { images, icons, COLORS } from "../../home/constant";
import { CONTEXT } from "../../home/constant/theme";

const AvailableSessionScreen = ({ navigation }) => {
  const [week, setWeek] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchMyAPI() {
      try {
        setLoading(true);
        const response = await getInformationApi();
        setWeek(response?.data?.availableSessionTime || {});
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
    fetchMyAPI();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const TimeList = ({ day, times = [] }) => {
    const isHoliday = times.some((time) => time.isHoliday);
    const renderTimes = isHoliday ? (
      <View style={{ flexDirection: "row", width: scale(330) }}>
        <Image
          source={images.holiday}
          style={{
            width: 18,
            height: 18,
            alignSelf: "center",
            marginRight: 10,
          }}
        />
        <Text style={[styles.informationTextStyle, { color: COLORS.ligtRed }]}>
          Holiday
        </Text>
      </View>
    ) : (
      times.map((time, index) => (
        <View key={index} style={{ flexDirection: "row", width: scale(330) }}>
          <Image
            source={images.ClockIcon}
            style={{
              width: 18,
              height: 18,
              alignSelf: "center",
              marginRight: 10,
            }}
          />
          <Text style={styles.informationTextStyle}>
            {`${time.startTime} - ${time.endTime}`}
          </Text>
        </View>
      ))
    );

    return (
      <View style={styles.timeList}>
        <Text
          style={[
            styles.informationTextStyle,
            {
              alignSelf: "flex-start",
              color: isHoliday ? COLORS.ligtRed : COLORS.white,
            },
          ]}
        >
          {capitalizeFirstLetter(day)}
        </Text>
        <View>
          <View style={{ marginLeft: 6, gap: 10 }}>{renderTimes}</View>
        </View>
      </View>
    );
  };

  const Container = () => (
    <View>
      {Object.entries(week).map(([day, times], index) => (
        <TimeList key={index} day={day} times={times} />
      ))}
    </View>
  );

  const Header = () => (
    <View>
      <TrainerHeader
        text={CONTEXT.available_session}
        imageUrl={null}
        Notify={null}
      />
    </View>
  );

  const handleNavigation = (nav) => {
    if (nav === "Edit") {
      navigation.navigate(NavigationStrings.TRAINER_TIME_EDIT);
    } else {
      navigation.goBack();
    }
  };

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
        title={"Edit"}
        style={90}
        edit={true}
        color={false}
        onPress={() => handleNavigation("Edit")}
      />
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.themeGray }}>
      <View style={styles.newAccountContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          {Header()}
          {Container()}
          {Button()}
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default AvailableSessionScreen;
