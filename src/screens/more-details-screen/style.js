import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";

export const STYLES = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
    },
    PROG_BOTTOM_TXT:{
        textAlign:'center',marginTop:mvs(5),fontSize:mvs(14),color:colors.G9EABBE
    },
    body:{
        flex:1,
    },
    scroll:{
        flexGrow:1,
        paddingTop:mvs(11),
        paddingBottom:mvs(30)
    },
    header:{ paddingHorizontal: mvs(20), paddingVertical: mvs(15), borderBottomWidth: 0.5, borderColor: colors.GD8D8D8, },
    graph_buttons:{height:mvs(45),width:'50%',justifyContent:'center',alignItems:'center',borderBottomWidth:mvs(1.5),},
    PROGRESSTEXT:{
        color:colors.black,
        fontWeight:'bold',
        fontSize:mvs(20),
      
    },
    PROG_CONTAINER:{ width: mvs(75) },
    item:{
        marginBottom:mvs(15),
        paddingVertical:mvs(10),
        borderBottomWidth:StyleSheet.hairlineWidth,
    },
    camera:{
        width: mvs(100),
        height: mvs(100),
        borderRadius: mvs(50),
        marginTop: mvs(10),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: mvs(30),
    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: mvs(50),
    },
    btn_container:{
        position: 'absolute',
        width: '100%',
        paddingBottom: mvs(40),
        paddingHorizontal: mvs(22),
        bottom: 0,
    }
});