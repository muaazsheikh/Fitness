import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { icons } from "../../../constant";
import styles from "./Style";
import FastImage from "react-native-fast-image";
import { scale } from "react-native-size-matters";
import { CONTEXT } from "../../../constant/theme";
import { PrimaryButton } from "../../../../../components";

const ViewModal = ({ modalView, setModalView, trainerNotes, name }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalView}
      onRequestClose={() => {
        setModalView(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalView(false)}>
        <View style={styles.modelViewcontainer}>
          <View style={[styles.confirmModal]}>
            <View style={{ height: scale(200) }}>
              <TouchableOpacity
                style={styles.crossIconView}
                onPress={() => setModalView(false)}
              >
                <FastImage
                  source={icons.CrossButton}
                  style={styles.crossImage}
                />
              </TouchableOpacity>

              <View style={styles.requestTextView}>
                <Image source={icons.file} style={styles.reserveIcon} />
                <Text
                  style={[styles.requestTextStyle, { marginLeft: scale(6) }]}
                >
                  {name}
                </Text>
              </View>
              <View style={styles.horizontalLine}></View>

              {trainerNotes ? (
                <Text style={styles.textModal}>{trainerNotes}</Text>
              ) : (
                <Text style={styles.textModal}>{CONTEXT.noComments}</Text>
              )}
            </View>
            <View style={{ alignSelf: "center" }}>
              <PrimaryButton
                title={"Close"}
                style={80}
                edit={false}
                color={true}
                onPress={() => setModalView(false)}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ViewModal;
