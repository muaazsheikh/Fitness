import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";

import styles from "./Style";
import _ from "lodash";
import { images } from "../../workout/constant";
import TrainerHeader from "../component/header";
import { PrimaryButton } from "../../../components";
import { CONTEXT } from "../../home/constant/theme";
import { useFocusEffect } from "@react-navigation/native";
import SwipeImage from "../component/swiperImage";
import getCenterEventApi from "../../../api/profile/getCenterEvent";
import HeaderComponent from "../component/HeaderComponent";

const MemberCenterEvents = ({ navigation }) => {
  const [centerBulletin, setCenterBulletin] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          const response = await getCenterEventApi();
          setCenterBulletin(response?.data?.eventList);
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      }
      fetchMyAPI();
      return () => {};
    }, [])
  );

  const Header = () => (
    <HeaderComponent
      title={CONTEXT.memberEvent}
      onBackPress={() => navigation.goBack()}
    />
  );

  const Container = () => (
    <View>
      <View style={{ flex: 1 }}>
        {centerBulletin.map((data, index) => (
          <SwipeImage key={index} data={data} />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {Container()}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MemberCenterEvents;
