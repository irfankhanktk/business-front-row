import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { ms, mvs } from "../../services/metrices";

export const Vehicle_Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: mvs(10),
  },
  body: {
    flex: 1,
    paddingHorizontal: mvs(18),
    paddingTop: mvs(25),
  },
  welcomeText: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: mvs(10),
    color: colors.black,
  },
  welcomeSubText: {
    fontSize: 18,
    alignSelf: "center",
    marginTop: mvs(2),
    color: colors.lightgrey1,
    textAlign: "center",
  },
  input_container: {
    marginTop: mvs(9),
  },
  button: {
    marginTop: mvs(40),
    height: mvs(60),
    marginVertical: mvs(20),
  },
  buttonText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "bold",
  },
  profileImage: {
    alignSelf: "center",
    borderRadius: 10000,
    height: mvs(60),
    width: mvs(60),
  },
  imageView: {
    alignSelf: "center",
    height: mvs(90),
    width: mvs(90),
    borderRadius: 1000,
    backgroundColor: colors.lightgrey2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: mvs(30),
  },
  cameraStyle: {
    bottom: mvs(65),
    position: "absolute",
    alignSelf: "flex-end",
  },
});
