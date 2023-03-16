import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

export const Walk_In_Styles = StyleSheet.create({
    conntainer: {
        flex: 1,
        backgroundColor: colors.white,
      },
      body: {
        flex: 1,
      },
      card:{
        backgroundColor:colors.white,
        borderRadius:mvs(20),
        marginBottom:mvs(20),
        ...colors.shadow,
      },
      image:{
        height:mvs(200),
        width:'100%',
      },
      rowView:{
        justifyContent:'space-between',
        paddingLeft:mvs(24),
        paddingVertical:mvs(17),
        paddingRight:mvs(27),
        borderBottomColor:colors.lightgrey1,
        borderBottomWidth:0.3

      },
      couponView:{
        borderBottomColor:colors.lightgrey1,
        borderBottomWidth:0.3,
        paddingVertical:mvs(17),
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
        paddingHorizontal:mvs(18)
      },
      paymentDropdown:{
        justifyContent:'space-between',
        height:mvs(50),
        alignItems:'center',
        borderRadius:10,
        top:mvs(8),
        borderWidth:1,
        borderColor:colors.gray,
        paddingHorizontal:mvs(11)
      },
      priceView:{
        justifyContent:'space-between',
        marginTop:mvs(14)
      },
      button:{
        marginTop:mvs(19)
      },
      sheetRowView:{
        borderBottomWidth:0,
        paddingVertical:mvs(8),
        alignItems:'center',
        paddingLeft:0,paddingRight:0
      }
});
