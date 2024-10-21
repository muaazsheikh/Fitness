import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import {
  preferredExerciseFailure,
  preferredExerciseRequest,
  preferredExerciseSuccess,
} from "../../../redux/preferredExerciseSlice";
import getPreferredExerciseApi from "../../../api/profile/getPreferredExercise";
import {
  preferredExerciseUpdateFailure,
  preferredExerciseUpdateRequest,
  preferredExerciseUpdateSuccess,
} from "../../../redux/preferredExerciseUpdateSlice";
import updatePreferredExerciseApi from "../../../api/profile/updatePreferredExercise";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const MemberPreferred = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.preferredUpdate?.loading);
  const load = useSelector((state) => state?.preferredExercise?.loading);
  const [preferredExercises, setPreferredExercises] = useState([]);
  const [newExercise, setNewExercise] = useState("");

  useEffect(() => {
    async function fetchPreferredExercises() {
      try {
        dispatch(preferredExerciseRequest());
        const response = await getPreferredExerciseApi();
        dispatch(preferredExerciseSuccess(response));
        console.log(response.data);
        setPreferredExercises(
          response?.data?.preferExercises.map((exercise) => ({
            text: exercise,
            isEditable: false,
          }))
        );
      } catch (error) {
        dispatch(preferredExerciseFailure(error.message));
      }
    }
    fetchPreferredExercises();
  }, []);

  const preferredExerciseUpdate = async () => {
    try {
      dispatch(preferredExerciseUpdateRequest());
      const updatedExercises = preferredExercises.map(
        (exercise) => exercise.text
      );
      const response = await updatePreferredExerciseApi(updatedExercises);
      dispatch(preferredExerciseUpdateSuccess(response));
    } catch (error) {
      dispatch(preferredExerciseUpdateFailure(error.message));
    }
  };

  const toggleEdit = (index) => {
    const updatedExercises = [...preferredExercises];
    updatedExercises[index].isEditable = !updatedExercises[index].isEditable;
    setPreferredExercises(updatedExercises);
  };

  const addExercise = () => {
    if (newExercise.trim() !== "") {
      setPreferredExercises([
        ...preferredExercises,
        { text: newExercise, isEditable: false },
      ]);
      setNewExercise("");
    }
  };

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <TrainerHeader text="Preferred Exercise" />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerView}>
            {preferredExercises.map((exercise, index) => (
              <View
                key={index}
                style={[styles.row, { justifyContent: "space-between" }]}
              >
                {exercise.isEditable ? (
                  <TextInput
                    style={styles.textUser}
                    value={exercise.text}
                    onChangeText={(text) => {
                      const updatedExercises = [...preferredExercises];
                      updatedExercises[index].text = text;
                      setPreferredExercises(updatedExercises);
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => toggleEdit(index)}
                    style={{ flex: 1 }}
                  >
                    <Text
                      style={[
                        styles.textUser,
                        { borderWidth: 0, width: "100%", marginLeft: -25 },
                      ]}
                    >
                      • {exercise.text}
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={() => toggleEdit(index)}
                >
                  <Image
                    source={
                      exercise.isEditable
                        ? icons.edit_icon_theme
                        : icons.edit_icon_disable
                    }
                    style={styles.editIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignSelf: "center" }}
                  onPress={() => {
                    const updatedExercises = [...preferredExercises];
                    updatedExercises.splice(index, 1);
                    setPreferredExercises(updatedExercises);
                  }}
                >
                  <Image source={images.delete_img} style={styles.deleteImg} />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.addlistView}>
              <TextInput
                style={styles.textInput}
                value={newExercise}
                onChangeText={setNewExercise}
                placeholder="Add Exercise"
                placeholderTextColor={COLORS.placeholderColor}
              />
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={addExercise}
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
              onPress={() => preferredExerciseUpdate()}
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

export default MemberPreferred;
