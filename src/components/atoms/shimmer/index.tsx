import React from 'react';
import {View, Text, ViewStyle, StyleSheet} from 'react-native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { mvs } from '../../../services/metrices';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
type props = {
  shimmerStyle?: ViewStyle;
  children?: JSX.Element;
  visible:boolean
};
const Shimmer = ({shimmerStyle, children = <></>,visible}: props) => {
  return (
    <ShimmerPlaceholder shimmerWidthPercent={1} shimmerStyle={[styles.shimmerStyle,shimmerStyle]} visible={visible}>
      {children}
    </ShimmerPlaceholder>
  );
};
export default Shimmer;
const styles = StyleSheet.create({
    shimmerStyle:{
        marginTop:mvs(2),
        height:mvs(20)
    }
});
