import React from "react";
import { View, FlatList } from "react-native";
import { images } from "../../constant";
import styles from "./Style";
import DietList from "../TrainerDietListComponent";
import Seperator from "../../../../components/seperator";
import { CONTEXT } from "../../constant/theme";

const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}.${day}`;
};

const ImageContainer = (item, navigation, onChange) => (
  <DietList
    value={item?.value}
    imgUrl={item?.images?.original}
    type={item?.type}
    memberName={item?.memberDetails.name}
    navigation={navigation}
    sharedToTrainer={item?.sharedToTrainer}
    contentNote={item?.notes}
    dietLogDate={formattedDate(item?.dietLogDate)}
    meal={item?.meal}
    data={item}
    dietLogs={item?.dietLogs}
    id={item?.id}
    onChange={onChange}
  />
);

const Card = ({ item, navigation, onChange }) => {
  return (
    <View style={styles.card}>
      {ImageContainer(item, navigation, onChange)}
    </View>
  );
};

const TrainerUncompleteComponent = ({ data, navigation, onChange }) => {
  return (
    <View style={[styles.setList, { marginBottom: 0 }]}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 5, justifyContent: "center" }}>
            <Card onChange={onChange} item={item} navigation={navigation} />
          </View>
        )}
      />
    </View>
  );
};

export default TrainerUncompleteComponent;
