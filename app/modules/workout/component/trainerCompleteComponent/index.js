import React from "react";
import { View, FlatList } from "react-native";
import styles from "./Style";
import DietList from "../TrainerDietListComponent";
import Seperator from "../../../../components/seperator";
import { images } from "../../constant";
import { CONTEXT } from "../../constant/theme";

const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}.${day}`;
};
const ImageContainer = (item, navigation) => (
  <DietList
    value={item?.value}
    imgUrl={item?.images?.original}
    type={item?.type}
    memberName={item?.memberDetails?.name}
    trainerName={item?.trainerDetails?.name}
    navigation={navigation}
    sharedToTrainer={item?.sharedToTrainer}
    contentNote={item?.notes}
    dietLogDate={formattedDate(item?.dietLogDate)}
    meal={item?.meal}
    data={item}
    dietLogs={item?.dietLogs}
    trainer={true}
    id={item?.id}
  />
);

const Card = ({ item, navigation }) => {
  return <View style={styles.card}>{ImageContainer(item, navigation)}</View>;
};

const TrainerCompleteComponent = ({ data, navigation }) => {
  const handleShareToMember = (id) => {};
  return (
    <View style={styles.setList}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 5, justifyContent: "center" }}>
            <Card
              item={item}
              navigation={navigation}
              onShareToMember={handleShareToMember}
            />
          </View>
        )}
      />
    </View>
  );
};

export default TrainerCompleteComponent;
