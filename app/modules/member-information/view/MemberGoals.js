import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import TrainerHeader from "../component/header";
import { icons, COLORS, images } from "../../home/constant";
import { PrimaryButton } from "../../../components";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import {
  goalFailure,
  goalRequest,
  goalSuccess,
} from "../../../redux/getGoalSlice";
import getGoalsApi from "../../../api/profile/getGoals";
import {
  goalUpdateFailure,
  goalUpdateRequest,
  goalUpdateSuccess,
} from "../../../redux/goalUpdateSlice";
import updateGoalApi from "../../../api/profile/updateGoal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const MemberGoals = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.goal?.loading);
  const load = useSelector((state) => state?.goalUpdate?.loading);
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");

  React.useEffect(() => {
    async function fetchMyAPI() {
      try {
        dispatch(goalRequest());
        const response = await getGoalsApi();
        dispatch(goalSuccess(response));
        setGoals(
          response.data.goals.map((goal) => ({ text: goal, isEditable: false }))
        );
      } catch (error) {
        console.log(JSON.stringify(error));
        dispatch(goalFailure(error.message));
      }
    }
    fetchMyAPI();
  }, []);

  const goalUpdate = async (goal) => {
    const textArray = goal.map((goal) => goal.text);
    try {
      dispatch(goalUpdateRequest());
      const response = await updateGoalApi(textArray);
      dispatch(goalUpdateSuccess(response));
      console.log(response);
    } catch (error) {
      console.log(JSON.stringify(error));
      dispatch(goalUpdateFailure(error.message));
    }
  };

  const toggleEdit = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].isEditable = !updatedGoals[index].isEditable;
    setGoals(updatedGoals);
  };

  const addGoal = () => {
    if (newGoal.trim() !== "") {
      setGoals([...goals, { text: newGoal, isEditable: false }]);
      setNewGoal(""); // Clear the input field after adding the goal
    }
  };

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <TrainerHeader text="Goals" />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerView}>
            {goals?.map((goal, index) => (
              <View
                key={index}
                style={[styles.row, { justifyContent: "space-between" }]}
              >
                {goal.isEditable ? (
                  <TextInput
                    style={styles.textUser}
                    value={goal.text}
                    numberOfLines={2}
                    onChangeText={(text) => {
                      const updatedGoals = [...goals];
                      updatedGoals[index].text = text;
                      setGoals(updatedGoals);
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => toggleEdit(index)}
                    style={{ flex: 1 }}
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.textUser,
                        { borderWidth: 0, width: "100%", marginLeft: -25 },
                      ]}
                    >
                      • {goal.text}
                    </Text>
                  </TouchableOpacity>
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
                    style={styles.editIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={() => {
                    const updatedGoals = [...goals];
                    updatedGoals.splice(index, 1);
                    setGoals(updatedGoals);
                  }}
                >
                  <FastImage
                    source={images.delete_img}
                    style={styles.deleteImg}
                  />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.addlistView}>
              <TextInput
                style={styles.textInput}
                value={newGoal}
                onChangeText={setNewGoal}
                placeholder="Add Goal"
                placeholderTextColor={COLORS.placeholderColor}
              />
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={addGoal}
              >
                <Text style={styles.secondaryButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonViewNew}>
            <PrimaryButton
              title={"< Back"}
              style={80}
              edit={true}
              color={true}
              onPress={() => navigation.goBack()}
            />
            <PrimaryButton
              title={"Save"}
              style={80}
              edit={true}
              color={false}
              onPress={() => {
                // Handle save functionality
                goalUpdate(goals);
              }}
            />
            <Spinner
              visible={loading || load}
              textContent={"Loading..."}
              textStyle={{ color: "#FFF" }}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MemberGoals;
