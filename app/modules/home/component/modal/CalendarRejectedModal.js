// CalendarRejectedModal.js
import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./Style";
import { scale, verticalScale } from "react-native-size-matters";
import { icons } from "../../constant";
import { CONTEXT, COLORS } from "../../constant/theme";
import FastImage from "react-native-fast-image";

const CalendarRejectedModal = ({
  visible,
  closeModal,
  setModalRejected,
  updateInput,
  confirmAction,
}) => {
  const reasonsData = [
    { id: 1, title: "Rejection due to overlapping schedules" },
    { id: 2, title: "Rejection due to trainer's availability" },
    { id: 3, title: "" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [input, setInput] = useState("");

  const handleRadioButtonPress = (option) => {
    setSelectedOption(option);
    updateInput("");
  };

  const confirmPress = (selectedOption) => {
    closeModal(false);
    setModalRejected(true);
    updateInput(input);
    if (selectedOption?.id === 3) {
      confirmAction(input);
    } else {
      confirmAction(selectedOption?.title);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => closeModal(false)}
    >
      <TouchableWithoutFeedback onPress={() => closeModal(false)}>
        <View style={styles.modelViewcontainer}>
          <View style={[styles.viewModal]}>
            <TouchableOpacity
              style={styles.crossIconView}
              onPress={() => closeModal(false)}
            >
              <FastImage source={icons.CrossButton} style={styles.crossImage} />
            </TouchableOpacity>

            <View style={styles.requestTextView}>
              <FastImage
                source={icons.CalenderIcon}
                style={styles.reserveIcon}
              />
              <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
                {CONTEXT.ReserveCancel}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginTop: 15,
                marginHorizontal: 10,
              }}
              onPress={() => handleRadioButtonPress(reasonsData[0])}
            >
              <FastImage
                source={
                  selectedOption?.id === 1 ? icons.RadioOn : icons.RadioOff
                }
                style={styles.radioIcon}
              />
              <Text style={styles.textSmallReasone}>
                Rejection due to overlapping schedules
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginVertical: 14,
                marginHorizontal: 10,
              }}
              onPress={() => handleRadioButtonPress(reasonsData[1])}
            >
              <FastImage
                source={
                  selectedOption?.id === 2 ? icons.RadioOn : icons.RadioOff
                }
                style={styles.radioIcon}
              />
              <Text style={styles.textSmallReasone}>
                Rejection due to trainer's availability
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row", marginHorizontal: 10 }}
              onPress={() => handleRadioButtonPress(reasonsData[2])}
            >
              <FastImage
                source={
                  selectedOption?.id === 3 ? icons.RadioOn : icons.RadioOff
                }
                style={styles.radioIcon}
              />
              <Text style={styles.textSmallReasone}>Other</Text>
            </TouchableOpacity>

            {selectedOption?.id === 3 && (
              <View style={styles.searchView}>
                <TextInput
                  placeholder={CONTEXT.reasonReject}
                  placeholderTextColor={COLORS.gray}
                  keyboardType="default"
                  style={{ color: COLORS.white }}
                  onChangeText={(text) => {
                    updateInput(text);
                    setInput(text);
                  }}
                />
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                justifyContent: "space-between",
                width: scale(170),
                marginHorizontal: scale(10),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  closeModal(false);
                }}
                style={[
                  styles.confirmButton,
                  {
                    backgroundColor: COLORS.gray,
                    borderWidth: 0.7,
                    borderColor: COLORS.white,
                    borderRadius: scale(15),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.smallTextStyle,
                    { fontSize: scale(12), color: COLORS.white },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => confirmPress(selectedOption)}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmText}>{CONTEXT.confirm}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalendarRejectedModal;
