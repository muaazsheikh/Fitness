import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#FF002E", // Red
  white: "#fff",
  lightWhite: "#ACACAC",
  red: "red",
  Lightred: "#FF7C7C",
  black: "#000000",
  blue: "#4096FE",
  lightBlue: "#253D91",
  gray: "#464646",
  gray1: "#363636",
  yellow: "#F6EB61",
  LightYellow: "#FFE486",
  Orange: "#D45700",
  LightOrange: "#FF8734",
  themGreen: "#CCFF00",
  lightGray: "#dedede",
  themeGray: "#1F2022",
  lightBlack: "#353638",
  transparentWhite: "rgba(255, 255, 255, 0.2)",
  transparentBlack: "rgba(0, 0, 0, 0.4)",
  borderColor: "#6E7781",
  calendarColor: "#2C2C2E",
  headerColor: "#323336",
  lightText: "#787878",
  placeholderColor: "#B6B6B6",
  transparent: "#1f2022",
  orangeLight: "#FFB0B0",
  lightGreen: "#00FAE0",
  purple: "#B3B1FF",
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: { fontFamily: "Roboto-Black", fontSize: SIZES.largeTitle },
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
  ARCHI_BOLD: "Archivo-Bold",
  ARCHI_BLACK: "Archivo-Black",
  ARCHI_LIGHT: "Archivo-Light",
  ARCHI_MEDIUM: "Archivo-Medium",
  ARCHI_REGULAR: "Archivo-Regular",
  ARCHI_SEMBOLD: "Archivo-SemiBold",
};
export const CONTEXT = {
  workout_available: "There is no workout log available.",
  workout_placeholder: "Would you like to record one?",
  workout_log: "Workout log",
  diet_log: "Diet log",
  name: "Name:",
  diet_placeholder: "There is no diet log available. ",
  kg: "Kg",
  reps: "reps",
  upload: "Upload media files",
  date: "Date",
  time: "Time",
  rating: "Rating",
  session: "Session",
  noComments: " No Comments Wriiten",
};

const appTheme = { COLORS, SIZES, FONTS, CONTEXT };

export default appTheme;
