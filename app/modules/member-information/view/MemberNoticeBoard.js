import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import styles from "./Style";
import _ from "lodash";
import { images } from "../../workout/constant";
import TrainerHeader from "../component/header";
import { PrimaryButton } from "../../../components";
import { CONTEXT } from "../../home/constant/theme";
import { useFocusEffect } from "@react-navigation/native";
import getCenterBulletinApi from "../../../api/profile/getCenterBulletin";
import SwipeImage from "../component/swiperImage";
import getNoticeBoardApi from "../../../api/profile/getNoticeBoard";
import Seperator from "../../../components/seperator";
import HeaderComponent from "../component/HeaderComponent";

const MemberNoticeBoard = ({ navigation }) => {
  const [centerBulletin, setCenterBulletin] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchMyAPI() {
        try {
          const response = await getNoticeBoardApi();
          setCenterBulletin(response?.data?.notice);
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
      title={CONTEXT.memberNotice}
      onBackPress={() => navigation.goBack()}
    />
  );

  const Container = () => (
    <View style={{ flex: 1 }}>
      {centerBulletin.map((data, index) => (
        <SwipeImage key={index} data={data} />
      ))}
      {!centerBulletin.length ? (
        <Seperator
          title={"No Data Available"}
          dimesion={150}
          // imageUrl={images.dish_placeholder}
        />
      ) : null}
    </View>
  );

  return (
    <View style={styles.newAccountContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        {Header()}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:100}}>
          {Container()}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MemberNoticeBoard;
