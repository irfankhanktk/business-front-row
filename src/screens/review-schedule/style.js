import { StyleSheet } from 'react-native';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';

export const Styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingBottom: mvs(10)
  },
  bottomView: {
    paddingVertical: mvs(14),
    borderTopColor: colors.lightgrey1,
    borderTopWidth: 0.2,
    paddingHorizontal: mvs(20)
  },
  coupon_row: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.2,
    paddingBottom: mvs(13.6),
  }
});
