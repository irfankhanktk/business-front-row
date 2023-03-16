import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import PageLoader from '../atoms/page-loader';
const ActionButton = ({
  title = 'Accept',
  borderColor = colors.gray,
  bgColor = colors.gray,
  titleColor = colors.lightgrey1,
  onClick,
  style,
  loading,
}) => {
  return (
    <TouchableOpacity
      disabled={loading}
      style={{
        ...styles.CONTAINER,
        ...style,
        borderColor: borderColor,
        // backgroundColor: bgColor,
      }}
      onPress={onClick}>
      {loading ?
        <PageLoader />
        : <Regular label={title} color={titleColor} size={10} />}
    </TouchableOpacity>
  );
};
export default ActionButton;
const styles = StyleSheet.create({
  CONTAINER: {
    justifyContent: 'center',
    alignItems: 'center',
    height: mvs(28),
    width: mvs(80),
    paddingHorizontal: mvs(10.1),
    paddingVertical: mvs(3.5),
    marginTop: mvs(9),
    borderRadius: 3,
    borderWidth: 0.5,
  },
});
