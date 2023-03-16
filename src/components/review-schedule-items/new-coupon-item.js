// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { CouponIcon, NoCouponIcon } from '../../assets/images';
// import Medium from '../../presentation/typography/medium-text';
// import Regular from '../../presentation/typography/regular-text';
// import colors from '../../services/colors';
// import { mvs } from '../../services/metrices';
// import ImagePlaceholder from '../atoms/Placeholder';
// import Row from '../atoms/row';
// import Shimmer from '../atoms/shimmer';
// const NewCouponItem =
//   ({
//     title = 'No Discount is Applied',
//     subTitle = 'You have discounts to apply',
//     isExpiring = false,
//     highlightedText = 'Cash Voucher',
//     statusLine = 'Booking at full price',
//     showCoupon = false,
//     showHighLighted = false,
//     loading,
//   }) => {
//     return (
//       <View>
//         <Row style={{ marginTop: mvs(10) }}>
//           <Shimmer shimmerStyle={styles.image} visible={loading}>
//             <ImagePlaceholder containerStyle={styles.image} uri={showCoupon ? CouponIcon : NoCouponIcon} />
//           </Shimmer>
//           <View style={{ marginLeft: mvs(10), flex: 1 }}>
//             <Shimmer shimmerStyle={{ height: mvs(18) }} visible={loading}>
//               <Medium size={mvs(15)} label={title} color={colors.black} />
//             </Shimmer>
//             <Shimmer shimmerStyle={{ height: mvs(18) }} visible={loading}>
//               <Regular color={colors.lightgrey1} size={mvs(13)} label={subTitle} />
//             </Shimmer>
//           </View>
//         </Row>

//         <Shimmer shimmerStyle={{ height: mvs(18) }} visible={loading}>
//           <Regular
//             color={showCoupon & !isExpiring ? colors.lightgrey1 : isExpiring ? colors.red : colors.primary}
//             size={mvs(13)} label={statusLine} style={{ width: '100%' }} numberOfLines={2} />
//         </Shimmer>
//       </View>

//     );
//   };
// export default NewCouponItem;
// const styles = StyleSheet.create({
//   image: {
//     height: mvs(45.23),
//     width: mvs(48),
//     borderRadius: mvs(8),
//     alignSelf: 'center'
//   },
//   highlighted: {
//     paddingHorizontal: mvs(9),
//     paddingVertical: mvs(4),
//     backgroundColor: colors.lightYellow,
//     borderRadius: 4,
//     marginTop: mvs(7)
//   }
// });

import React from 'react';
import { StyleSheet, View } from 'react-native';
// import { {} } from '../../assets/common-icons';
import { NoCouponIcon } from '../../assets/images';
import Medium from '../../presentation/typography/medium-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import SERVICES from '../../services/common-services';
import { mvs } from '../../services/metrices';
import ImagePlaceholder from '../atoms/Placeholder';
import Row from '../atoms/row';
const NewCouponItem = ({
  title = 'No Discount is Applied',
  subTitle = 'You have discounts to apply',
  isExpiring = false,
  highlightedText = 'Cash Voucher',
  statusLine,
  showCoupon = false,
  showHighLighted = false,
  cover,
  loading = false,
}) => {
  return (
    <View style={{
      flex: 1,
    }}>
      <Row style={{ justifyContent: 'flex-start', }}>
        <ImagePlaceholder
          containerStyle={styles.image}
          uri={cover ? { uri: SERVICES._returnFile(cover) } : NoCouponIcon}
        />
        <View style={{ marginLeft: mvs(10) }}>
          <Medium size={mvs(15)} label={title} />
          <Regular
            color={colors.G777373}
            size={mvs(13)}
            label={subTitle}
          />
        </View>
      </Row>
      {statusLine && <Regular
        color={
          !isExpiring
            ? colors.lightgrey1
            : isExpiring
              ? colors.red
              : colors.primary
        }
        size={mvs(13)}
        label={statusLine}
        numberOfLines={null}
        style={{ fontStyle: 'italic', marginTop: mvs(10) }}
      />}
    </View>
  );
};
export default NewCouponItem;
const styles = StyleSheet.create({
  image: {
    height: mvs(45.23),
    width: mvs(48),
    borderRadius: mvs(8),
    alignSelf: 'center',
  },
  highlighted: {
    paddingHorizontal: mvs(9),
    paddingVertical: mvs(4),
    backgroundColor: colors.lightYellow,
    borderRadius: 4,
    marginTop: mvs(7),
  },
});
