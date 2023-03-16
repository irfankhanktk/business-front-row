import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";

export const Signin_Styles = StyleSheet.create({
    container:{
       flex:1,
      backgroundColor:colors.white,
    },
    body:{
        flex:1,
        paddingHorizontal:mvs(22),
        paddingTop:mvs(25),
    },
    logo:{
        alignSelf:'center'
    },
    tabView:{
        alignSelf:'center',
        width:'95%',
        backgroundColor:colors.gray,
        height:mvs(40),
        borderRadius:15,
        flexDirection:'row',
        top:mvs(30),
        alignItems:'center'
    },
    selectedTabButton:{
        backgroundColor:colors.primary,
        width:'50%',
        borderRadius:15,
        height:mvs(40)
    },
    unSelectedTabButton:{
        backgroundColor:colors.gray,
        width:'50%',
        borderRadius:15,
        height:mvs(40)
    },
    selectedTabButtonText:{
        color:colors.white,
        fontSize:18,
        fontWeight:'bold'
    },
    unSelectedTabButtonText:{
        color:colors.black,
        fontSize:18,
        fontWeight:'bold'
    },
    welcomeText:{
     fontSize:20,
     alignSelf:'center',
     marginTop:mvs(100),
     color:colors.black
    },
    welcomeSubText:{
        fontSize:18,
        alignSelf:'center',
        marginTop:mvs(2),
        color:colors.lightgrey1,
        textAlign:'center'
    },
    input_container:{
        marginTop:mvs(18.5),
    },
    button:{
        marginTop:mvs(12),
        height:mvs(60)
    },
    buttonText:{
     color:colors.black,
     fontSize:18,
     fontWeight:'bold'
    },
    register:{
        marginTop:mvs(30),
        alignSelf:'center',
    },
    forgotText:{
        color:colors.black,
        fontSize:18,
        alignSelf:'center',
        top:mvs(10)
    },
    continueWithText:{
        marginTop:mvs(17),
        alignSelf:'center'
    },
    socialIconView:{
        backgroundColor:colors.white,
        borderRadius:10,
        borderWidth:1,
        borderColor:colors.gray,
        height:mvs(51),
        marginTop:mvs(10),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        shadowColor:colors.shadow
    },
    socialIconText:{
        marginLeft:mvs(5)
    },
    frontRowText:{
        alignSelf:'center',
        color:colors.primary,
        fontSize:26
    },
    phoneContainer: {
        flex:1,
        height: 50,
        alignItems:'center'
     },
      textInput: {
        paddingVertical: 0,
        borderLeftWidth:1.3,
        borderLeftColor:colors.gray,
        paddingLeft:mvs(10),
        backgroundColor:colors.white,
        height:mvs(45)
      },
      phoneNumberView:{
        backgroundColor: colors.white,
        width: '100%',
        padding: 0,
        borderRadius: mvs(10),
        paddingHorizontal: mvs(15),
        color: colors.primary,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:mvs(60),
        borderRadius:10,
        borderWidth:1,
        borderColor:colors.gray,
        ...colors.shadow
      }
});