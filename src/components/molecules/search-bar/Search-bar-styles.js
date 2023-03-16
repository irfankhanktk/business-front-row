import { StyleSheet } from "react-native";
import colors from "../../../services/colors";
import { mvs } from "../../../services/metrices";

export const styles = StyleSheet.create({
    container:{
        // height:mvs(30),
        marginTop:mvs(30),
        marginHorizontal:mvs(22),
        borderRadius:mvs(10),
        paddingHorizontal:mvs(10),
        flexDirection:'row',
        alignItems:'center',
    },
    input:{
        width:'90%',
        color:colors.text,
        paddingLeft:mvs(12),
        paddingVertical:mvs(7),
    }
});