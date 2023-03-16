//core
import React from 'react';
import {
    StyleSheet, TouchableOpacity, View
} from 'react-native';
// import colors from '../../config/colors';
import { mvs, width } from '../../services/metrices';
import Regular from '../../presentation/typography/regular-text';
import allColors from '../../services/colors';
import Medium from '../../presentation/typography/medium-text';
// import { getScaleValueFromWidthPer, HP, palette } from "../config";
//exnternal
//internal imports
const TopMenu =({colors,...props}) => {
  const {
    state: {index, routes},
    navigation,
    descriptors,
    style
  } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent:'space-between',
        height: mvs(36),
        backgroundColor: allColors.tabBackground,
        alignItems:'center',
        paddingHorizontal:mvs(37),
        marginVertical:mvs(25),
        ...style,
      }}>
      {routes.map((route, idx) => {
        const {options} = descriptors[route.key];

        const isFocused = index === idx;

        const icon =
          options.tabBarIcon !== undefined
            ? options.tabBarIcon(isFocused, 'white', 10)
            : null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={1}
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              // flex: 1,
              backgroundColor: `transparent`,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{...styles.customIcon,backgroundColor:isFocused ? colors.primary:colors.tabBackground,}}>
              {icon}
              <Medium
                label={route.name}
                //label={''}
                style={{
                  fontSize: mvs(14),
                  color: colors.headerTitle,
                  color: isFocused ? colors.white : colors.headerTitle,
                  textAlign: 'center',
                 
                 }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  customIcon: {
    height: mvs(83),
    // width: mvs(83),
    justifyContent: 'center',
    alignItems: 'center',
    width:mvs(89),
    height:mvs(36),
    borderRadius:10,
  },
});

export default TopMenu;
