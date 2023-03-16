import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { mvs } from '../../services/metrices';
import fonts from '../../services/fonts'
import colors from './../../services/colors';
type FcProps={
  label?: string | number;
  numberOfLines?: number;
  color?: string;
  size?: number ;
  onPress?: () => void;
  style?: object;
  children: any;
  }
const Light: React.FC<FcProps> = ({
  label,
  numberOfLines = 1,
  size,
  color=colors.B1E1F20,
  style,
  children,
  ...props
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      {...props}
      style={{...styles.label, color: color, fontSize: size, ...style}}>
      {label}
      {children}
    </Text>
  );
};
export default Light

const styles = StyleSheet.create({
    label:{
        fontFamily:fonts.light,
        fontSize:mvs(15),
    }
});
