// SessionRejectionModal.js
import React, { useState } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./Style";
import { CONTEXT, COLORS, FONTS } from "../../constant/theme";
import { icons, images } from "../../constant";
import { scale, verticalScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import { Image } from "react-native";

const reasonsData = [
  { id: 1, title: "Rejection due to overlapping schedules" },
  { id: 2, title: "Rejection due to trainer's availability" },
  { id: 3, title: "" },
];

const SessionRejectionModal = ({
  visible,
  closeModal,
  confirmAction,
  updateInput,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [input, setInput] = useState("");

  const handleRadioButtonPress = (option) => {
    setSelectedOption(option);
    updateInput("");
  };

  const confirmPress = (selectedOption) => {
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
      onRequestClose={closeModal}
    >
      <View style={styles.modelViewcontainer}>
        <View style={[styles.viewModal]}>
          <TouchableOpacity style={styles.crossIconView} onPress={closeModal}>
            <FastImage source={icons.CrossButton} style={styles.crossImage} />
          </TouchableOpacity>

          <View style={styles.requestTextView}>
            <Image source={images.booked} style={styles.reserveIcon} />
            <Text style={[styles.requestTextStyle, { marginLeft: scale(6) }]}>
              {CONTEXT.cancel_booked_session}
            </Text>
          </View>

          <View
            style={styles.reasonContainer}
          >
            <View style={styles.reasonRejectContain}>
              <Text style={styles.TextReasone}>Reason for Cancellation </Text>
              <FastImage
                source={icons.Polygon}
                style={[styles.radioIcon, { width: 14, height: 10 }]}
              />
            </View>
            <TouchableOpacity
              style={{ flexDirection: "row", marginTop: 5 }}
              onPress={() => handleRadioButtonPress(reasonsData[0])}
            >
              <Image
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
              style={{ flexDirection: "row" }}
              onPress={() => handleRadioButtonPress(reasonsData[1])}
            >
              <Image
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
              style={{ flexDirection: "row" }}
              onPress={() => handleRadioButtonPress(reasonsData[2])}
            >
              <Image
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
          </View>
          <View style={styles.warningContainer}>
            <Image source={images.danger} style={styles.dangerImage} />

            <Text style={styles.warningText}>{CONTEXT.warning}</Text>
            <Text style={styles.warningTitle}>
              {CONTEXT.cancel_booked_warning}
            </Text>
          </View>

          <View style={styles.actionButtonsView}>
            <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
              <Text
                style={[
                  styles.smallTextStyle,
                  { fontSize: scale(12), color: COLORS.white },
                ]}
              >
                {CONTEXT.cancel}
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
    </Modal>
  );
};

export default SessionRejectionModal;
