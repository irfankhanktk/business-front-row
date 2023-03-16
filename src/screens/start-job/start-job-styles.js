import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { ms, mvs } from "../../services/metrices";

export const Styles = StyleSheet.create({
    container:{
       flex:1,
      backgroundColor:colors.white,
      paddingTop:mvs(10)
    },
    body:{
        flex:1,
        paddingHorizontal:mvs(6),
        paddingTop:mvs(10),
    },
    welcomeText:{
     fontSize:20,
     marginTop:mvs(0),
     color:colors.black
    },
    welcomeSubText:{
     fontSize:15
    },
    input_container:{
        marginTop:mvs(18.5),
    },
    button:{
        marginTop:mvs(20),
        height:mvs(60)
    },
    whiteButton:{
      backgroundColor:colors.white,
      borderColor:colors.primary,
      borderWidth:1.2,
      marginTop:mvs(15)
    },
    buttonWhiteText:{
     color:colors.white,
     fontSize:18,
     fontWeight:'bold'
    },
    buttonBlackText:{
      color:colors.black,
      fontSize:18,
      fontWeight:'bold'
     },
    profileImage:{
        alignSelf:'center',
        borderRadius:10000,
        height:mvs(60),
        width:mvs(60)
    },
    imageView:{
        alignSelf:'center',
        height:mvs(80),
        width:mvs(80),
        borderRadius:1000,
        backgroundColor:colors.lightgrey2,
        justifyContent:'center',
        alignItems:'center',
    },
    cameraStyle:{
     bottom:mvs(55),
     position:'absolute',
     alignSelf:"flex-end"
    }
    ,
    phoneContainer: {
        flex:1,
        height: 50,
     },
      textInput: {
        paddingVertical: 0,
        borderLeftWidth:2.5,
        borderLeftColor:colors.gray,
        paddingLeft:mvs(10)
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
      },
    IMAGE:{
       height:mvs(60),
       width:mvs(60),
       borderRadius:mvs(1000)
    },
    BOTTOMIMG:{
        height:mvs(49),
        width:mvs(52),
        borderRadius:mvs(10)
     },
    UPPERROW:{
        justifyContent:'space-between',
        alignItems:'center'
    },
    
    SUBIMAGE:{
        height:mvs(41),
        width:mvs(41),
        borderRadius:1000
     },
     BUTTON:{
        backgroundColor:colors.lightGreen,
        marginVertical:mvs(12)
     },
     BUTTONTEXT:{
         color:colors.green,
     },
     TIMETOPVIEW:{
        paddingVertical:mvs(14.5),
        paddingHorizontal:mvs(16),
        borderBottomColor:colors.gray,
        borderBottomWidth:1
     },
     PROGRESSTEXT:{
        color:colors.black,
        fontWeight:'bold',
        fontSize:10,
      
    },
    voucherView:{
        backgroundColor:colors.primary,
        borderRadius:8,
        justifyContent:'space-evenly',
        height:mvs(25),
        width:mvs(156),
        alignItems:'center',
        padding:mvs(1),
        top:mvs(5)
      },
      paymentView:{
        paddingVertical:mvs(16),
        paddingHorizontal:mvs(3)
      },
      priceView:{
        justifyContent:'space-between',
        marginTop:mvs(14)
      },
      paymentReferenceView:{
        paddingHorizontal:0,
        borderBottomWidth:1,
        borderColor:colors.gray,
        paddingBottom:10
      },
      refernceTextBox:{
        width:mvs(100),
        borderWidth:1,
        borderColor:colors.gray,
        height:mvs(33),fontSize:10,
        justifyContent:'center'
      },
      bottomBorder:{
       paddingVertical:mvs(14.5),
       borderBottomColor:colors.gray,
       borderBottomWidth:1
      },
      warningText:{
        paddingRight:mvs(11),
        paddingLeft:mvs(5),
        paddingVertical:mvs(6),
        fontStyle: 'italic'
    }
});