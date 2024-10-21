import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './authSlice';
import authSlice from "./authSlice";
import gymSlice from "./gymSlice";
import dietCreateSlice from "./dietCreateSlice";
import getDietSlice from "./getDietSlice";
import workoutSlice from "./workoutSlice";
import getTrainerDetailSlice from "./getTrainerDetailSlice";
import getDietIdSlice from "./getDietIdSlice";
import dietUpdateSlice from "./dietUpdateSlice";
import getExerciseSlice from "./getExerciseSlice";
import memberWorkoutCreateSlice from "./memberWorkoutCreateSlice";
import numSetsSlice from "./numSetsSlice";
import memberSummarySlice from "./memberSummarySlice";
import memberDetailSlice from "./memberDetailSlice";
import memberShareTrainerSlice from "./memberShareTrainerSlice";
import getProfileSlice from "./getProfileSlice";
import profileUpdateSlice from "./profileUpdateSlice";
import getGoalSlice from "./getGoalSlice";
import goalUpdateSlice from "./goalUpdateSlice";
import getGraphDataSlice from "./getGraphDataSlice";
import getBodySlice from "./getBodySlice";
import updateBodySlice from "./updateBodySlice";
import preferredExerciseUpdateSlice from "./preferredExerciseUpdateSlice";
import preferredExerciseSlice from "./preferredExerciseSlice";
import getItemSlice from "./getItemSlice";
import shareDietSlice from "./shareDietSlice";
import createBodySlice from "./createBodySlice";
import geTrainerMonthSlice from "./geTrainerMonthSlice";
import getMemberStatisticsGraphSlice from "./getMemberStatisticsGraphSlice";
import getMemberStatisticsListSlice from "./getMemberStatisticsListSlice";
import geNotificationsListSlice from "./geNotificationsListSlice";
import trainerWorkoutCreateSlice from "./trainerWorkoutCreateSlice";
import choiceWindowSlice from "./choiceWindowSlice";
import showDiscardModalSlice from "./showDiscardModalSlice";
import refreshSlice from "./refreshSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    gym: gymSlice,
    dietCreate: dietCreateSlice,
    dietList: getDietSlice,
    work: workoutSlice,
    trainerDetail: getTrainerDetailSlice,
    diet: getDietIdSlice,
    dietUpdate: dietUpdateSlice,
    exercise: getExerciseSlice,
    memberWorkoutCreate: memberWorkoutCreateSlice,
    numSets: numSetsSlice,
    memberSummary: memberSummarySlice,
    memberDetail: memberDetailSlice,
    memberToShare: memberShareTrainerSlice,
    profile: getProfileSlice,
    profileUpdate: profileUpdateSlice,
    goal: getGoalSlice,
    goalUpdate: goalUpdateSlice,
    graphList: getGraphDataSlice,
    getBody: getBodySlice,
    bodyUpdate: updateBodySlice,
    preferredUpdate: preferredExerciseUpdateSlice,
    preferredExercise: preferredExerciseSlice,
    item: getItemSlice,
    shareDiet: shareDietSlice,
    bodyCreate: createBodySlice,
    trainerMonth: geTrainerMonthSlice,
    getMemberStatisticsGraph: getMemberStatisticsGraphSlice,
    getMemberStatisticsList: getMemberStatisticsListSlice,
    geNotificationsList: geNotificationsListSlice,
    trainerWorkoutCreate:trainerWorkoutCreateSlice,
    choiceWindowSlice,
    showDiscardModalSlice,
    refresh: refreshSlice
  },
});

export default store;
