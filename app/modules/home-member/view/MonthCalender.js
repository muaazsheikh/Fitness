import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, icons } from "../constant";
import BigCalendar from "../component/calenderWeeklySession";
import styles from "../component/calendarappointment/Style";

const MonthCalender = () => {
  const tasksData = {
    1: { booked: 3, complete: 2, cancel: 1 },
    5: { booked: 1, complete: 0, cancel: 2 },
    10: { cancel: 2, complete: 1, booked: 1 },
  };
  const planograms = [
    {
      title: "Available Reservation Times 12:30 AM - 4:30 PM",
      start: "2023-11-27 01:00:00",
      end: "2023-11-27 04:30:00",
      bgColor: "#B0FFAA",
      planogramId: 1442,
    },
    {
      title: "Available Reservation Times 10:30 AM - 04:30 PM",
      start: "2023-11-29 01:00:00",
      end: "2023-11-30 05:00:00",
      bgColor: "#B0FFAA",
      planogramId: 1442,
    },
    {
      title: "Available Reservation Times 10:30 AM - 04:30 PM",
      start: "2023-12-01 07:00:00",
      end: "2023-12-01 06:40:00",
      bgColor: "#B0FFAA",
      planogramId: 1442,
    },
    {
      title: "Todays bday",
      start: "2023-11-29 07:00:00",
      end: "2023-11-29 06:40:00",
      bgColor: "#B0FFAA",
      planogramId: 1442,
    },
  ];

  return (
    <View style={styles.containerCalender}>
      <SafeAreaView style={{ flex: 0 }} />
      <StatusBar barStyle={"light-content"} />
      <View style={styles.headerView}>
        <Image source={icons.DrawerIcon} style={styles.drowerIcon} />
        <Text style={styles.headingText}>Oct 2023</Text>

        <TouchableOpacity>
          <ImageBackground source={icons.Contact} style={styles.imageBack}>
            <TouchableOpacity style={styles.ImageView}>
              <Text style={styles.countText}>1</Text>
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity>
          <ImageBackground source={icons.CalenderIcon} style={styles.imageBack}>
            <TouchableOpacity style={styles.ImageView}>
              <Text style={styles.countText}>2</Text>
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity>
          <ImageBackground source={icons.Listicon} style={styles.imageBack}>
            <TouchableOpacity style={styles.ImageView}>
              <Text style={styles.countText}>10</Text>
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity>
          <ImageBackground source={icons.Notifyicon} style={styles.imageBack}>
            <TouchableOpacity style={styles.ImageView}>
              <Text style={styles.countText}>1</Text>
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      {/* ------- Calender -------- */}

      <ScrollView style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>
        <View style={{ alignSelf: "center", justifyContent: "center" }}>
          <BigCalendar modeName={"week"} Arraydata={planograms} />
        </View>
      </ScrollView>
    </View>
  );
};

export default MonthCalender;
