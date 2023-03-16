import React from 'react';
import {StyleSheet, Text} from 'react-native';
import fonts from '../../services/fonts';
import colors from './../../services/colors';
type FcProps={
  label?: string | number;
  numberOfLines?: number;
  color?: string;
  size?: number ;
  onPress?: () => void;
  style?: object;
  children?: any;
}
const SemiBold : React.FC<FcProps> = ({
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
export default SemiBold;

const styles = StyleSheet.create({
    label:{
        fontFamily:fonts.semi_bold,
    }
});
