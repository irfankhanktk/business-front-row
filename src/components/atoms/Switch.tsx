import React from 'react';
import { StyleSheet, View } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
const CustomSwitch = ({
  style = {},
  thumbOnStyle = {},
  thumbOffStyle = {},
  trackOnStyle = {},
  trackOffStyle = {},
  label = '',
  value = true,
  onChange = (val: any) => {},
  textStyle = {},
  disabled = false,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ToggleSwitch
        disabled={disabled}
        isOn={value}
        thumbOnStyle={{
          ...styles.thumbOn,
          ...thumbOnStyle,
        }}
        thumbOffStyle={{
          ...styles.thumbOff,
          ...thumbOffStyle,
        }}
        trackOnStyle={{
          ...styles.trackOn,
          ...trackOnStyle,
        }}
        trackOffStyle={{
          ...styles.trackOff,
          ...trackOffStyle,
        }}
        offColor={colors.white}
        size={'small'}
        onToggle={onChange}
      />
    </View>
  );
};
export default CustomSwitch;
const styles = StyleSheet.create({
  container: {},
  thumbOn: {
    backgroundColor: colors.white,
    width: mvs(24),
    height: mvs(24),
    borderRadius: 12,
  },
  thumbOff: {
    backgroundColor:colors.white,
    width: mvs(24),
    height: mvs(24),
    borderRadius: 12,
  },
  trackOn: {
    backgroundColor: `${colors.primary}`,
    borderWidth: 0,
    height: mvs(28),
    width: mvs(52),
  },
  trackOff: {
    backgroundColor:`#C5C5C5`,
    borderWidth: 0,
    height: mvs(28),
    // height: mvs(24),
    width: mvs(52),
  },
});
