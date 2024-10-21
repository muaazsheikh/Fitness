import * as React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./Style";
import { icons } from "../../home/constant";
import { COLORS, images } from "../../workout/constant";
import TrainerHeader from "../component/header";
import FastImage from "react-native-fast-image";
import { PrimaryButton } from "../../../components";
import getInformationApi from "../../../api/trainer-profile/getInformationApi";
import updateInformationApi from "../../../api/trainer-profile/updateInformation";
import Spinner from "react-native-loading-spinner-overlay";
import { CONTEXT } from "../../home/constant/theme";
import { scale } from "react-native-size-matters";

const AddInformationScreen = ({ navigation }) => {
  const [goals, setGoals] = React.useState([]);
  const [newGoal, setNewGoal] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isEdited, setIsEdited] = React.useState(false); // State to track if any edits have been made

  React.useEffect(() => {
    async function fetchMyAPI() {
      try {
        setLoading(true);
        const response = await getInformationApi();
        const introduction = response?.data?.introduction || [];
        setGoals(
          introduction.map((goal) => ({
            text: goal || "",
            isEditable: false,
          }))
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
    fetchMyAPI();
  }, []);

  const informationUpdate = async (goals) => {
    setLoading(true);
    const textArray = goals?.map((goal) => goal?.text);
    try {
      await updateInformationApi(textArray);
      setIsEdited(false); // Reset edit state after saving
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const addGoal = async () => {
    if (newGoal.trim() !== "") {
      const updatedGoals = [...goals, { text: newGoal, isEditable: false }];
      setGoals(updatedGoals);
      setNewGoal("");
      setIsEdited(false); // No need to show save button after adding a new goal

      // Immediately save after adding a new goal
      await informationUpdate(updatedGoals);
    }
  };

  const removeGoal = (index) => {
    setGoals((prevGoals) => prevGoals.filter((_, i) => i !== index));
    setIsEdited(true); // Show save button after removing a goal
  };

  const toggleEdit = (index) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal, i) =>
        i === index ? { ...goal, isEditable: !goal.isEditable } : goal
      )
    );
    // setIsEdited(true); // Show save button after enabling edit mode
  };

  const onTextChange = (text, index) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal, i) => (i === index ? { ...goal, text: text } : goal))
    );
    setIsEdited(true); // Show save button when text is changed
  };

  const Header = () => (
    <View>
      <TrainerHeader text={CONTEXT.addInfo} imageUrl={null} Notify={null} />
    </View>
  );

  const Button = () => (
    <View style={styles.buttonColor}>
      <PrimaryButton
        title="< Back"
        style={90}
        edit={true}
        color={true}
        onPress={() => navigation.goBack()}
      />
      {isEdited && ( // Conditionally render Save button if an edit has been made
        <PrimaryButton
          title="Save"
          style={90}
          edit={true}
          color={false}
          onPress={() => informationUpdate(goals)}
        />
      )}
    </View>
  );

  const Container = () => (
    <View style={styles.containerHeader}>
      {goals?.map((goal, index) => (
        <View>
          <View
            key={index}
            style={[styles.row, { justifyContent: "space-between" }]}
          >
            {goal.isEditable ? (
              <TextInput
                style={[styles.textUser, { padding: 10 }]}
                value={goal.text}
                onChangeText={(text) => onTextChange(text, index)} // Call onTextChange on text change
              />
            ) : (
              <Text style={[styles.textUser, { padding: 10, borderWidth: 0 }]}>
                {goal.text}
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
              onPress={() => removeGoal(index)}
            >
              <FastImage source={images.delete_img} style={styles.deleteImg} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.horizontalLine,
              { width: "90%", marginVertical: scale(2) },
            ]}
          />
        </View>
      ))}

      <View style={styles.addlistView}>
        <TextInput
          style={styles.textInput}
          value={newGoal}
          onChangeText={setNewGoal}
        />
        <TouchableOpacity
          disabled={!newGoal.length > 0}
          style={[
            styles.secondaryButton,
            {
              backgroundColor:
                newGoal.length > 0 ? COLORS.themGreen : COLORS.lightGray,
            },
          ]}
          onPress={addGoal}
        >
          <Text style={styles.secondaryButtonText}>{CONTEXT.add}</Text>
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
          <Spinner
            visible={loading}
            textContent="Loading..."
            textStyle={{ color: "#FFF" }}
          />
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default AddInformationScreen;
