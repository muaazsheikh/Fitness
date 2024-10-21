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
import SearchBar from "../../../components/search";
import { CONTEXT } from "../../home/constant/theme";
import _ from "lodash";
import { images } from "../../workout/constant";
import MemberList from "../component/memberList";
import { NavigationStrings } from "../../../constants";
import Spinner from "react-native-loading-spinner-overlay";
import getTrainerApi from "../../../api/trainer-trainer/getTrainer";
import ExerciseType from "../component/exercise";
import { useSelector } from "react-redux";

const MemberManagement = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchHistory, setSearchHistory] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState("All");
  const [dataTraine, setDataTraine] = React.useState([]);
  const [dataList, setDataList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const shouldRefresh = useSelector((state) => state.refresh.shouldRefresh);

  React.useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await getTrainerApi();
        setDataList(response?.data?.sessionLists || []);
        setDataTraine(response?.data?.memberList || []);
        console.log(JSON.stringify(response));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, [shouldRefresh]);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await getTrainerApi(searchQuery);
        setDataList(response?.data?.sessionLists || []);
        setDataTraine(response?.data?.memberList || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const filteredDataList = React.useMemo(() => {
    let filteredList = dataList;

    if (selectedType !== "All") {
      filteredList = filteredList.filter(
        (item) => item?.memberDetails?.memberName === selectedType
      );
    }

    if (searchQuery) {
      filteredList = filteredList.filter((item) =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredList;
  }, [dataList, selectedType, searchQuery]);

  const handleInputChange = _.debounce((text) => {
    setSearchQuery(text);
    setSearchHistory((prevHistory) => [text, ...prevHistory]);
  }, 500);

  const handleItemClick = (item) => {
    setSelectedType(item.memberName);
  };

  const handleMemberPress = (member) => {
    navigation.navigate(NavigationStrings.MEMBER_DETAIL, { id: member });
  };

  const Search = () => (
    <View style={styles.searchView}>
      <SearchBar
        placeHolder={CONTEXT.name}
        handleInputChange={handleInputChange}
      />
      <View style={styles.memberVeiw}>
        <Image source={images.userImg} style={styles.itemIcon} />
        <Text style={styles.memberText}>Member List</Text>
      </View>
    </View>
  );

  const HeaderList = () => (
    <View style={{}}>
      <View style={styles.headerTrainer}>
        <ExerciseType
          data={dataTraine}
          type={"list"}
          trainer={false}
          onItemClick={handleItemClick}
        />
      </View>
    </View>
  );

  const Container = () => (
    <FlatList
      data={filteredDataList}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.horizontalListContainer}
      renderItem={({ item }) => (
        <MemberList
          key={item.id}
          imageUrl={
            item?.memberDetails?.profile
              ? { uri: item?.memberDetails?.profile?.prof_img1_min }
              : images.default_img
          }
          text={item.text}
          type={item.type}
          name={item?.memberDetails?.memberName}
          rating={item?.avgRating || 0}
          sessionCount={item?.sessionDetails?.sessionCount}
          sessionCompleted={item?.sessionDetails?.sessionCompleted}
          recentSession={item?.lastSessionDay}
          noShowCount={item?.sessionDetails?.sessionCount}
          extras={item?.sessionDetails?.addOnCount || 0}
          lastExercise={item?.exerciseDetails[0]?.exerciseList[0]}
          lastExercises={item?.exerciseDetails[0]?.exerciseList[1]}
          notes={item?.memberDetails?.notes}
          onPress={() => handleMemberPress(item?.memberDetails?.memberId)}
          navigation={navigation}
        />
      )}
      numColumns={1}
    />
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Search()}
        {HeaderList()}
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        {Container()}
      </SafeAreaView>
    </View>
  );
};

export default MemberManagement;
