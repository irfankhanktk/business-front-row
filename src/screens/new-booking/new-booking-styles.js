import { StyleSheet } from 'react-native';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';

export const Styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingHorizontal: mvs(25),
    paddingTop: mvs(15),
  },
  phoneContainer: {
    flex: 1,
    height: mvs(56),
    alignItems: 'center',
  },
  textInput: {
    paddingVertical: 0,
    borderLeftWidth: 0.3,
    borderLeftColor: colors.gray,
    paddingLeft: mvs(10),
    backgroundColor: colors.white,
    height: mvs(50),

  },
  phoneNumberView: {
    backgroundColor: colors.white,
    width: '100%',
    padding: 0,
    borderRadius: mvs(10),
    paddingHorizontal: mvs(15),
    color: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: mvs(65),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.gray,
    // ...colors.shadow,

  },
  button: {
    marginTop: mvs(20),
    height: mvs(60),
    marginBottom: mvs(40)
  },
  whiteButton: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1.2,
    marginTop: mvs(15),
    marginBottom: mvs(40)
  },
  buttonWhiteText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonBlackText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonPrimaryText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold'
  },
  warningText: {
    paddingRight: mvs(18),
    paddingLeft: mvs(10),
    paddingVertical: mvs(6),
    fontStyle: 'italic'
  }
});
