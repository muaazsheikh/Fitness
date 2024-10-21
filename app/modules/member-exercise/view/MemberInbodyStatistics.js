import * as React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./Style";
import moment from "moment";
import MemberHeader from "../component/header";
import { COLORS, icons, images } from "../../home/constant";
import { NavigationStrings } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { useFocusEffect } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import CustomTable from "../component/table";
import {
  statisticsGraphFailure,
  statisticsGraphRequest,
  statisticsGraphSuccess,
} from "../../../redux/getMemberStatisticsGraphSlice";
import memberStatisticsApi from "../../../api/member-exercise/memberStatisticsInboby";
import CustomStatisticsGraph from "../component/statisticsOfInbodyGraph";
import {
  statisticsListFailure,
  statisticsListRequest,
  statisticsListSuccess,
} from "../../../redux/getMemberStatisticsListSlice";
import Seperator from "../../auth/component/seperator";

const MemberInbodyStatistics = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);

  const dataGraph = useSelector(
    (state) => state?.getMemberStatisticsGraph?.user?.data
  );
  const dataList = useSelector(
    (state) => state?.getMemberStatisticsList?.user?.data
  );

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          setLoading(true);
          dispatch(
            !tabIndex ? statisticsGraphRequest() : statisticsListRequest()
          );
          const response = await memberStatisticsApi(
            !tabIndex ? "graph" : "table"
          );
          console.log(JSON.stringify(response));
          dispatch(
            !tabIndex
              ? statisticsGraphSuccess(response)
              : statisticsListSuccess(response)
          );
        } catch (error) {
          dispatch(
            !tabIndex
              ? statisticsGraphFailure(error.message)
              : statisticsListFailure(error.message)
          );
        } finally {
          setLoading(false);
        }
      }
      fetchMyAPI();
      return () => {};
    }, [tabIndex])
  );

  const onClick = () => {
    navigation.navigate(NavigationStrings.MEMBER_BODY, {
      isEdit: false,
      data: null,
    });
  };

  const Header = () => (
    <View style={{}}>
      <MemberHeader
        text="Statistics of Inbody"
        imageUrl={icons.Notifyicon}
        navigation={navigation}
        type={"body"}
        onPress={() => onClick()}
        buttonText="Write Inbody"
      />
    </View>
  );

  const renderItem = ({ item }) => {
    const graphData = item?.graphData ?? [];

    const currentWeekLabels = graphData.map((data) => {
      const date = moment(data.date);
      // return `${date.date()}\n${date.format("MMM")}`; 
      return date.format("MM.DD"); 
    });

    const weightArray = item.weightArray ?? [];

    return (
      <CustomStatisticsGraph
        data={item}
        customVerticalLabels={weightArray.map((weight) => String(weight))}
        currentWeekLabels={currentWeekLabels}
        graphData={graphData}
      />
    );
  };

  const Container = () => (
    <View>

      {!!dataGraph?.length  ? (

        <FlatList
          data={dataGraph}
          renderItem={renderItem}
          keyExtractor={(item) => item.label}
        />
      ) : (
        <View>
          <Seperator title={"No Data Available"} dimesion={150} />
        </View>
      )}
    </View>
  );

  const TabContainer = () => (
    <View style={styles.tabView}>
      <TouchableOpacity
        style={[
          styles.tabButtonView,
          { backgroundColor: !tabIndex ? COLORS.themGreen : COLORS.lightBlack },
        ]}
        onPress={() => setTabIndex(0)}
      >
        <Image
          source={icons.member_graph}
          style={{
            width: 16,
            height: 16,
          }}
          tintColor={!tabIndex ? COLORS.themeGray : COLORS.white}
        />
        <Text
          style={[
            styles.tabButtonText,
            {
              color: !tabIndex ? COLORS.themeGray : COLORS.white,
            },
          ]}
        >
          Total
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButtonView,
          {
            backgroundColor: !!tabIndex ? COLORS.themGreen : COLORS.lightBlack,
          },
        ]}
        onPress={() => setTabIndex(1)}
      >
        <Image
          source={images.list_icon}
          style={{
            width: 16,
            height: 16,
            // resizeMode: "contain",
          }}
          tintColor={!!tabIndex ? COLORS.themeGray : COLORS.white}
        />
        <Text
          style={[
            styles.tabButtonText,
            {
              color: !!tabIndex ? COLORS.themeGray : COLORS.white,
            },
          ]}
        >
          List
        </Text>
      </TouchableOpacity>
    </View>
  );

  const InBodyListContainer = () => (
    <View style={{ marginTop: 10 }}>
      <View
        style={{
          width: "93%",
          height: 0.3,
          backgroundColor: COLORS.white,
          alignSelf: "center",
        }}
      />
      <CustomTable tableData={dataList} navigation={navigation} />
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {Header()}
        {TabContainer()}
        <ScrollView>
          {!tabIndex ? Container() : InBodyListContainer()}
        </ScrollView>
      </SafeAreaView>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
    </View>
  );
};

export default MemberInbodyStatistics;
