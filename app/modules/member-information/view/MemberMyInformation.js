import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Style";
import { COLORS, CONTEXT } from "../../home/constant/theme";
import { icons, images } from "../../home/constant";
import FastImage from "react-native-fast-image";
import { scale, verticalScale } from "react-native-size-matters";
import Checkbox from "../component/checkbox";
import { PrimaryButton } from "../../../components";
import RoundCheckbox from "../component/roundcheckbox";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import {
  itemFailure,
  itemRequest,
  itemSuccess,
} from "../../../redux/getItemSlice";
import getItemInfoApi from "../../../api/profile/getItems";
import { useFocusEffect } from "@react-navigation/native";
import {
  getPauseMembershipDetail,
  pauseMembershipApi,
} from "../../../api/profile/pauseMembership";
import {
  getRefundProductList,
  requestRefundApi,
} from "../../../api/profile/refundProductApi";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import {
  getAllTrainersList,
  requestChangeTrainerApi,
} from "../../../api/profile/changeTrainerRequest";
import HeaderComponent from "../component/HeaderComponent";

const MemberMyInformation = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.item?.loading);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalNotice, setModalNotice] = useState(false);
  const [modalPause, setModalPause] = useState(false);
  const [modalTrainer, setModalTrainer] = useState(false);
  const [modalTrainerNotice, setModalTrainerNotice] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isCheckedRadio, setisCheckedRadio] = useState(false);
  const [isCheckedRadio3, setisCheckedRadio3] = useState(false);
  const [dataAll, setDataAll] = useState([]);
  const [gymMemberships, setGymMembershipData] = useState();
  const [golfMembership, setGolfMembershipData] = useState([]);
  const [reason, setReason] = useState();
  const [reasonOtherText, setReasonOtherText] = useState("");
  const [pauseDetails, setPauseDetails] = useState();
  const [refundProductList, setRefundProductList] = useState();
  const [selectedRefundProduct, setSelectedRefundProduct] = useState([]);
  const [openChangeTrainerModal, setOpenChangeTrainerModal] = useState(false);
  const [openNoticeInfoModal, setOpenNoticeInfoModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState([]);
  const [reqFeedbackType, setReqFeedbackType] = useState(0);
  const [trainerName, setTrainerName] = useState(null);
  const [trainerRank, setTrainerRank] = useState(0);
  const [groupExerciseMembership, setGroupExerciseMembershipData] = useState(
    []
  );
  const [ptSessions, setPtSessions] = useState({
    currentPT: [],
    expiredPT: [],
    expiredStartDate: null,
    currentStartDate: null,
    expiredEndDate: null,
  });

  useEffect(() => {
    const filterTrainers = dataAll.filter((val) => val?.isSelected);
    setSelectedTrainer(filterTrainers);
  }, [dataAll]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          dispatch(itemRequest());
          const response = await getItemInfoApi();
          dispatch(itemSuccess(response));
          const ptSessionsData = response?.data?.find(
            (item) => item.type === "PT Sessions"
          );
          console.log(
            "This is success response gymMembershipData",
            JSON.stringify(response)
          );

          const gymMembershipData = response?.data?.find(
            (item) => item.type === "Gym Membership"
          );
          const golfMembershipData = response?.data?.filter(
            (item) => item.type === "Golf Membership"
          );
          const groupExerciseMembershipData = response?.data?.filter(
            (item) => item.type === "Group Exercise Membership"
          );
          // console.log("goliilili", JSON.stringify(ptSessionsData));

          setGymMembershipData(gymMembershipData);
          const currentPT = ptSessionsData?.currentPT || [];
          const expiredPT = ptSessionsData?.expiredPT || [];
          const expiredStartDate = ptSessionsData?.expiredStartDate || null;
          const expiredEndDate = ptSessionsData?.expiredEndDate || null;
          const currentStartDate = ptSessionsData?.currentStartDate || null;

          setPtSessions({
            currentPT,
            expiredPT,
            expiredStartDate,
            expiredEndDate,
            currentStartDate,
          });

          setGolfMembershipData(golfMembershipData);
          setGroupExerciseMembershipData(groupExerciseMembershipData);
        } catch (error) {
          console.log(JSON.stringify(error));
          dispatch(itemFailure(error.message));
        }
      }
      fetchMyAPI();
      return () => {};
    }, [])
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear() % 100;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  };

  const handleToggle2 = () => {
    setReason({ id: 2, title: "Work-related" });
  };

  const handleToggleRadio = () => {
    setReason({ id: 1, title: "Health-related" });
  };

  const handleToggleRadio3 = () => {
    setReason({ id: 3, title: "Travel or other" });
  };
  const handleToggleRadio4 = () => {
    setReason({ id: 4, title: reasonOtherText });
  };

  const onPauseConfirm = async () => {
    const lastItem =
      gymMemberships?.products[gymMemberships?.products?.length - 1];
    try {
      const requestData = {
        reason: reason?.id === 4 ? reasonOtherText : reason?.title,
        productId: lastItem?.prodId,
        days: 30,
      };
      const response = await pauseMembershipApi(requestData);
    } catch (error) {
      Alert.alert(error?.response?.data?.message);
      console.log("Pause Membership Error", JSON.stringify(error.response));
    } finally {
      setModalPause(false);
    }
  };

  const onPressPause = async () => {
    setModalPause(true);
    try {
      const lastItem =
        gymMemberships?.products[gymMemberships?.products?.length - 1];
      const response = await getPauseMembershipDetail(lastItem?.prodId);
      setPauseDetails(response?.data);
    } catch (error) {
      console.log("Get Pause Membership Detail Error", JSON.stringify(error));
    }
  };

  const onRequestChangeTrainer = async () => {
    setOpenNoticeInfoModal(true);
    setOpenChangeTrainerModal(false);
    setTrainerRank(0);
  };

  const onPressChangeTrainer = async () => {
    try {
      const {
        data: { trainers: data, currentTrainer },
      } = await getAllTrainersList();
      setOpenChangeTrainerModal(true);
      setTrainerName(currentTrainer);

      if (data) {
        data.forEach((obj, index) => {
          obj.key = index + 1;
          obj.isSelected = false;
        });
        setDataAll(data);
      }
    } catch (error) {
      console.log("Get All Trainers Error", JSON.stringify(error));
    }
  };

  const onChangeTrainerConfirm = async () => {
    try {
      const reqTrainers = [];
      selectedTrainer.map((val) => {
        reqTrainers.push(val.trainerId);
      });
      const paramsRequest = {
        reqTrainers,
      };
      const response = await requestChangeTrainerApi(paramsRequest);
    } catch (error) {
      Alert.alert(error?.response?.data?.message);
      console.log("Change Trainers Error", JSON.stringify(error));
    } finally {
      setOpenNoticeInfoModal(false);
    }
  };

  const onRefundConfirm = async () => {
    try {
      const productIds = [];
      selectedRefundProduct.map((val) => {
        productIds.push(val.id);
      });
      const paramsRequest = {
        productIds,
        // "reason": "this is the reason", //optional
        reqFeedbackType,
      };
      const response = await requestRefundApi(paramsRequest);
      setModalNotice(false);
    } catch (error) {
      setModalNotice(false);
      Alert.alert(error?.response?.data?.message);
      console.log("request refund Error", JSON.stringify(error));
    } finally {
      setModalNotice(false);
    }
  };

  const onPressRefund = async (type) => {
    try {
      const response = await getRefundProductList(type);
      setModalVisible(true);
      setRefundProductList(response?.data);
    } catch (error) {
      console.log("Get Refund Product List Error", JSON.stringify(error));
    } finally {
      setModalPause(false);
    }
  };

  const Header = () => (
    <View style={{ paddingHorizontal: 10 }}>
      <HeaderComponent
        title="My items"
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );

  function isDateInThePast() {
    const lastItem =
      gymMemberships?.products[gymMemberships?.products?.length - 1];
    const dateString = lastItem?.membershipEndDate;
    const dateToCheck = new Date(dateString);
    const currentDate = new Date();
    return dateToCheck > currentDate;
  }

  const GymMember = () => (
    <>
      {gymMemberships && (
        <View style={styles.gymView}>
          <Text style={styles.heading}>{CONTEXT.gym_membership}</Text>
          <View style={styles.memberView}>
            <View>
              <FlatList
                data={gymMemberships.products}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.rowView}>
                    <FastImage
                      source={images.calendar_color}
                      style={styles.icon}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.mediumText}>
                        {formatDate(item?.membershipStartDate)}-{" "}
                        {formatDate(item?.membershipEndDate)}
                      </Text>
                      <Text style={styles.mediumText}>{item.productName}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
            {isDateInThePast() ? (
              <View style={styles.buttonMainView}>
                <TouchableOpacity
                  style={styles.borderTextView}
                  onPress={() => onPressPause()}
                >
                  <Text style={styles.typeText}>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.borderTextView}
                  onPress={() => onPressRefund(0)}
                >
                  <Text style={styles.typeText}>Refund</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      )}
    </>
  );

  const renderPTItem = ({ item }) => (
    <View
      style={[
        styles.requestTextView,
        { alignSelf: "flex-start", marginTop: 10, marginLeft: 30 },
      ]}
    >
      <Image source={images.User} style={styles.userIcon} />
      <Text numberOfLines={1} style={[styles.userTextStyle]}>
        {item?.trainerDetails?.name}
      </Text>
      <Image
        source={images.SessionIcon}
        style={[styles.taskImage, { marginLeft: 20 }]}
      />

      <Text style={[styles.userTextStyle, { marginLeft: 10 }]}>
        {item?.sessionCompleted}/{item.sessionCount}
      </Text>
    </View>
  );

  const PtSessionIcon = () => (
    <View style={styles.gymView}>
      <Text style={styles.heading}>{CONTEXT.pt_sessions}</Text>
      <View style={styles.memberView}>
        <View style={styles.rowView}>
          <FastImage source={images.calendar_color} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.mediumText}>
              {formatDate(ptSessions?.expiredStartDate)} -{" "}
              {formatDate(ptSessions?.expiredEndDate)}
            </Text>
          </View>
        </View>
        <FlatList
          data={ptSessions.expiredPT}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPTItem}
        />
        <View style={[styles.rowView, { marginTop: 20 }]}>
          <FastImage source={images.calendar_color} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.mediumText}>
              {formatDate(ptSessions?.currentStartDate)}
            </Text>
          </View>
        </View>
        <FlatList
          data={ptSessions.currentPT}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPTItem}
        />
        <View style={styles.buttonMainView}>
          <TouchableOpacity
            style={styles.borderTextView}
            onPress={() => onPressChangeTrainer()}
          >
            <Text style={styles.typeText}>Change Trainer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.borderTextView}
            onPress={() => onPressRefund(1)}
          >
            <Text style={styles.typeText}>Refund</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const GolfMember = () => (
    <>
      {!!golfMembership.length ? (
        <View style={styles.gymView}>
          <Text style={styles.heading}>{CONTEXT.golf_membership}</Text>
          <View style={styles.memberView}>
            {golfMembership.map((membership, index) => (
              <FlatList
                key={index} // Use index as key since membership id might not be unique across different memberships
                data={membership.products}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.rowView}>
                      <FastImage
                        source={images.calendar_color}
                        style={styles.icon}
                      />
                      <View style={styles.textContainer}>
                        <Text style={styles.mediumText}>
                          {formatDate(item.membershipStartDate)}-
                          {formatDate(item.membershipEndDate)}
                        </Text>
                        <Text style={styles.mediumText}>
                          {item.productName}
                        </Text>
                        {/* Add more details to display */}
                      </View>
                    </View>
                  );
                }}
              />
            ))}
          </View>
        </View>
      ) : null}
    </>
  );

  const GroupMember = () => {
    return (
      <>
        {!!groupExerciseMembership.length ? (
          <View style={[styles.gymView, { marginBottom: scale(75) }]}>
            <Text style={styles.heading}>
              {CONTEXT.group_exercise_membership}
            </Text>
            <View style={styles.memberView}>
              {groupExerciseMembership.map((membership, index) => (
                <FlatList
                  key={index} // Use index as key since membership id might not be unique across different memberships
                  data={membership.products}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.rowView}>
                        <FastImage
                          source={images.calendar_color}
                          style={styles.icon}
                        />
                        <View style={styles.textContainer}>
                          <Text style={styles.mediumText}>
                            {formatDate(item.membershipStartDate)}-
                            {formatDate(item.membershipEndDate)}
                          </Text>
                          <Text style={styles.mediumText}>
                            {item.productName}
                          </Text>
                          {/* Add more details to display */}
                        </View>
                      </View>
                    );
                  }}
                />
              ))}
            </View>
          </View>
        ) : null}
      </>
    );
  };

  const Button = () => (
    <View style={styles.buttonView}>
      <PrimaryButton
        title={CONTEXT.cancel}
        style={80}
        edit={true}
        color={true}
        onPress={() => setModalVisible(false)}
      />
      <PrimaryButton
        title={CONTEXT.request}
        style={80}
        edit={true}
        color={false}
        onPress={() => {
          setModalVisible(false);
          setModalNotice(true);
        }}
      />
    </View>
  );

  const modelView = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.crossimg}
            onPress={() => setModalVisible(false)}
          >
            <FastImage source={icons.CrossButton} style={styles.icon} />
          </TouchableOpacity>

          <Text style={styles.headingModel}>{CONTEXT.request_for_refund}</Text>
          <View style={styles.borderBottomView} />
          <FlatList
            data={refundProductList}
            renderItem={({ item }) => {
              const found = selectedRefundProduct.some(
                (val) => val?.id === item?.id
              );
              return (
                <TouchableOpacity
                  style={styles.checkView}
                  onPress={() => {
                    if (!found) {
                      setSelectedRefundProduct([
                        ...selectedRefundProduct,
                        item,
                      ]);
                    } else {
                      setSelectedRefundProduct((prev) =>
                        prev.filter((val) => val.id != item.id)
                      );
                    }
                  }}
                >
                  <Checkbox
                    isChecked={found}
                    onToggle={handleToggle2}
                    disabled={true}
                  />
                  <View>
                    <View style={styles.rowDirectionView}>
                      <FastImage
                        source={images.calendar_color}
                        style={styles.icon}
                      />
                      <Text style={styles.modalDate}>
                        {formatDate(item?.membershipStartDate)} -{" "}
                        {formatDate(item?.membershipEndDate)}
                      </Text>
                    </View>
                    <View style={styles.rowDirectionView}>
                      <Image source={images.SessionIcon} style={styles.icon} />
                      <Text style={styles.modalType}>{item?.productName}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          {Button()}
        </View>
      </View>
    </Modal>
  );

  const NoticeButton = () => (
    <View style={styles.buttonView}>
      <PrimaryButton
        title={CONTEXT.cancel}
        style={80}
        edit={true}
        color={true}
        onPress={() => setModalNotice(false)}
      />
      <PrimaryButton
        title={CONTEXT.confirm}
        style={80}
        edit={true}
        color={false}
        onPress={() => onRefundConfirm()}
      />
    </View>
  );

  const NoticeModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalNotice}
      onRequestClose={() => setModalNotice(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.crossimg}
            onPress={() => setModalNotice(false)}
          >
            <FastImage source={icons.CrossButton} style={styles.icon} />
          </TouchableOpacity>
          <Text
            style={[styles.headerText, { marginTop: 5, alignSelf: "center" }]}
          >
            {CONTEXT.notice_information}
          </Text>
          <View style={styles.borderBottomView} />

          <Text style={[styles.modalDate, { marginTop: scale(20) }]}>
            TheJal is not a direct party to the refund process;{" "}
          </Text>
          <Text style={styles.noteText}>
            It only provides a message forwarding function for delivering your
            refund request to the center. The following confirmation has been
            sent to the center's refund specialist, and the refund process is
            being conducted in accordance with the contract terms. If you do not
            receive a response from the center within 1-3 business days, please
            consider making a follow-up request or contacting the center
            directly.
          </Text>

          <View style={styles.borderBottomView} />
          <Text style={styles.noteText}>
            Please note that the responsible staff may be on extended leave or
            vacation, which could explain any potential delay.
          </Text>
          <View style={styles.rowDirectionView}>
            <RoundCheckbox
              isChecked={!reqFeedbackType}
              onToggle={() => setReqFeedbackType(0)}
              labelinfo="Cell phone"
            />
          </View>
          <View style={[styles.rowDirectionView, { marginTop: -3 }]}>
            <RoundCheckbox
              isChecked={!!reqFeedbackType}
              onToggle={() => setReqFeedbackType(1)}
              labelinfo="Off-line"
            />
          </View>
          {NoticeButton()}
        </View>
      </View>
    </Modal>
  );

  const PauseButton = () => (
    <View style={styles.buttonView}>
      <PrimaryButton
        title={CONTEXT.cancel}
        style={80}
        edit={true}
        color={true}
        onPress={() => setModalPause(false)}
      />
      <PrimaryButton
        title={CONTEXT.confirm}
        style={80}
        edit={true}
        color={false}
        onPress={() => onPauseConfirm()}
      />
    </View>
  );

  const PauseModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalPause}
      onRequestClose={() => setModalPause(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.crossimg}
            onPress={() => setModalPause(false)}
          >
            <FastImage source={icons.CrossButton} style={styles.icon} />
          </TouchableOpacity>

          <Text
            style={[styles.headerText, { marginTop: 5, alignSelf: "center" }]}
          >
            {CONTEXT.request_for_holding}
          </Text>
          <View style={styles.borderBottomView} />

          <Text style={[styles.modalDate, { marginTop: scale(20) }]}>
            The length of a membership pause is defined by the contract's
            allotted number of pauses and the maximum days permitted for each
            pause. For optimal processing, it is recommended to request a pause
            via the gym's personnel. The gym staff will subsequently contact
            you. Kindly specify the desired duration of the pause below.
          </Text>

          <View style={styles.rowDirectionView}>
            <View style={[styles.rowDirectionView, { marginRight: 35 }]}>
              <Image source={icons.one_touch} style={styles.imagehold} />
              <Text style={styles.modalDate}>
                {" "}
                {pauseDetails?.remainingHoldings} holding left
              </Text>
            </View>
            <View style={styles.rowDirectionView}>
              <FastImage
                source={images.calendar_color}
                style={styles.imagehold}
              />
              <Text style={styles.modalDate}>
                {" "}
                {pauseDetails?.maximumHoldingDays} days
              </Text>
            </View>
          </View>

          <View style={[styles.borderBottomView, { marginBottom: 15 }]} />
          <Text style={[styles.headingModel, { alignSelf: "flex-start" }]}>
            Reason for holding
          </Text>
          <View style={styles.rowDirectionView}>
            <RoundCheckbox
              isChecked={reason?.id === 1}
              onToggle={handleToggleRadio}
              labelinfo="Health-related"
            />
          </View>
          <View style={[styles.rowDirectionView, { marginTop: -3 }]}>
            <RoundCheckbox
              isChecked={reason?.id === 2}
              onToggle={handleToggle2}
              labelinfo="Work-related"
            />
          </View>
          <View style={[styles.rowDirectionView, { marginTop: -3 }]}>
            <RoundCheckbox
              isChecked={reason?.id === 3}
              onToggle={handleToggleRadio3}
              labelinfo="Travel or other"
            />
          </View>
          <View style={[styles.rowDirectionView, { marginTop: -3 }]}>
            <RoundCheckbox
              isChecked={reason?.id === 4}
              onToggle={handleToggleRadio4}
              labelinfo="Other"
            />
          </View>
          {reason?.id === 4 ? (
            <View style={styles.searchView}>
              <TextInput
                placeholder="Reason for holding"
                placeholderTextColor={COLORS.white}
                style={styles.modalDate}
                onChangeText={(text) => setReasonOtherText(text)}
              />
            </View>
          ) : null}
          {PauseButton()}
        </View>
      </View>
    </Modal>
  );

  const renderTrainers = ({ item, drag, isActive, index }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          onPress={() => {
            console.log("THis is all data", JSON.stringify(dataAll));
            setDataAll((prev) => {
              const newArray = [];
              // prev.map((val) => {
              //   if (val.key === item.key) {
              //     setTrainerRank((prev) => {
              //       return !val.isSelected ? prev + 1 : prev - 1;
              //     });
              //     const obj = {
              //       ...val,
              //       isSelected: !val.isSelected,
              //       trainerRank: !val.isSelected
              //         ? trainerRank + 1
              //         : 0,
              //     };
              //     newArray.push(obj);
              //   } else {
              //     newArray.push(val);
              //   }
              // });

              prev.map((val) => {
                if (val.key === item.key) {
                  setTrainerRank((prev) => {
                    return !val.isSelected ? prev + 1 : prev;
                  });
                  const obj = {
                    ...val,
                    isSelected: true,
                    trainerRank: !val.isSelected
                      ? trainerRank + 1
                      : val.trainerRank,
                  };
                  newArray.push(obj);
                } else {
                  newArray.push(val);
                }
              });
              return newArray;
            });
          }}
          style={styles.rowItem}
        >
          <FastImage
            source={item?.isSelected ? icons.RadioOn : icons.RadioOff}
            style={{ width: 15, height: 15 }}
          />
          <Text style={styles.label}>
            {`${item?.gymStaffName}${
              item?.trainerRank ? " - " + item?.trainerRank : ""
            }`}
          </Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  const renderSelectedTrainers = ({ item, index }) => {
    const isChecked = true;
    return (
      <TouchableOpacity onPress={() => {}} style={styles.rowItem}>
        <FastImage source={icons.RadioOn} style={{ width: 15, height: 15 }} />
        <Text style={styles.label}>{item?.gymStaffName}</Text>
      </TouchableOpacity>
    );
  };

  const ChangeTrainerModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openChangeTrainerModal}
      onRequestClose={() => {
        setOpenChangeTrainerModal(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.crossimg}
            onPress={() => {
              setOpenChangeTrainerModal(false);
              setTrainerRank(0);
            }}
          >
            <FastImage source={icons.CrossButton} style={styles.icon} />
          </TouchableOpacity>
          <Text
            style={[styles.headerText, { marginTop: 5, alignSelf: "center" }]}
          >
            {CONTEXT.request_for_changing_trainer}
          </Text>
          <View style={styles.borderBottomView} />
          <Text style={[styles.modalDate, { marginTop: scale(20) }]}>
            You are requesting a change of the assigned trainer.
          </Text>
          <Text style={[styles.modalDate, { marginTop: scale(20) }]}>
            The trainer change request message will be forwarded to the center
            and the trainer.
          </Text>
          <View style={[styles.borderBottomView, { marginVertical: 15 }]} />
          <DraggableFlatList
            data={dataAll}
            onDragEnd={({ data }) => {
              setDataAll(data);
            }}
            keyExtractor={(item) => item.key}
            renderItem={renderTrainers}
          />

          <View style={styles.buttonView}>
            <PrimaryButton
              title={CONTEXT.cancel}
              style={80}
              edit={true}
              color={true}
              onPress={() => {
                setOpenChangeTrainerModal(false);
                setTrainerRank(0);
              }}
            />
            <PrimaryButton
              title={CONTEXT.request}
              style={80}
              edit={true}
              color={!trainerRank ? true : false}
              onPress={() => onRequestChangeTrainer()}
              disabled={!selectedTrainer.length}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  const ChangeTrainerNoticeInfoModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openNoticeInfoModal}
      onRequestClose={() => setOpenNoticeInfoModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.crossimg}
            onPress={() => {
              setOpenNoticeInfoModal(false);
            }}
          >
            <FastImage source={icons.CrossButton} style={styles.icon} />
          </TouchableOpacity>

          <Text
            style={[styles.headerText, { marginTop: 5, alignSelf: "center" }]}
          >
            {CONTEXT.notice_information}
          </Text>
          <View style={styles.borderBottomView} />

          <Text style={[styles.modalDate, { marginTop: scale(20) }]}>
            The change of the assigned trainer will not take effect immediately.
            Upon forwarding your message to the current assigned trainer,
            {`${trainerName ? trainerName?.gymStaffName : "{$trainerName}"}`},
            and the gym, they will engage in a consultation with you. They will
            then proceed to check the schedule and availability of the requested
            trainer and initiate the change accordingly
          </Text>

          <FlatList
            data={selectedTrainer}
            keyExtractor={(item) => item.key}
            renderItem={renderSelectedTrainers}
          />

          <View style={styles.buttonView}>
            <PrimaryButton
              title={CONTEXT.cancel}
              style={80}
              edit={true}
              color={true}
              onPress={() => setOpenNoticeInfoModal(false)}
            />
            <PrimaryButton
              title={CONTEXT.confirm}
              style={80}
              edit={true}
              color={false}
              onPress={() => onChangeTrainerConfirm()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  const TrainerButton = () => (
    <View style={styles.buttonView}>
      <PrimaryButton
        title={CONTEXT.cancel}
        style={80}
        edit={true}
        color={true}
        onPress={() => setModalTrainer(false)}
      />
      <PrimaryButton
        title={CONTEXT.request}
        style={80}
        edit={true}
        color={false}
        onPress={() => {
          setModalTrainer(false);
          setModalTrainerNotice(true);
        }}
      />
    </View>
  );

  const TrainerModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalTrainer}
      onRequestClose={() => setModalTrainer(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.crossimg}
            onPress={() => setModalTrainer(false)}
          >
            <FastImage source={icons.CrossButton} style={styles.icon} />
          </TouchableOpacity>
          <Text
            style={[styles.headerText, { marginTop: 5, alignSelf: "center" }]}
          >
            Request for Changing Trainer
          </Text>
          <View style={styles.borderBottomView} />
          <Text style={[styles.modalDate, { marginTop: scale(20) }]}>
            You are requesting a change of the assigned trainer.
          </Text>
          <Text style={[styles.modalDate, { marginVertical: scale(10) }]}>
            The trainer change request message will be forwarded to the center
            and the trainer.
          </Text>
          <View style={[styles.borderBottomView]} />
          <View style={styles.rowDirectionView}>
            <RoundCheckbox
              isChecked={isCheckedRadio}
              onToggle={handleToggleRadio}
              labelinfo="1. Robert"
            />
          </View>
          <View style={[styles.rowDirectionView, { marginTop: -5 }]}>
            <RoundCheckbox
              isChecked={isChecked2}
              onToggle={handleToggle2}
              labelinfo="2. Cindy"
            />
          </View>
          <View style={[styles.rowDirectionView, { marginTop: -5 }]}>
            <RoundCheckbox
              isChecked={isCheckedRadio3}
              onToggle={handleToggleRadio3}
              labelinfo="3. Jackson"
            />
          </View>

          {TrainerButton()}
        </View>
      </View>
    </Modal>
  );

  const TrainerNoticeButton = () => (
    <View style={styles.buttonView}>
      <PrimaryButton
        title={CONTEXT.cancel}
        style={80}
        edit={true}
        color={true}
        onPress={() => setModalTrainerNotice(false)}
      />
      <PrimaryButton
        title={CONTEXT.confirm}
        style={80}
        edit={true}
        color={false}
        onPress={() => setModalTrainerNotice(false)}
      />
    </View>
  );

  const TrainerNoticeModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalTrainerNotice}
      onRequestClose={() => setModalTrainerNotice(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.crossimg}
            onPress={() => setModalTrainerNotice(false)}
          >
            <FastImage source={icons.CrossButton} style={styles.icon} />
          </TouchableOpacity>

          <Text style={[styles.headingModel, { marginTop: 5 }]}>
            {CONTEXT.notice_information}
          </Text>
          <View style={styles.borderBottomView} />

          <Text style={[styles.modalDate, { marginVertical: scale(10) }]}>
            The change of the assigned trainer will not take effect immediately.
            Upon forwarding your message to the current assigned trainer, and
            the gym, they will engage in a consultation with you. They will then
            proceed to check the schedule and availability of the requested
            trainer and initiate the change accordingly.
          </Text>

          <View style={styles.rowDirectionView}>
            <RoundCheckbox
              isChecked={isCheckedRadio}
              onToggle={handleToggleRadio}
              labelinfo="1. Robert"
            />
          </View>
          <View style={[styles.rowDirectionView, { marginTop: -5 }]}>
            <RoundCheckbox
              isChecked={isChecked2}
              onToggle={handleToggle2}
              labelinfo="2. Cindy"
            />
          </View>
          <View style={[styles.rowDirectionView, { marginTop: -5 }]}>
            <RoundCheckbox
              isChecked={isCheckedRadio3}
              onToggle={handleToggleRadio3}
              labelinfo="3. Jackson"
            />
          </View>
          {TrainerNoticeButton()}
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {Header()}
      <ScrollView
        style={{ flex: 1, marginBottom: verticalScale(60) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContainer}>
          {NoticeModal()}
          {PauseModal()}
          {TrainerModal()}
          {TrainerNoticeModal()}
          {ChangeTrainerModal()}
          {ChangeTrainerNoticeInfoModal()}
          {GymMember()}
          {PtSessionIcon()}
          {GolfMember()}
          {GroupMember()}
          {modelView()}
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MemberMyInformation;
