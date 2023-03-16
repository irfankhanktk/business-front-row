import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as SVG from '../../assets/common-icons/payment-method/index';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import PageLoader from '../atoms/page-loader';
const PaymentCard = ({
  title = 'Accept',
  borderColor = colors.lightgrey1,
  icon = '',
  selected = false,
  onClick,
  selectable = true,
  loading,
  item,
}) => {
  return (
    <>
      <TouchableOpacity
        disabled={!selectable || loading}
        activeOpacity={selectable ? 0 : 1}
        style={{ ...styles.CONTAINER, borderColor: borderColor }}
        onPress={onClick}>
        {loading === item?.id ?
          <PageLoader /> : <>
            <Regular
              label={title}
              color={colors.lightgrey1}
              size={12}
              style={{ marginBottom: mvs(5) }}
            />
            {title === 'Credit Card' ? (
              <SVG.CreditCard width="24" height="24" />
            ) : title === 'Pay at station' ? (
              <SVG.PayAtStation width="24" height="24" />
            ) : title === 'My Balance' ? (
              <SVG.MyBalance width="24" height="24" />
            ) : null}
            {selected && (
              <View style={{ position: 'absolute', right: -10, top: -15 }}>
                <SVG.SelectedIcon />
              </View>
            )}
          </>}
      </TouchableOpacity>
    </>
  );
};
export default PaymentCard;
const styles = StyleSheet.create({
  CONTAINER: {
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(10),
    height: mvs(78),
    width: mvs(110),
    marginRight: mvs(16),
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shimmer: {
    height: mvs(78),
    width: mvs(125),
    marginRight: mvs(16),
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
