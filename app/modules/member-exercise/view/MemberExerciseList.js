import * as React from "react";

import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import styles from "./Style";
import moment from "moment";

import CustomGraph from "../component/graph";


const MemberExerciseList = ({ navigation }) => {
  const dataGraph = useSelector((state) => state?.graphList?.user?.data);


  const data = [
    { text: "All" },
    { text: "deadlift" },
    { text: "Bench press" },
    { text: "Squat" },
    { text: "Dumbbell press" },
    { text: "Shoulder" },
  ];

  const exerciseData = [
    { text: "Deadlift" },
    { text: "Bench press" },
    { text: "Squat" },
    { text: "Dumbbell press" },
    { text: "Shoulder" },
  ];

  const generateCurrentWeekLabels = () => {
    const labels = [];
    const currentDate = moment();

    for (let i = 0; i < 7; i++) {
      const day = currentDate.clone().add(i, "days");
      labels.push(`${day.date()}\n${day.format("MMM")}`);
    }

    return labels;
  };



  const currentWeekLabels = generateCurrentWeekLabels();

  const customVerticalLabels = [
    "0",
    "20",
    "40",
    "60",
    "80",
    "100",
    "120",
    "140",
    "160",
    // "180",
  ];

  const renderItem = ({ item }) => {
    const graphData = dataGraph?.[item]?.graphData ?? [];
    
    (
    <CustomGraph
      data={item.text}
      customVerticalLabels={customVerticalLabels}
      graphData={graphData}
      currentWeekLabels={currentWeekLabels}
    />
  )};

  const Container = () => (
    <View>
      <FlatList
        data={exerciseData}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
      />
    </View>
  );


  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
     
        <ScrollView>{Container()}</ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MemberExerciseList;
