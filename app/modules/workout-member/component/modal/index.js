import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS } from "../../../home/constant";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { icons } from "../../constant";
import { PrimaryButton } from "../../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const FeedBackModal = ({
  visible,
  setModalVisible,
  imageUrl,
  text,
  navigation,
  onRatingChange,
  onMemoChange,
  onConfirm,
  exerciseName,
}) => {
  const [defaultRating, setDefaultRating] = useState(2);
  const [enable, setEnable] = useState(false);
  const [memo, setMemo] = useState("");
  const maxRating = [1, 2, 3, 4, 5];
  const handleConfirm = (text) => {
    if (memo.length > 0 || enable) {
      setMemo("");
      onConfirm();
      setDefaultRating(2);
      setEnable(false);
    } else {
      console.log("cancel");
    }
  };

  const handleRatingChange = (item) => {
    setDefaultRating(item);
    console.log(item);
    onRatingChange(item);
  };

  const memoChange = (text) => {
    setMemo(text);
    // setDefaultRating(2)
    onMemoChange(text);
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <KeyboardAwareScrollView>
              <TouchableOpacity
                style={styles.crossIconView}
                onPress={() => setModalVisible(false)}
              >
                <FastImage
                  source={icons.CrossButton}
                  style={styles.crossIconView}
                />
              </TouchableOpacity>
              <FastImage source={imageUrl} style={styles.modalImage} />
              <Text style={styles.modalText}>{text}</Text>
              {exerciseName ? (
                <Text style={styles.modalText}>{exerciseName}</Text>
              ) : null}
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                {maxRating.map((item, key) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={item}
                      style={{ flexDirection: "row" }}
                      onPress={() => {
                        handleRatingChange(item), setEnable(true);
                      }}
                    >
                      <FastImage
                        style={styles.starImageStyle}
                        source={
                          item <= defaultRating
                            ? icons.review
                            : icons.review_place
                        }
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Memo */}
              <TextInput
                style={styles.textStyle}
                multiline={true}
                placeholder="Add memo"
                placeholderTextColor={COLORS.lightGray}
                value={memo}
                onChangeText={(text) => {
                  memoChange(text);
                }}
              />

              {/* Confirm button */}
              <PrimaryButton
                color={memo.length > 0 || enable ? false : true}
                title={"Confirm"}
                onPress={handleConfirm}
                style={90}
              />
            </KeyboardAwareScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FeedBackModal;
