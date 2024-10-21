import * as React from "react";

import {
  Alert,
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
import { icons } from "../../home/constant";
import { images } from "../../workout/constant";
import ExerciseType from "../../workout/component/exercise";
import MemberList from "../component/memberList";
import MemberDetail from "../component/memberDetail";
import { useRoute } from "@react-navigation/native";
import getTrainerDetailApi from "../../../api/trainer-trainer/getTrainerDetail";
import Spinner from "react-native-loading-spinner-overlay";
import { workoutLoading } from "../../../redux/workoutSlice";
import { useDispatch, useSelector } from "react-redux";

const MemberDetailScreen = ({ navigation }) => {
  const reload = useSelector((state) => state?.work?.workoutReload);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchHistory, setSearchHistory] = React.useState([]);
  const [trainerData, setTrainerData] = React.useState([]);
  const [goals, setGoals] = React.useState([]);
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const route = useRoute();
  const { id } = route.params;

  React.useEffect(() => {}, [goals]);

  React.useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const response = await getTrainerDetailApi(id);
        console.log(JSON.stringify(response.data.trainerNotes));
        dispatch(workoutLoading(false));
        setTrainerData(response?.data);
        setGoals(response?.data?.workoutGoals);
        setNotes(response?.data?.trainerNotes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(JSON.stringify(error.response.data));
      }
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTrainerDetailApi(id);
        console.log(JSON.stringify(response.data.workoutGoals));
        dispatch(workoutLoading(false));
        setTrainerData(response?.data);
        setGoals(response?.data?.workoutGoals);
        setNotes(response?.data?.trainerNotes);
        setLoading(false);
      } catch (error) {
        console.log(JSON.stringify(error.response.data));
      }
    }
    fetchData();
  }, [reload]);

  const handleInputChange = _.debounce((text) => {
    setSearchQuery(text);
    setSearchHistory((prevHistory) => [text, ...prevHistory]);
  }, 500);

  const Search = () => (
    <View style={styles.searchView}>
      <SearchBar
        placeHolder={CONTEXT.name}
        handleInputChange={handleInputChange}
      />
      <View style={styles.memberVeiw}>
        <Image source={images.User} style={styles.img} />
        <Text style={styles.memberText}>
          {trainerData?.memberDetails?.name}
        </Text>
      </View>
    </View>
  );

  const Container = () => (
    <View style={{ marginBottom: 50 }}>
      {!loading && goals && trainerData && (
        <MemberDetail
          data={trainerData}
          goals={goals}
          notes={notes}
          navigation={navigation}
        />
      )}
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Search()}
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        <ScrollView>{Container()}</ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MemberDetailScreen;
