// CalendarRejectedModal.js
import React from "react";
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
  handleRadioButtonPress,
  selectedOption,
  setModalRejected,
}) => {
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

            <View
              style={{
                alignSelf: "center",
                marginVertical: verticalScale(25),
                width: scale(300),
              }}
            >
              <View style={styles.reasonRejectContain}>
                <Text style={styles.TextReasone}>Reason for Cancellation </Text>
                <Image source={icons.Polygon} style={styles.radioIcon} />
              </View>
              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 5 }}
                onPress={() => handleRadioButtonPress("option1")}
              >
                <Image
                  source={
                    selectedOption === "option1"
                      ? icons.RadioOn
                      : icons.RadioOff
                  }
                  style={styles.radioIcon}
                />
                <Text style={styles.textSmallReasone}>
                  Cancellation due to overlapping schedule
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", marginVertical: 4 }}
                onPress={() => handleRadioButtonPress("option2")}
              >
                <Image
                  source={
                    selectedOption === "option2"
                      ? icons.RadioOn
                      : icons.RadioOff
                  }
                  style={styles.radioIcon}
                />
                <Text style={styles.textSmallReasone}>
                  Cancellation due to trainer's availability
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => handleRadioButtonPress("option3")}
              >
                <Image
                  source={
                    selectedOption === "option3"
                      ? icons.RadioOn
                      : icons.RadioOff
                  }
                  style={styles.radioIcon}
                />
                <Text style={styles.textSmallReasone}>Other</Text>
              </TouchableOpacity>

              {selectedOption === "option3" && (
                <View style={styles.searchView}>
                  <TextInput
                    placeholder={CONTEXT.reasonReject}
                    placeholderTextColor={COLORS.gray}
                    keyboardType="default"
                    style={{ color: COLORS.white }}
                    // onChangeText={handleInputChange}
                  />
                </View>
              )}
            </View>

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
                onPress={() => {
                  closeModal(false);
                  setModalRejected(true);
                }}
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
