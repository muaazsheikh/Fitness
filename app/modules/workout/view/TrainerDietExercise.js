// WriteLogExercise.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import _ from "lodash";
import { PrimaryButton } from "../../../components";
import WriteLogComponent from "../component/writeLog";
import WriteLogContainer from "../component/exerciseContainer";
import { scale } from "react-native-size-matters";
import styles from "./Style";
import WorkoutListComponent from "../component/workoutList";
import FeedBackModal from "../component/modal";

const TrainerDietExercise = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [progress, setProgress] = useState(5);
  const [repsProgress, setRepsProgress] = useState(10);
  const [numSets, setNumSets] = useState(0);
  const [visible, setVisible] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    if (numSets <= 0) {
      alert("Please add set");
    } else {
      setModalVisible(true);
    }
  };

  const handleValueChange = (value) => {
    setProgress(value);
  };

  const handleReps = (value) => {
    setRepsProgress(value);
  };

  const handleAddSet = () => {
    setNumSets(numSets + 1);
  };
  const handleContainer = () => {
    setProgress(5);
    setRepsProgress(10);
    setVisible(false);
  };

  const HeaderList = ({ exerciseName }) => (
    <View style={styles.headerBodyView}>
      <View style={styles.bodyView}>
        <WriteLogComponent numberOfItems={10} numSets={numSets} itemSize={54} />
        <TouchableOpacity style={styles.addTouchable}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerWrite}>Lat pull down</Text>
    </View>
  );

  const Container = () => (
    <WriteLogContainer
      progress={progress}
      repsProgress={repsProgress}
      handleValueChange={handleValueChange}
      handleReps={handleReps}
      handleAddSet={handleAddSet}
      onCrossButtonPress={handleContainer}
    />
  );
  const ContainerList = () => (
    <View style={{ marginTop: 20, marginBottom: 0 }}>
      {Array.from({ length: numSets }, (_, index) => (
        <WorkoutListComponent key={index} />
      ))}
    </View>
  );
  const Button = () => (
    <View style={styles.buttonView}>
      <PrimaryButton
        title={"Add Set  +"}
        onPress={() => setVisible(true)}
        style={90}
      />
      <PrimaryButton
        title={"Next  >"}
        style={90}
        color={"transparent"}
        onPress={() => handleModal()}
      />
      <FeedBackModal
        visible={modalVisible}
        imageUrl={images.success}
        setModalVisible={setModalVisible}
        text={"How was the workout?"}
        navigation={navigation}
      />
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginBottom: scale(80) }}>
            <HeaderList exerciseName="Lat pull down" />
            {ContainerList()}
            {visible && Container()}
            {!visible && Button()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TrainerDietExercise;
