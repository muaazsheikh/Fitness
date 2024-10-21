import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
} from "react-native";
import styles from "./Style";
import LogCreated from "../log-created";
import { NavigationStrings } from "../../../../constants";
import { PrimaryButton } from "../../../../components";
import { CONTEXT } from "../../../home/constant/theme";
import { COLORS, FONTS, icons, images } from "../../constant";
import uploadImageBase64Api from "../../../../api/assets/uploadImageBase64";
import SignatureScreen from "react-native-signature-canvas";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { workoutLoading } from "../../../../redux/workoutSlice";
import { useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { scale } from "react-native-size-matters";

const Card = ({ item, navigation, color, disable, onChange }) => {
  const [showList, setShowList] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const ref = useRef();
  const opacity = useSharedValue(0);
  const [signatureButton, setSignatureButton] = useState(false);
  const dispatch = useDispatch();

  const handleSignature = async (signature) => {
    try {
      if (signature) {
        setLoading(true);
        setSignatureButton(false);
        setModalVisible(false);

        const imgResponse = await uploadImageBase64Api(
          signature,
          item?.workoutLogSummary?.id
        );

        dispatch(workoutLoading(true));
        setLoading(false);

        console.log(imgResponse);
        onChange();
        if (imgResponse?.status) {
          setImage(imgResponse?.data);
          setModalVisible(false);
        } else {
          setLoading(false);
          throw new Error("Failed to upload image");
        }
      }
    } catch (error) {
      setLoading(false);

      console.log("Error:", error);
      setModalVisible(false);
    }
  };

  const handleEmpty = () => {
    setSignatureData(null); // Clear the signature data if empty
    setSignatureButton(false); // Disable the button if empty
  };

  const handleConfirm = () => {
    ref.current.readSignature();
  };

  function capitalizeFirstLetter(string) {
    return [...string][0].toUpperCase() + [...string].slice(1).join("");
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const ModalContainer = () => {
    return (
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
            <View style={{ marginTop: Dimensions.get("window").height * 0.25 }}>
              <View
                style={{
                  backgroundColor: "white",
                  paddingVertical: 2,
                  width: scale(320),
                  alignSelf: "center",
                  borderRadius: 20,
                }}
              >
                <Animated.View
                  style={[
                    {
                      height: 180,
                      width: scale(315),
                      alignSelf: "center",
                      borderRadius: 20,
                      overflow: "hidden",
                      backgroundColor: COLORS.themeGray,
                    },
                    animatedStyle,
                  ]}
                >
                  <SignatureScreen
                    ref={ref}
                    onOK={handleSignature}
                    onEmpty={handleEmpty}
                    onEnd={() => setSignatureButton(true)}
                    autoClear={true}
                    backgroundColor={COLORS.gray1}
                    penColor={COLORS.white}
                    style={{ flex: 1 }}
                    webStyle={`
                  .m-signature-pad {
                    background-color: ${COLORS.gray1};
                    border: none;
                    box-shadow: none;
                  }
                  .m-signature-pad--body {
                    border: none;
                  }
                  .m-signature-pad--footer {
                    display: none;
                  }
                  .m-signature-pad--body canvas {
                    background-color: ${COLORS.gray1};
                  }
                `}
                  />
                </Animated.View>
              </View>
              <View style={styles.buttonContainer}>
                {!signatureButton ? (
                  <PrimaryButton
                    title={"Confirm"}
                    style={90}
                    color={true}
                    // edit={false}
                    onPress={() => setModalVisible(false)}
                  />
                ) : (
                  <PrimaryButton
                    title={"Confirm"}
                    style={90}
                    edit={true}
                    onPress={handleConfirm}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const listShow = () => {
    setShowList(!showList);
  };

  return (
    <>
      <TouchableOpacity
        disabled={disable}
        onPress={() => {
          navigation.navigate(NavigationStrings.WORKOUT_MEMBER_DETAIL, {
            id: item?.workoutLogSummary?.id,
            createdBy: item?.workoutLogSummary?.createdBy,
          });
        }}
        style={[styles.card, { borderColor: COLORS.themGreen }]}
      >
        <View style={styles.cardView}>
          <View>
            <LogCreated
              name={item?.memberDetails?.name}
              date={item?.workoutLogSummary?.workoutDate}
              time={item.time}
              logs={item?.workoutLogSummary?.sessionStatus}
              navigation={navigation}
              color={color}
              status={!item?.workoutLogSummary?.traineeConfirm}
              sessionCount={item?.sessionDetails?.completedSessions}
              rating={item?.workoutLogSummary?.avgRating}
              sessionPending={item?.sessionDetails?.totalSession}
            />
          </View>
          <View style={styles.horizontalLine} />
          {!item?.workoutLogSummary?.traineeConfirm && (
            <View style={{ gap: 30 }}>
              <Text
                style={[
                  styles.backText,
                  {
                    alignSelf: "center",
                    textAlign: "center",
                    fontFamily: FONTS.ARCHI_BOLD,
                  },
                ]}
              >
                {CONTEXT.workout_sign}
              </Text>
              <PrimaryButton
                title={CONTEXT.sign}
                style={90}
                edit={true}
                onPress={() => {
                  opacity.value = withTiming(1, {
                    duration: 500,
                    easing: Easing.inOut(Easing.ease),
                  });
                  setModalVisible(true);
                }}
              />
            </View>
          )}
          {/* <View
            style={
              item?.workoutLogSummary?.traineeConfirm !== null
                ? { opacity: 1 }
                : { opacity: 0.1 }
            }
          >
            <Text style={[styles.exerciseText, { color: color }]}>
              {CONTEXT.exercise}
            </Text>
            <Text style={styles.totalText}>
              {CONTEXT.total} {item?.workoutLogSummary?.totalExercises} {CONTEXT.exercise},{" "}
              {item?.workoutLogSummary?.totalSets} {CONTEXT.sets}
            </Text>
          </View> */}

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={
                !item?.workoutLogSummary?.traineeConfirm
                  ? { opacity: 0.1 }
                  : { opacity: 1 }
              }
            >
              <Text style={[styles.exerciseText, { color: color }]}>
                {CONTEXT.exercise}
              </Text>
              <Text style={styles.totalText}>
                {CONTEXT.total} {item?.workoutLogSummary?.totalExercises}{" "}
                {CONTEXT.exercise}s, {item?.workoutLogSummary?.totalSets}{" "}
                {CONTEXT.sets}
              </Text>
            </View>
            <View
              style={
                ({ flexDirection: "row", gap: 20 },
                !item?.workoutLogSummary?.traineeConfirm
                  ? { opacity: 0.1 }
                  : { opacity: 1 })
              }
            >
              {item?.workoutLogSummary?.imageCount > 0 && (
                <View style={[styles.item, styles.imageContainer]}>
                  <ImageBackground
                    source={images.image_placeholder}
                    style={styles.image}
                  >
                    <TouchableOpacity style={styles.ImageView}>
                      <Text style={styles.countText}>
                        {item?.workoutLogSummary?.imageCount}
                      </Text>
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              )}

              {item?.workoutLogSummary?.videoCount > 0 && (
                <View style={[styles.item, styles.imageContainer]}>
                  <ImageBackground
                    source={images.video_placeholder}
                    style={styles.image}
                  >
                    <TouchableOpacity style={styles.ImageView}>
                      <Text style={styles.countText}>
                        {item?.workoutLogSummary?.videoCount}
                      </Text>
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              )}
            </View>
          </View>

          <View style={styles.horizontalLine} />

          {item.log !== "Pending" ? (
            <View
              style={
                !item?.workoutLogSummary?.traineeConfirm
                  ? { opacity: 0.1 }
                  : { opacity: 1 }
              }
            >
              {item?.workoutLogSummary?.exerciseDetails.map((detail, index) => (
                <View key={index}>
                  <View style={styles.listView}>
                    <Text style={styles.backText}>• {detail.type}</Text>
                    <TouchableOpacity onPress={() => listShow()}>
                      <Image
                        source={
                          showList ? icons.down_white_icon : icons.right_arrow
                        }
                        style={
                          showList ? styles.arrowDowIcon : styles.arrowIcon
                        }
                      />
                    </TouchableOpacity>
                  </View>

                  {showList ? (
                    <View>
                      {detail.exerciseList.map((exercise, idx) => (
                        <Text key={idx} style={styles.pullText}>
                          {exercise}
                        </Text>
                      ))}
                    </View>
                  ) : null}
                  <View style={styles.horizontalLine} />
                </View>
              ))}
            </View>
          ) : (
            <Text style={[styles.exerciseText, { color: COLORS.Lightred }]}>
              {CONTEXT.workout_need}
            </Text>
          )}
          <View
            style={
              !item?.workoutLogSummary?.traineeConfirm
                ? { opacity: 0.1, flexDirection: "row" }
                : { opacity: 1, flexDirection: "row" }
            }
          >
            <Image
              source={icons.trainer_comment}
              style={[styles.imageNotes, { tintColor: color }]}
            />
            <Text style={[styles.trainerText, { color: color }]}>
              {`${capitalizeFirstLetter(
                item?.workoutLogSummary?.createdBy
              )} Memo : `}
              <Text style={[styles.backText]}>
                {item?.workoutLogSummary?.notes}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {ModalContainer()}
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
    </>
  );
};

const TrainerCreateComponent = ({
  navigation,
  data,
  color,
  disable,
  onChange,
}) => {
  const [refresh, SetRefresh] = useState(false);

  const dataRefresh = () => {
    SetRefresh(true);
    onChange();
  };

  return (
    <View style={styles.setList}>
      <FlatList
        data={data}
        extraData={refresh}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 5, justifyContent: "center" }}>
            <Card
              color={color}
              navigation={navigation}
              disable={disable}
              item={item}
              onChange={() => dataRefresh()}
            />
          </View>
        )}
      />
    </View>
  );
};

export default TrainerCreateComponent;
