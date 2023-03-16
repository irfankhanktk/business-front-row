import React from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
const {width, height} = Dimensions.get('window');
const DOT_SIZE = 10;
export const Pagination = ({scrollX,dotStyle,list=[0,1,2,3,4],style}) => {
    const inputRange = [-width, 0, width];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-(DOT_SIZE + 10), 0, (DOT_SIZE + 10)],
    });
    return (
      <View style={[styles.pagination,style]}>
        <Animated.View
          style={[
            styles.paginationDot,
            { 
              width:10,
              position: 'absolute',
              transform: [{translateX}],
              zIndex: 1001,
              backgroundColor: colors.primary,
            },
          ]}
        />
        {list?.map((item, index) => {
          return (
            <View key={index} style={styles.paginationDotContainer}>
              <View style={[styles.paginationDot,dotStyle]} />
            </View>
          );
        })}
      </View>
    );
  };

  const styles = StyleSheet.create({
      
  pagination: {
    // position: 'absolute',
    alignSelf: 'center',
    bottom: mvs(13),
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: colors.GE0E0E0,
  },
  paginationDotContainer: {
    marginRight: 10,
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    // borderColor: ,
    backgroundColor: colors.headerTitle,
  },
  });