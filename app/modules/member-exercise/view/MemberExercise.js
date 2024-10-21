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
import MemberHeader from "../component/header";
import { COLORS, icons } from "../../home/constant";
import CustomGraph from "../component/graph";
import { NavigationStrings } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import {
  graphListFailure,
  graphListRequest,
  graphListSuccess,
} from "../../../redux/getGraphDataSlice";
import memberGraphApi from "../../../api/member-exercise/memberExercise";
import { useFocusEffect } from "@react-navigation/native";

const MemberExercise = ({ navigation }) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state?.graphList?.loading);
  const dataGraph = useSelector((state) => state?.graphList?.user?.data);
  const shouldRefresh = useSelector((state) => state?.refresh?.shouldRefresh);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          dispatch(graphListRequest());
          const response = await memberGraphApi();
          dispatch(graphListSuccess(response));
          console.log(JSON.stringify(response));
        } catch (error) {
          console.log(JSON.stringify(error));
          dispatch(graphListFailure(error.message));
        }
      }
      fetchMyAPI();
      return () => {};
    }, [shouldRefresh])
  );
 

  onClick = () => {
    navigation.navigate(NavigationStrings.MEMBER_INBODY_STATISTICS);
  };


  const Header = () => (
    <View style={{}}>
      <MemberHeader
        text="3 Major workout weights"
        imageUrl={icons.Notifyicon}
        navigation={navigation}
        type={"body"}
        buttonText="Inbody"
        onPress={() => onClick()}
      />
    </View>
  );

  const filteredKeys = Object.keys(dataGraph?.weights ?? {})
    .filter((key) => {
      return key;
    })
    .reverse();

  const renderItem = ({ item }) => {
    const graphData = dataGraph?.[item]?.graphData ?? [];

    const currentWeekLabels = graphData?.map((data) => {
      const date = moment(data?.date);
      return `${date?.format("MM.DD")}`;
    });


    const weightArray = item?.weightArray ?? [];

    return (
      <CustomGraph
        data={item}
        customVerticalLabels={weightArray?.map((weight) => String(weight))||[]}
        currentWeekLabels={currentWeekLabels||[]}
        graphData={graphData||[]}
      />
    );
  };

  const Container = () => (
    <View>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
      <FlatList
        data={filteredKeys}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
      />
    </View>
  );

  const HeaderContainer = () => (
    <View>
      <View style={styles.headerView}>
        <Image source={icons.kg_icon} style={styles.iconMember} />
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.kgText}>{dataGraph?.weights?.totalWeight} Kg</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.exerciseView}>
          <Image source={icons.bench_press} style={styles.iconExercise} />
          <Text style={styles.colorText}>
            {dataGraph?.weights?.maxBenchPress}
            <Text style={styles.totalText}> Kg</Text>
          </Text>
          <Text style={styles.smallText}>Bench press</Text>
        </View>

        <View style={styles.exerciseView}>
          <Image source={icons.weight_lift} style={styles.iconExercise} />
          <Text style={styles.colorText}>
            {dataGraph?.weights?.maxDeadLift}

            <Text style={styles.totalText}> Kg</Text>
          </Text>
          <Text style={styles.smallText}>Deadlift</Text>
        </View>

        <View style={styles.exerciseView}>
          <Image
            source={icons.squad_icon}
            style={[styles.iconExercise, { width: 15 }]}
          />
          <Text style={styles.colorText}>
            {dataGraph?.weights?.maxSquat}

            <Text style={styles.totalText}> Kg</Text>
          </Text>
          <Text style={styles.smallText}>Squat</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {Header()}
        {HeaderContainer()}

        <ScrollView>{Container()}</ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MemberExercise;
