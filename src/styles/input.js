/**
 * @providesModule ButtonStyles
 */
import { StyleSheet } from 'react-native';
import colors from '../services/colors';
import fonts from '../services/fonts';
import {
  mvs
} from '../services/metrices';

export const INPUT_STYLES = StyleSheet.create({
  LABLE_STYLE: {
    fontSize: mvs(15),
    color: colors.text,
  },
  INPUT_TXT: {
    color: colors.primary,
    paddingLeft: 0,
    fontSize: mvs(15),
    fontFamily: fonts.carosSoftRegular,
    marginBottom: mvs(15),
    borderColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,

  },

  SECONDARY_INPUT: {
    backgroundColor: colors.white,
    width: '100%',
    padding: 0,
    borderRadius: mvs(10),
    paddingHorizontal: mvs(10),
    color: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: mvs(60),
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: colors.gray,
    // ...colors.shadow

  },
  DROPDOWN_INPUT: {
    backgroundColor: colors.white,
    borderRadius: mvs(10),
    paddingHorizontal: mvs(10),
    color: colors.primary,
    height: mvs(45),
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.gray,
    borderWidth: 0.5,
    // ...colors.shadow
  },
  CUSTOM_DROPDOWN: {
    height: mvs(70),
    padding: mvs(10),
    paddingHorizontal: mvs(20),
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: mvs(20)
  },
  TXTINPUT: {
    fontSize: 17
  },
  SEND_CODE: { position: 'absolute', right: mvs(0), top: mvs(10), color: colors.primary, textDecorationLine: 'underline', fontSize: mvs(13) },
  REVIEW_CONTAINER: {
    padding: mvs(20),
    backgroundColor: colors.secondary,
    borderRadius: mvs(15),
    minHeight: mvs(100)
  },
  REVIEW_LABEL_CONTAINER: {
    backgroundColor: colors.white,
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: mvs(12),
    paddingHorizontal: mvs(35),
    paddingVertical: mvs(6),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
  ,
  dropdown1BtnStyle: {
    height: mvs(30),
    backgroundColor: colors.white,
    width: '100%',
  },
  dropdown1BtnTxtStyle: { color: colors.black, textAlign: 'left', fontWeight: 'bold' },
  dropdown1DropdownStyle: { backgroundColor: colors.white, width: '73%' },
  dropdown1RowStyle: { backgroundColor: colors.white, borderBottomColor: colors.black, width: '100%' },
  dropdown1RowTxtStyle: { color: colors.black, textAlign: 'left' },
  // INPUT_CONTAINER: {
  //     // padding:0,
  //     height:mvs(55),
  //     backgroundColor:'gray',
  //     // marginBottom: scale(15),
  //     borderBottomWidth: StyleSheet.hairlineWidth,
  //     borderColor:colors.border,
  //     borderWidth:1
  // },
});
