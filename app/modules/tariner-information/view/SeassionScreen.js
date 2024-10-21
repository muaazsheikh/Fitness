import * as React from "react";
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./Style";
import _ from "lodash";
import { COLORS, icons } from "../../home/constant";
import { images } from "../../workout/constant";
import TrainerHeader from "../component/header";
import FastImage from "react-native-fast-image";
import { PrimaryButton } from "../../../components";
import getInformationApi from "../../../api/trainer-profile/getInformationApi";
import updateSessionApi from "../../../api/trainer-profile/updateSession";
import Spinner from "react-native-loading-spinner-overlay";
import { CONTEXT } from "../../home/constant/theme";

const SeassionScreen = ({ navigation }) => {
  const [goals, setGoals] = React.useState([]);
  const [newGoal, setNewGoal] = React.useState("");
  const [rem, setRem] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchMyAPI() {
      try {
        setLoading(true);
        const response = await getInformationApi();
        console.log("API Response:", response);
        setGoals(
          response?.data?.teachingApproach?.map((goal) => ({
            text: goal,
            isEditable: false,
          })) || []
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("API Error:", error);
      }
    }
    fetchMyAPI();
  }, []);

  const sessionUpdate = async (goal) => {
    setLoading(true);
    const textArray = goal.map((goal) => goal.text);
    try {
      const response = await updateSessionApi(textArray);
      console.log("Update Response:", response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Update Error:", error);
    }
  };

  const addGoal = () => {
    if (newGoal.trim() !== "") {
      setGoals([...goals, { text: newGoal, isEditable: false }]);
      setNewGoal(""); // Clear the input field after adding the goal
    }
  };

  const removeGoal = (index) => {
    const updatedGoals = [...goals];
    updatedGoals.splice(index, 1);
    setGoals(updatedGoals);
    sessionUpdate(updatedGoals);
  };

  const handleNavigation = () => {
    navigation.goBack();
  };

  const toggleEdit = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].isEditable = !updatedGoals[index].isEditable;
    setGoals(updatedGoals);
  };

  const Header = () => (
    <View style={{}}>
      <TrainerHeader
        text={CONTEXT.session_method}
        imageUrl={icons.Notifyicon}
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
        onPress={() => handleNavigation()}
      />
      <PrimaryButton
        title={"Save"}
        style={90}
        edit={true}
        color={false}
        onPress={() => sessionUpdate(goals)}
      />
    </View>
  );

  const SessionDeleteModal = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => setModalVisible(false)}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>
            <Text style={styles.modalText}>
              Coaching Method deleted{"\n"}successfully
            </Text>

            <FastImage
              source={images.delete_confirm}
              style={styles.modalImage}
            />

            <View style={styles.smallContainer}></View>

            <PrimaryButton
              title={"Confirm"}
              onPress={() => {
                removeGoal(rem);
                setModalVisible(false);
              }}
              style={90}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const Container = () => (
    <View style={styles.containerHeader}>
      {goals?.map((goal, index) => (
        <View
          key={index}
          style={[styles.row, { justifyContent: "space-between" }]}
        >
          {goal.isEditable ? (
            <TextInput
              style={[styles.textUser, { padding: 10 }]}
              numberOfLines={4}
              value={goal.text}
              onChangeText={(text) => {
                const updatedGoals = [...goals];
                updatedGoals[index].text = text;
                setGoals(updatedGoals);
              }}
            />
          ) : (
            <Text numberOfLines={4} style={[styles.textUser, { padding: 10 }]}>
              • {goal.text}
            </Text>
          )}

          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => toggleEdit(index)}
          >
            <Image
              source={
                goal.isEditable
                  ? icons.edit_icon_theme
                  : icons.edit_icon_disable
              }
              style={styles.editImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => {
              setRem(index), setModalVisible(true);
            }}
          >
            <FastImage source={images.delete_img} style={styles.deleteImg} />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.addlistView}>
        <TextInput
          style={styles.textInput}
          value={newGoal}
          onChangeText={(text) => setNewGoal(text)}
        />
        <TouchableOpacity style={styles.secondaryButton} onPress={addGoal}>
          <Text style={styles.secondaryButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.themeGray }}>
      <View style={styles.newAccountContainer}>
        <SafeAreaView style={{ flex: 1 }}>
          {Header()}

          {Container()}
          {Button()}
          {SessionDeleteModal()}
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

export default SeassionScreen;
