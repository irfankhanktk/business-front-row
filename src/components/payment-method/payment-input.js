import {StyleSheet,View,TouchableOpacity, TextInput} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import React,{useState} from 'react';
import Medium from '../../presentation/typography/medium-text';
const PaymentInput = ({onChange,placeholder="",style,labelStyle,label='',inputStyle}) => {
    
    return (
      <View style={{...styles.inputView,...style}}>
        <Medium size={16} label={label} style={{...styles.labelS,...labelStyle}}/>
        <TextInput placeholder={placeholder} onChangeText={onChange} style={{...styles.input,...inputStyle}}/>
     </View>
    );
};
export default PaymentInput;
const styles = StyleSheet.create({
    inputView:{
        marginTop:mvs(15),
       
      },
      labelS:{

    },
    input:{
       borderColor:colors.lightgrey1,
       borderWidth:1,
       borderRadius:10,
       height:mvs(50),
       top:mvs(11),
       color:colors.black,
       paddingVertical:mvs(12),
       paddingHorizontal:mvs(15)
    }
});
