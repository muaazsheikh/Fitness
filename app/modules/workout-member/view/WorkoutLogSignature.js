import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./Style";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseType from "../component/exercise";

import { icons, images } from "../constant";
import _ from "lodash";
import { COLORS, CONTEXT } from "../constant/theme";
import { PrimaryButton } from "../../../components";
import { scale } from "react-native-size-matters";
import WorkoutSetComponent from "../component/setComponent";
import UserHeader from "../component/userHeader";

import TrainerHeader from "../component/header-component";
import SignatureCapture from "react-native-signature-capture";
import { NavigationStrings } from "../../../constants";

const WorkoutLogSignature = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  let signatureRef = null;

  const onSaveEvent = (result) => {
    // result.encoded - the base64-encoded png
    console.log(result.encoded);
  };

  const onDragEvent = () => {
    // This callback will be called when the user enters signature
  };

  const Search = () => (
    <View style={styles.searchView}>
      <TrainerHeader text="Excercise Log" imageUrl={icons.chat_icon} />
    </View>
  );

  const ModalContainer = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback>
        <View style={styles.modelViewcontainer}>
          <View style={[]}>
            <View style={{ height: 100 }}>
              <SignatureCapture
                style={styles.signature}
                ref={(ref) => (signatureRef = ref)}
                onSaveEvent={onSaveEvent}
                onDragEvent={onDragEvent}
                saveImageFileInExtStorage={false}
                showNativeButtons={false}
                showTitleLabel={false}
                backgroundColor={COLORS.gray1}
                strokeColor={COLORS.white}
              />
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  title={"Confirm"}
                  style={90}
                  edit={true}
                  onPress={() =>
                    navigation.navigate(
                      NavigationStrings.WORKOUT_COMPLETED_MEMBER
                    )
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const Container = () => (
    <View style={{ flex: 2, marginBottom: 10, marginTop: 80, opacity: 0.15 }}>
      <WorkoutSetComponent />
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Search()}
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            top: scale(300),
            zIndex: 3,
          }}
        >
          <Text
            style={[styles.text, { alignSelf: "center", marginVertical: 10 }]}
          >
            I have received your workout log. It{"\n"} includes 2 videos and 1
            photo.{"\n"}
            {"\n"}
            To view the content, please sign in.
          </Text>

          <PrimaryButton
            title={"Confirm"}
            style={90}
            edit={true}
            onPress={() => setModalVisible(true)}
          />
        </View>
        {ModalContainer()}
        <ScrollView>{Container()}</ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default WorkoutLogSignature;
