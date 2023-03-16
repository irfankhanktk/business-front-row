/**
* @providesModule ButtonStyles
*/
import { StyleSheet } from 'react-native';
import colors from './colors';
import { mvs } from './metrices';


export const buttonStyles = StyleSheet.create({
  buttonPrimary: {
    height: mvs(60),
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:colors.primary,
    borderRadius: mvs(10),
    width:'100%',
    flexDirection:'row'
  },
  buttonSecondary: {
    height: mvs(60),
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:colors.white,
    borderRadius: mvs(10),
    borderWidth:0.5,
    // ...colors.shadow,
    borderColor:colors.border,
    width:'100%'
  },
  buttonButton: {
    // height: mvs(60),
    // alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    paddingRight:mvs(10),
    backgroundColor:colors.white,
    borderBottomWidth:0.5,
    borderColor:colors.GD8D8D8,
    paddingVertical:mvs(10),
    marginBottom:mvs(10),
    width:'100%'
  },
  plus_button: {
    position: 'absolute',
    bottom: mvs(20),
    right: mvs(20),
    width: mvs(50),
    height: mvs(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: mvs(25),
    backgroundColor: colors.primary,
  },
 
});

export default buttonStyles