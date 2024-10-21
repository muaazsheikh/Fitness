import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#FF002E", // Red
  white: "#fff",
  lightWhite: "#ACACAC",
  red: "#FF5C5C",
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
  transparent: "transparent",
  ligtRed: "#FF7070",
  mediumGrey: "#6B6B6B",
  chatGray: "#616161",
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
  loginTitle: "Login to your\n     Account",
  forgotPasswordText: "Forgot Password?",
  signInButtonText: "Log in",
  SeperatorText: "or continue with",
  signUpQuestionText: "Don't Have An Account ?",
  signUpButtonText: "Sign Up",
  titleText: "Choose Account Type",
  next: "Next",
  traineelog: "Trainer Login",
  trainer: "Trainer",
  member: "Member",
  accountTitle: "Choose Account Type",
  multiplegym: "Found at multiple gyms",
  welcomeTitle: "Let’s improve\nyour workout!",
  socialText: "Login with",
  or: "or",
  signEmail: "Sign in with email",
  login: "Login",
  signup: "Sign Up",
  sign: "Sign",
  send: "Send",
  verify: "Verify",
  email: "Email",
  centerName: "Enter center's name",
  password: "Password",
  cpassword: "Confirm Password",
  signUpTitle: "Create account to\n    get start now!",
  forgetTitle: "Find account information",
  verifyTitle: "Verification code",
  haveAccount: " have an account?",
  forget: "Forgot Password?",
  continue: "or continue with",
  sendAgain: "Send again?",
  sentmail: "We have sent  you email. ",
  splashTitle: "Workout That Get\n  Better As You do ",
  start: "Get Start",
  gymTitle: "Found at multiple gyms:",
  methewKim: "Mathew kim (F, 24(or bday))",
  session: "Session :",
  event: "Event description",
  search: "search",
  available: "Availability",
  RecentlySearched: "Recently Searched",
  SearchTrain: "Search trainee",
  ReserveRequest: "Reservation Request",
  ReserveSchedule: "Session Reservation Scheduled",
  reasonReject: "Reason for rejection written",
  ReserveCancel: "Reservation Cancellation Request",
  reject: "Reject",
  session_data: "Session",
  confirm: " Confirm",
  cancelled: "Cancelled",
  receivecode: "Did you received any code?",
  name: "Name",
  confirmed: " Confirmed",
  deleted: " Deleted",
  reservation_status: "Reservation Status",
  my_item: "My items",
  gym_membership: "Gym Membership",
  pt_sessions: "PT Sessions",
  golf_membership: "Golf Membership",
  group_exercise_membership: "Group Exercise Membership",
  request_for_refund: "Request for Refund",
  request: "Request",
  cancel: "Cancel",
  notice_information: "Notice information",
  request_for_holding: "Request for Holding",
  request_for_changing_trainer: "Request for Changing Trainer",
  trainer: "Trainer",
  member: "Member",
  gym_login: "Gym Login",
  view: "View",
  workout_sign:
    "Your workout log has arrived \n Please sign to view the trainer's feedback.",
  workout_available: "There is no workout log available.",
  workout_placeholder: "Would you like to record one?",
  workout_log: "Workout log",
  diet_log: "Diet log",
  name: "Name",
  diet_placeholder: "There is no diet log available. ",
  kg: "Kg",
  reps: "reps",
  upload: "Upload media files",
  date: "Date",
  time: "Time",
  rating: "Rating",
  session: "Session",
  pending: "Pending",
  workout_need: "Workout log needs to be filled out.",
  shared: "Shared",
  centerIntro: "Center Introduction",
  ptIntro: "PT Trainer Introduction",
  address: "Address",
  operatingHrs: "Operating Hours:",
  holiday: "Holidays:",
  insta: "Instagram:",
  parkingSupport: "Parking Support:",
  showerFacility: "Shower Facility:",
  staff: "Staff:",
  typeExercise: "Types of Exercises:",
  male: "Male",
  female: "Female",
  establishDate: "Establishment Date:",
  ceo: "CEO:",
  memberBulletin: "Center  Bulletin Board",
  memberEvent: "Events",
  memberNotice: "Notice Board",
  memberFeedback: "Provide Feedback to the Center",
  feedbackCenter: "Feedback to the Center",
  memberEquip: "Equipment Details",
  gymInfo: "Gym info",
  yrs: "yrs",
  ptMember: "PT Member’s",
  experience: "Experience",
  career: "Career and Qualifications:",
  trainerApproach: "Trainer's Approach:",
  available: "Available Session Hours:",
  exercise: "Exercise",
  total: "Total",
  sets: "Sets",
  pt_sess: "PT session logs",
  individual: "Individual exercise logs",
  add: "Add",
  addInfo: "Add Information",
  available_session: "Available Session Times",
  session_method: "Session Coaching Method",
  reservation_repeat: "Reservation Repeats on:",
  service_Intro: "Service Introduction",
  app_version: "App Version",
  more_news: "More News",
  contact_more: "Contact More Thejal",
  thejal_news: "Thejal News",
  version: "Version",
  business_reg: "Business Registration No:",
  hosting: "Hosting Service: - -",
  company_name: "Company Name:",
  online_sales: "Online Sales Business Registration No:",
  last_updated: "Last updated on ",
  cancel_booked_session: "Cancel a booked session",
  cancel_booked_warning:
    "You must first obtain the member's consent and \ncontact them before proceeding with the \ncancellation. A notification of the cancellation will \nbe sent to the center.",
  warning: "Warning",
  reviewSubmitted: "Review Submitted",
  thanksForFeedback: "Thank you for feedback",
  noEventsToday: "No events today",
  deleteExercise: "Delete exercise",
  comment: "Comment",
  youCan:
    "You can use this service if your center utilizes Thejal. If there is a delay in processing at the center, the guidance message may be delayed.",
  ifYour:
    "If your center is not yet using Thejal, please enter the following information, and we will request the center owner to start using Thejal.",
  recentSession: "Recent Session",
  extras: "Extras",
  noShows: "No-Shows",
  performanceEvalu: "Performance evaluation scores",
  sessionHistory: "Session History",
  memberSignReq: "Member's sign required for workout log",
  writeLog: "Write Log",
  trainerNotes: "Trainer's Notes",
  contactToThejal: "Contact to Thejal",
  close: "Close",
  uploadPhoto: "Upload Photo",
};

const appTheme = { COLORS, SIZES, FONTS, CONTEXT };

export default appTheme;
