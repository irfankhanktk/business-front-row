import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../services/colors';
import fonts from '../../services/fonts';
import { mvs } from '../../services/metrices';

const CustomRadio = ({status=true,onChange,selectedColor=colors.primary,label,subLabel='',labelStyle,style}) => {
    return (
        <View style={[styles.CONTAINER,style]}>
            <TouchableOpacity onPress={()=>onChange()} style={[styles.DOT_CONTAINER,]}>
                <View style={[styles.DOT,{ backgroundColor:status?selectedColor:colors.price_border,}]}/>
            </TouchableOpacity>
            <Text style={[styles.RADIO_LABLE,labelStyle]}>{label}<Text style={{...styles.RADIO_LABLE,fontSize:mvs(12),color:colors.headerTitle}}>{subLabel}</Text></Text>
        </View>
    );
};
export default CustomRadio;
const styles = StyleSheet.create({
    CONTAINER: {
        flexDirection: 'row',
    },
    RADIO_LABLE: {
        marginLeft: mvs(15),
        fontFamily:fonts.carosSoftRegular,
    },
    DOT_CONTAINER:{
        borderRadius:mvs(10),
        height:mvs(20),
        width:mvs(20),
        backgroundColor:colors.secondary,
        justifyContent:'center',
        alignItems:'center',
    },
    DOT:{
        borderRadius:mvs(5),
        height:mvs(10),
        width:mvs(10),
        backgroundColor:colors.price_border,
    }
});