//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

const DisplayText = ({label, containerStyle}) => {
  return (
    <View style={{...styles.container, ...containerStyle}}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: mvs(50),
    // backgroundColor: 'red',
    width: '90%',
    borderBottomColor: colors.filter_divider,
    borderBottomWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: mvs(5),
  },
  label: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.black,
    textAlignVertical: 'center',
    paddingLeft: mvs(10),
  },
});

export default DisplayText;
