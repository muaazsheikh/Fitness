import * as React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./Style";
import MemberHeader from "../component/header";
import ExerciseType from "../component/exercise";
import CustomSeekBar from "../component/bar";
import CalendarModal from "../component/modal/CalendarModal";
import { PrimaryButton } from "../../../components";
import { NavigationStrings } from "../../../constants";
import { icons, images } from "../../home/constant";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import {
  getBodyFailure,
  getBodyRequest,
  getBodySuccess,
} from "../../../redux/getBodySlice";
import getBodyApi from "../../../api/member-exercise/getBody";
import {
  bodyUpdateFailure,
  bodyUpdateRequest,
  bodyUpdateSuccess,
} from "../../../redux/updateBodySlice";
import updateBodyApi from "../../../api/member-exercise/updateBody";
import {
  bodyCreateRequest,
  bodyCreateSuccess,
} from "../../../redux/createBodySlice";
import createBodyApi from "../../../api/member-exercise/createBody";
import FastImage from "react-native-fast-image";

const MemberWrite = ({ navigation, route }) => {
  const { isEdit } = route.params;

  const dispatch = useDispatch();

  const loading = useSelector((state) => state?.getBody?.loading);
  const dataGraph = useSelector((state) => state?.getBody?.user?.data);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [selectedType, setSelectedType] = React.useState("All");

  const data = [
    { text: "All" },
    { text: "Skeletal Muscle Mass" },
    { text: "Body Fat Mass" },
    { text: "BMI" },
    { text: "Body Fat Percentage" },
    { text: "Abdominal Fat Percentage" },
    { text: "Physical Development Score" },
  ];
  seekData = [
    {
      display: "Weight",
      label: "weight",
      icon: icons.weight_icon,
      type: "kg",
    },
    {
      display: "Skeletal Muscle Mass",
      label: "muscleMass",
      icon: icons.skeleton_icon,
      type: "kg",
    },
    {
      display: "Body Fat Mass",
      label: "fatMass",
      icon: icons.body_fat,
      type: "kg",
    },
    {
      display: "Body Fat Percentage",
      label: "fatPercentage",
      icon: icons.body_fat,
      type: "%",
    },
    {
      display: "Physical Development Score",
      label: "physicalDevelopmentScore",
      icon: icons.physical_icon,
      type: "%",
    },
    {
      display: "Abdominal Fat Percentage",
      label: "abdominalFatPercentage",
      icon: icons.abdominal,
      type: "%",
    },
    { display: "BMI", label: "bmi", icon: icons.bmi_icon, type: "kg/m²" },
  ];

  const [progress, setProgress] = React.useState(seekData.map(() => 0));
  const [modalCalender, setModalCalender] = React.useState(false);
  const [graph, setDataGraph] = React.useState(null);
  // Fetch data from API when component mounts
  React.useEffect(() => {
    if (isEdit) {
      setDataGraph(route?.params?.data);
      setSelectedDate(route?.params?.data?.regDate);
    } else {
      setDataGraph({
        weight: 80,
        muscleMass: 80,
        fatMass: 80,
        fatPercentage: 100,
        exceptFatWeight: 100,
        physicalDevelopmentScore: 100,
        abdominalFatPercentage: 100,
        bmi: 80,
      });
    }
  }, []);

  // Update progress values when dataGraph changes
  React.useEffect(() => {
    if (dataGraph) {
      const updatedProgress = seekData.map((item) => {
        return dataGraph[item.label.toLowerCase()] || 0;
      });
      setProgress(updatedProgress);
    }
  }, [dataGraph]);

  const profileUpdate = async (
    abdo,
    bmi,
    fatMas,
    fatPer,
    muscle,
    physical,
    weight,
    id
  ) => {
    try {
      dispatch(bodyUpdateRequest());
      const response = await updateBodyApi(
        abdo,
        bmi,
        fatMas,
        fatPer,
        muscle,
        physical,
        weight,
        id
      );
      dispatch(bodyUpdateSuccess(response));
      navigation.navigate(NavigationStrings.MEMBER_EXERCISE);
    } catch (error) {
      dispatch(bodyUpdateFailure(error.message));
    }
  };

  const profileCreate = async (
    abdo,
    bmi,
    fatMas,
    fatPer,
    muscle,
    physical,
    weight
  ) => {
    try {
      dispatch(bodyCreateRequest());
      const response = await createBodyApi(
        abdo,
        bmi,
        fatMas,
        fatPer,
        muscle,
        physical,
        weight,
        selectedDate
      );
      dispatch(bodyCreateSuccess(response));
      navigation.navigate(NavigationStrings.MEMBER_EXERCISE);
    } catch (error) {
      dispatch(bodyUpdateFailure(error.message));
    }
  };

  const handleNavigation = (shareStatus) => {
    if (shareStatus === "") {
      navigation.goBack();
    } else {
      if (!isEdit) {
        profileCreate(
          graph?.abdominalFatPercentage ?? 0,
          graph?.bmi ?? 0,
          graph?.fatMass ?? 0,
          graph?.fatPercentage ?? 0,
          graph?.muscleMass ?? 0,
          graph?.physicalDevelopmentScore ?? 0,
          graph?.weight ?? 0
        );
      } else {
        profileUpdate(
          graph?.abdominalFatPercentage ?? 0,
          graph?.bmi ?? 0,
          graph?.fatMass ?? 0,
          graph?.fatPercentage ?? 0,
          graph?.muscleMass ?? 0,
          graph?.physicalDevelopmentScore ?? 0,
          graph?.weight ?? 0,
          graph?.id
        );
      }
    }
  };

  const handleValueChange = (index, value) => {
    setDataGraph((prevData) => ({
      ...prevData,
      [seekData[index].label]: value,
    }));
  };

  const handleItemClick = (item) => {
    setSelectedType(item.text);
  };
  const handleDateSelect = (date) => {
    console.log("dareee", JSON.stringify(date));
    const dateObj = new Date(date.timestamp);
    setSelectedDate(dateObj);
    setModalCalender(false);
  };

  function formatDate(inputDate) {
    var date = new Date(inputDate);
    var year = date.getFullYear().toString().substr(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    var formattedDate = year + "." + month + "." + day;

    return formattedDate;
  }
  const Header = () => (
    <View>
      <MemberHeader
        text="Write Inbody"
        imageUrl={icons.Notifyicon}
        type={"calendar"}
        onPress={() => {}}
      />
      <TouchableOpacity
        onPress={() => setModalCalender(true)}
        style={styles.headerClick}
      >
        <FastImage source={images.calendar_color} style={styles.smallIcon} />
        <Text style={styles.textCalendar}>{formatDate(selectedDate)}</Text>
      </TouchableOpacity>
    </View>
  );

  const HeaderList = () => (
    <ExerciseType data={data} type={"list"} onItemClick={handleItemClick} />
  );

  const ModalContainer = () => (
    <CalendarModal
      modalVisible={modalCalender}
      setModalVisible={setModalCalender}
      selectedDate={selectedDate}
      onSelectDate={handleDateSelect}
    />
  );

  const renderItem = ({ item, index }) => {
    return (
      <CustomSeekBar
        label={item.display}
        imgUrl={item.icon}
        value={graph?.[item.label] || 0}
        type={item.type}
        onValueChange={(value) => handleValueChange(index, value)} // Pass index to handleValueChange
      />
    );
  };
  const Container = () => (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={seekData}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
      />
    </View>
  );

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
        title={"Confirm"}
        style={90}
        edit={true}
        color={false}
        onPress={() => handleNavigation("Edit")}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {Header()}
        {/* {HeaderList()} */}
        {ModalContainer()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {Container()}
          {Button()}
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MemberWrite;
