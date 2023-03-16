import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Edit } from '../../assets/common-icons';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import fonts from '../../services/fonts';
import { mvs } from '../../services/metrices';
import Row from './row';
import * as SVG from '../../assets/common-icons';
const PaymentItem = ({onClick,value="**** **** **** 8748",style,leftIcon='MasterCard',rightIcon='Caret'}) => {
    const LeftSvg=SVG[leftIcon];
    const RightSvg=SVG[rightIcon];
    return (
      <Row style={{...styles.PAYMENTDROPDOWN,...style}}>
        <LeftSvg/>
        <Regular size={13} style={{flex:1,marginHorizontal:mvs(8)}} label={value}/>
        <TouchableOpacity onPress={onClick}>
          <RightSvg/>
        </TouchableOpacity>
    </Row>
    );
};
export default PaymentItem;
const styles = StyleSheet.create({
   
    PAYMENTDROPDOWN:{
        justifyContent:'space-between',
        height:mvs(50),
        alignItems:'center',
        borderRadius:10,
        top:mvs(8),
        borderWidth:1,
        borderColor:colors.gray,
        paddingHorizontal:mvs(11)
    }
});