import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { ms, mvs } from "../../services/metrices";

export const Personal_Details_Styles = StyleSheet.create({
    container:{
       flex:1,
      backgroundColor:colors.white,
      paddingTop:mvs(10)
    },
    body:{
        flex:1,
        paddingHorizontal:mvs(22),
        paddingTop:mvs(25),
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
        marginTop:mvs(40),
        height:mvs(60)
    },
    buttonText:{
     color:colors.black,
     fontSize:18,
     fontWeight:'bold'
    },
    profileImage:{
        alignSelf:'center',
        borderRadius:60,
        height:'100%',
        width:'100%'
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
      }
    
    
});