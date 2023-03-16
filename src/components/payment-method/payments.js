import {StyleSheet,View,TouchableOpacity} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import RBSheet from "react-native-raw-bottom-sheet";
import React,{useState} from 'react';
import PaymentItem from '../../components/atoms/payment-item';
import { Back } from '../../assets/headers-icons';
import Buttons from '../atoms/Button';
import Regular from '../../presentation/typography/regular-text';
import Row from '../atoms/row';
const PaymentSheet =React.forwardRef((props,ref,onAddClick) => {
    const[paymentMethods,setPaymentMethods]=useState([
        {Card:"MasterCard",Number:'**** **** **** 8748',Icon:"Caret",Selected:true},
        {Card:"VisaCard",Number:'**** **** **** 8748',Icon:"Caret",Selected:false}
      ]);
    return (
       <RBSheet
        ref={ref}
        height={358}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
            paddingTop:mvs(32)
          }
        }}>
          <View style={{paddingHorizontal:mvs(18)}}>
               <Row style={{...styles.sheetRowView}}>
                  <Back/>
                  <Regular label={"Payment Method"} size={20} style={{flex:1,marginHorizontal:mvs(20)}}/>
                  <TouchableOpacity onPress={onAddClick}>
                        <Regular label={"Add New"} size={15} color={colors.primary}/>
                  </TouchableOpacity>
               </Row>
              <View style={{marginVertical:mvs(20)}}>
                  {
                    paymentMethods.map(element => {
                      return (
                        <View key={element.Card} style={{marginTop:mvs(12)}}>
                           <PaymentItem value={element.Number} leftIcon={element.Card} rightIcon={element.Selected?"SelectedCard":"UnSelectedCard"}/>
                        </View>
                      );
                      })
                  }

              </View>
              <Buttons.ButtonPrimary title='Choose' style={{marginTop:mvs(37)}}/>
          </View>
      </RBSheet>
    );
});
export default PaymentSheet;
const styles = StyleSheet.create({
      sheetRowView:{
        borderBottomWidth:0,
        paddingVertical:mvs(8),
        alignItems:'center',
        paddingLeft:0,paddingRight:0
      }
});
