import * as React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./Style";
import { COLORS, icons } from "../../home/constant";
import TrainerHeader from "../component/header";
import { PrimaryButton } from "../../../components";
import { NavigationStrings } from "../../../constants";
import getInformationApi from "../../../api/trainer-profile/getInformationApi";
import Spinner from "react-native-loading-spinner-overlay";
import CustomRangeSlider from "../component/range-slider";
import Checkbox from "../component/checkbox";
import updateTimeApi from "../../../api/trainer-profile/updateTime";
import { CONTEXT } from "../../home/constant/theme";

const SessionEditScreen = ({ navigation }) => {
  const [selectedValues, setSelectedValues] = React.useState({});
  const [week, setWeek] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchMyAPI() {
      try {
        setLoading(true);
        const response = await getInformationApi();
        setWeek(response?.data?.availableSessionTime || {});

        // Assuming the isHoliday values are coming in the response data
        const isHolidayValues = response?.data?.isHolidayValues || {};
        setSelectedValues(isHolidayValues);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    fetchMyAPI();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Utility function to check if two time ranges overlap
  const areTimesOverlapping = (start1, end1, start2, end2) => {
    return start1 < end2 && start2 < end1;
  };

  // Validate time ranges for a particular day
  const isTimeValidForDay = (day, updatedSessions) => {
    for (let i = 0; i < updatedSessions.length - 1; i++) {
      const session1 = updatedSessions[i];
      const session2 = updatedSessions[i + 1];
      const start1 =
        parseInt(session1.startTime.split(":")[0]) * 60 +
        parseInt(session1.startTime.split(":")[1]);
      const end1 =
        parseInt(session1.endTime.split(":")[0]) * 60 +
        parseInt(session1.endTime.split(":")[1]);
      const start2 =
        parseInt(session2.startTime.split(":")[0]) * 60 +
        parseInt(session2.endTime.split(":")[1]);
      const end2 =
        parseInt(session2.endTime.split(":")[0]) * 60 +
        parseInt(session2.endTime.split(":")[1]);

      if (areTimesOverlapping(start1, end1, start2, end2)) {
        return false; // Overlapping time found
      }
    }
    return true;
  };

  const updateTime = async () => {
    setLoading(true);
    const formattedData = Object.entries(week).map(([day, sessions]) => {
      if (sessions && sessions.length > 0) {
        const sessionDetails = sessions.map(({ startTime, endTime }) => ({
          startTime,
          endTime,
          isHoliday: selectedValues[day]?.isHoliday || false, // Set isHoliday based on selectedValues
        }));
        return { [day]: sessionDetails };
      } else {
        return { [day]: [{ isHoliday: true }] };
      }
    });

    try {
      const response = await updateTimeApi(Object.assign({}, ...formattedData));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(JSON.stringify(error));
    }
  };

  React.useEffect(() => {
    const initialSelectedValues = {};
    Object.keys(week).forEach((day) => {
      const sessions = week[day];
      if (sessions && sessions.length > 0) {
        const startTime = sessions[0]?.startTime;
        const endTime = sessions[0]?.endTime;
        if (startTime && endTime) {
          const startHour = parseInt(startTime.split(":")[0], 10);
          const endHour = parseInt(endTime.split(":")[0], 10);
          initialSelectedValues[day] = [startHour || 8, endHour || 16];
        }
        initialSelectedValues[day] = sessions[0]?.isHoliday || false;
      } else {
        initialSelectedValues[day] = false; // Set isHoliday to false
      }
    });
    setSelectedValues(initialSelectedValues);
  }, [week]);

  const handleToggle = (day) => {
    console.log("Toggling day:", day);
    setSelectedValues((prevValues) => {
      console.log("Previous values:", prevValues);
      const updatedValues = {
        ...prevValues,
        [day]: {
          ...prevValues[day],
          isHoliday: prevValues[day] ? !prevValues[day].isHoliday : true,
        },
      };
      console.log("Updated values:", updatedValues);
      return updatedValues;
    });
  };

  const handleRangeChange = (day, values, index) => {
    const sessions = week[day];
    const updatedSessions = sessions.map((session, i) => {
      if (i === index) {
        const startHour = Math.floor(values[0] / 60);
        const startMinute = values[0] % 60;
        const endHour = Math.floor(values[1] / 60);
        const endMinute = values[1] % 60;
        const startTime = `${String(startHour).padStart(2, "0")}:${String(
          startMinute
        ).padStart(2, "0")}`;
        const endTime = `${String(endHour).padStart(2, "0")}:${String(
          endMinute
        ).padStart(2, "0")}`;
        return { startTime, endTime };
      } else {
        return session;
      }
    });

    if (isTimeValidForDay(day, updatedSessions)) {
      setWeek((prevWeek) => ({
        ...prevWeek,
        [day]: updatedSessions,
      }));
    } else {
      alert("Time overlap detected. Please correct the time intervals.");
    }
  };

  const addSlider = (day) => {
    const sessions = week[day];
    const newSessions = [
      ...(sessions || []),
      {
        startTime: "10:00",
        endTime: "12:00",
      },
    ];
    setWeek((prevWeek) => ({
      ...prevWeek,
      [day]: newSessions,
    }));
  };

  const removeSlider = (day) => {
    const sessions = week[day];
    if (sessions && sessions.length > 1) {
      const newSessions = sessions.slice(0, -1);
      setWeek((prevWeek) => ({
        ...prevWeek,
        [day]: newSessions,
      }));
    }
  };

  const renderCustomRangeSlider = (day, index) => {
    const sessions = week[day];
    const defaultStartTime = 8 * 60; // Default start time: 8:00 AM
    const defaultEndTime = 16 * 60; // Default end time: 4:00 PM
    const isHoliday = selectedValues[day]?.isHoliday;

    return (
      <View key={index} style={styles.timeList}>
        {/* Render day name and holiday indicator */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <Text style={[styles.informationTextStyle, {}]}>
            {capitalizeFirstLetter(day)}
          </Text>
          <View style={{ flexDirection: "row", marginRight: 20, gap: 10 }}>
            <Text
              style={[styles.informationTextStyle, { color: COLORS.ligtRed }]}
            >
              {isHoliday ? "Holiday" : ""}
            </Text>
            <Checkbox
              isChecked={isHoliday || false}
              onToggle={() => handleToggle(day)}
            />
          </View>
        </View>
        <View style={styles.horizontalLine}></View>

        {/* Conditionally render the session time sliders if it's not a holiday */}
        {!isHoliday &&
          sessions &&
          sessions.map((session, sessionIndex) => {
            const isLastSession = sessionIndex === sessions.length - 1;
            if (session?.startTime && session?.endTime) {
              const startTimeParts = session.startTime.split(":");
              const endTimeParts = session.endTime.split(":");
              const startHour = parseInt(startTimeParts[0], 10);
              const startMinute = parseInt(startTimeParts[1], 10);
              const endHour = parseInt(endTimeParts[0], 10);
              const endMinute = parseInt(endTimeParts[1], 10);
              const startMinutes = startHour * 60 + startMinute;
              const endMinutes = endHour * 60 + endMinute;

              return (
                <View
                  style={{ flexDirection: "row", gap: 10 }}
                  key={sessionIndex}
                >
                  <CustomRangeSlider
                    min={0}
                    session={session}
                    max={24 * 60}
                    selectedValues={[startMinutes, endMinutes]}
                    startTime={session.startTime}
                    endTime={session.endTime}
                    onValuesChange={(values) =>
                      handleRangeChange(day, values, sessionIndex)
                    }
                  />
                  {isLastSession ? (
                    <TouchableOpacity
                      style={styles.extraView}
                      onPress={() => addSlider(day)}
                    >
                      <Image
                        source={icons.plus_icon}
                        style={{
                          width: 10,
                          height: 10,
                          tintColor: COLORS.lightWhite,
                          alignSelf: "center",
                        }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.extraView, { borderWidth: 0 }]}
                      onPress={() => removeSlider(day)}
                    >
                      <Image
                        source={icons.delete_icon}
                        style={{
                          width: 10,
                          height: 14,
                          tintColor: COLORS.lightWhite,
                          alignSelf: "center",
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            } else {
              return null;
            }
          })}
        {!isHoliday && !sessions && (
          <View style={{ flexDirection: "row" }}>
            <CustomRangeSlider
              min={0}
              session={{ startTime: "08:00", endTime: "16:00" }}
              max={24 * 60}
              selectedValues={[defaultStartTime, defaultEndTime]}
              onValuesChange={(values) => handleRangeChange(day, values, 0)}
            />
            <TouchableOpacity
              style={styles.extraView}
              onPress={() => addSlider(day)}
            >
              <Image
                source={icons.plus_icon}
                style={{
                  width: 10,
                  height: 10,
                  tintColor: COLORS.lightWhite,
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const Container = () => (
    <View>
      {Object.keys(week).map((day, index) =>
        renderCustomRangeSlider(day, index)
      )}
    </View>
  );

  const Header = () => (
    <View>
      <TrainerHeader text="Edit Session Times" imageUrl={icons.Notifyicon} />
      <Text
        style={[
          styles.smallTextStyle,
          { marginLeft: 18, marginBottom: 10, marginTop: -10 },
        ]}
      >
        {CONTEXT.available_session}
      </Text>
    </View>
  );

  const handleNavigation = (nav) => {
    if (nav === "Edit") {
      updateTime();
      navigation.navigate(NavigationStrings.TRAINER_INFO);
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
        title={"Save"}
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
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.themeGray }}>
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

export default SessionEditScreen;
