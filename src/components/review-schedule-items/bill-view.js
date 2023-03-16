import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import Row from "../atoms/row";
const BillView = ({
  invoice,
}) => {
  return (
    <View style={styles.container}>
      <Row alignItems="center">
        <Medium label={'Sub Total'} size={14} color={colors.black} />
        <Row alignItems="center">
          <Regular label={'AED  '} size={8} color={colors.lightgrey1} style={{ marginTop: mvs(Platform.OS === 'android' ? 2 : 3) }} />
          <Medium label={invoice?.subTotal + ''} size={14} color={colors.black} />
        </Row>
      </Row>
      <Row style={{ marginTop: mvs(13) }}>
        <View style={{ flex: 1 }}>
          <Regular label={'Discount'}
            size={14} color={colors.lightgrey1} />
          <Medium size={12} label={'(' + invoice?.discountTitle + ')'} color={colors.lightgrey1} />
        </View>
        <Row alignItems="center">
          <Regular label={'AED  '} size={8} color={colors.lightgrey1} />
          <Medium label={invoice?.discountValue + ''} size={14} color={colors.lightgrey1} />
        </Row>
      </Row>
      <Row alignItems="center" style={{ marginTop: mvs(13) }}>
        <Regular label={`Total Before Vat`} size={14} color={colors.lightgrey1} />
        <Row alignItems="center">
          <Regular label={'AED  '} size={8} color={colors.lightgrey1} />
          <Medium label={invoice?.totalBeforeVat + ''} size={14} color={colors.lightgrey1} />
        </Row>
      </Row>
      <Row alignItems="center" style={{ marginTop: mvs(13) }}>
        <Regular label={`VAT(${invoice?.vatRate}%)`} size={14} color={colors.lightgrey1} />
        <Row alignItems="center">
          <Regular label={'AED  '} size={8} color={colors.lightgrey1} />
          <Medium label={invoice?.vat + ''} size={14} color={colors.lightgrey1} />
        </Row>
      </Row>
      <Row alignItems="center" style={{ marginTop: mvs(13) }}>
        <Medium label={`Grand Total`} size={14} color={colors.black} />
        <Row alignItems="center">
          <Regular label={'AED  '} size={8} color={colors.lightgrey1} />
          <Medium label={invoice?.total + ''} size={14} color={colors.black} />
        </Row>
      </Row>
    </View>
  );
};
export default BillView;
const styles = StyleSheet.create({
  container: {
    borderRadius: mvs(6),
    marginTop: mvs(15),
    borderTopColor: colors.gray,
    borderTopWidth: 0.2,
    paddingVertical: mvs(15)
  },
});

// import React from "react";
// import { StyleSheet, View } from "react-native";
// import colors from "../../services/colors";
// import { mvs } from "../../services/metrices";
// import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
// import LinearGradient from "react-native-linear-gradient";
// import Regular from "../../presentation/typography/regular-text";
// import Row from "../atoms/row";
// import Medium from "../../presentation/typography/medium-text";
// import Shimmer from "../atoms/shimmer";
// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
// const BillView = ({
//   invoice,
//   bWidth = 0.3,
//   loading,
// }) => {
//   console.log(invoice)
//   return (
//     <View style={{ ...styles.container, borderTopWidth: bWidth }}>
//       <Row alignItems="center">
//         <Medium label={'Sub Total'} size={14} color={colors.black} />
//         <Shimmer visible={loading}>
//           <Row alignItems="center">
//             <Regular label={'AED  '} size={8} color={colors.lightgrey1} style={{}} />
//             <Medium label={invoice?.subTotal + ''} size={14} color={colors.black} />
//           </Row>
//         </Shimmer>
//       </Row>
//       <Row alignItems="center" style={{ marginTop: mvs(13) }}>
//         <View style={{ flex: 1 }}>
//           <Medium label={'Discount'}
//             size={14} color={colors.black} />
//           <Medium size={14} label={'(' + invoice?.discountTitle + ')'} color={colors.lightgrey1} />
//         </View>
//         <Shimmer visible={loading}>
//           <Row alignItems="center">
//             <Regular label={'AED  '} size={8} color={colors.lightgrey1} style={{}} />
//             <Medium label={invoice?.discountValue + ''} size={14} color={colors.black} />
//           </Row>
//         </Shimmer>
//       </Row>
//       <Row alignItems="center" style={{ marginTop: mvs(13) }}>
//         <Medium label={`Total Before Vat`} size={14} color={colors.black} />
//         <Shimmer visible={loading}>
//           <Row alignItems="center">
//             <Regular label={'AED  '} size={8} color={colors.lightgrey1} style={{}} />
//             <Medium label={invoice?.totalBeforeVat + ''} size={14} color={colors.black} />
//           </Row>
//         </Shimmer>
//       </Row>
//       <Row alignItems="center" style={{ marginTop: mvs(13) }}>
//         <Medium label={`VAT(${invoice?.vatRate}%)`} size={14} color={colors.lightgrey1} />
//         <Shimmer visible={loading}>
//           <Row alignItems="center">
//             <Regular label={'AED  '} size={8} color={colors.lightgrey1} style={{}} />
//             <Medium label={invoice?.vat + ''} size={14} color={colors.lightgrey1} />
//           </Row>
//         </Shimmer>
//       </Row>
//       <Row alignItems="center" style={{ marginTop: mvs(13) }}>
//         <Medium label={`Grand Total`} size={14} color={colors.black} />
//         <Shimmer visible={loading}>
//           <Row alignItems="center">
//             <Regular label={'AED  '} size={8} color={colors.lightgrey1} style={{}} />
//             <Medium label={invoice?.total + ''} size={14} color={colors.black} />
//           </Row>
//         </Shimmer>
//       </Row>
//     </View>
//   );
// };
// export default BillView;
// const styles = StyleSheet.create({
//   container: {
//     borderRadius: mvs(6),
//     marginTop: mvs(5),
//     borderTopColor: colors.lightgrey1,
//     borderTopWidth: 0.3,
//     paddingVertical: mvs(15)
//   },
// });
